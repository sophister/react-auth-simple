/**
 * As a protection for children, ONLY render children if has user login
 */
import React, { useEffect } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { useAuthContext } from './AuthProvider';
import { useLoginContext } from './LoginProvider';
export default function LoginGuard(props) {
    const authContext = useAuthContext();
    const loginContext = useLoginContext();
    useEffect(function () {
        if (authContext.inited && !authContext.user) {
            // user does NOT login, show login modal
            loginContext.showLogin();
        }
    });
    if (!authContext.user) {
        if (authContext.inited) {
            // not login, does NOT render children
            return null;
        }
        else {
            // 
            return props.renderLoginChecking();
        }
    }
    return props.children;
}
export function withLoginGuard(C, args) {
    const WrapComponent = (props) => {
        return (React.createElement(LoginGuard, { renderLoginChecking: args.renderLoginChecking },
            React.createElement(C, Object.assign({}, props))));
    };
    // hoist the `static` part of C to WrapComponent
    hoistNonReactStatic(WrapComponent, C);
    WrapComponent.displayName = `withLoginGuard(${C.displayName})`;
    return WrapComponent;
}
//# sourceMappingURL=LoginGuard.js.map
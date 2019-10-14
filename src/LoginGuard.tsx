/**
 * As a protection for children, ONLY render children if has user login
 */

import React, { useEffect } from 'react';
import { useAuthContext } from './AuthProvider';
import { useLoginContext } from './LoginProvider';

interface Props {
    children: React.ReactElement;
    // render the Loading indicator, when our APP is initializing login data
    renderLoginChecking: () => React.ReactElement;
}

export default function LoginGuard(props: Props) {
    const authContext = useAuthContext();
    const loginContext = useLoginContext();
    useEffect(function(){
        if (authContext.inited && !authContext.user) {
            // user does NOT login, show login modal
            loginContext.showLogin();
        }
    });
    if (!authContext.user) {
        if (authContext.inited) {
            // not login, does NOT render children
            return null;
        } else {
            // 
            return props.renderLoginChecking();
        }
    }
    return props.children;
}

export type Args = Pick<Props, 'renderLoginChecking'>;

export function withLoginGuard<T>(C: React.ComponentType<T>, args: Args) {
    const WrapComponent: React.FC<T> = (props) => {
        return (
            <LoginGuard renderLoginChecking={args.renderLoginChecking}>
                <C {...props} />
            </LoginGuard>
        );
    }
    // TODO: maybe we should hoist the `static` part of C to WrapComponent ?
    WrapComponent.displayName = `withLoginGuard(${C.displayName})`;
    return WrapComponent;
}

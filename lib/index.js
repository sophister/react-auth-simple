/**
 * entry
 */
import React from 'react';
import AuthProvider, { AuthContext, useAuthContext } from './AuthProvider';
import LoginProvider, { useLoginContext } from './LoginProvider';
import LoginGuard, { withLoginGuard } from './LoginGuard';
export default function AuthRoot({ children, initUser, renderLoginComponent }) {
    return (React.createElement(AuthProvider, { initUser: initUser },
        React.createElement(LoginProvider, { renderLoginComponent: renderLoginComponent }, children)));
}
export { AuthProvider, AuthContext, useAuthContext, LoginProvider, useLoginContext, LoginGuard, withLoginGuard, };
//# sourceMappingURL=index.js.map
/**
 * entry
 */

import React from 'react';
import AuthProvider, { AuthContext, useAuthContext, Props as AuthProviderProps } from './AuthProvider';
import LoginProvider, { LoginContext, useLoginContext, Props as LoginProviderProps } from './LoginProvider';
import LoginGuard, { withLoginGuard } from './LoginGuard';

export type Props<UserType = any> = {
    children: React.ReactElement;
} & Pick<AuthProviderProps<UserType>, 'initUser'> & Pick<LoginProviderProps, 'renderLoginComponent'>;

export default function AuthRoot({ children, initUser, renderLoginComponent}: Props) {
    return (
        <AuthProvider initUser={initUser}>
            <LoginProvider renderLoginComponent={renderLoginComponent}>
                {children}
            </LoginProvider>
        </AuthProvider>
    );
}

export {
    AuthProvider,
    AuthContext,
    useAuthContext,
    LoginProvider,
    useLoginContext,
    LoginGuard,
    withLoginGuard,
};

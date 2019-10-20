/**
 * entry
 */
import React from 'react';
import AuthProvider, { AuthContext, useAuthContext, Props as AuthProviderProps } from './AuthProvider';
import LoginProvider, { useLoginContext, Props as LoginProviderProps } from './LoginProvider';
import LoginGuard, { withLoginGuard } from './LoginGuard';
export declare type Props<UserType = any> = {
    children: React.ReactElement;
} & Pick<AuthProviderProps<UserType>, 'initUser'> & Pick<LoginProviderProps, 'renderLoginComponent'>;
export default function AuthRoot({ children, initUser, renderLoginComponent }: Props): JSX.Element;
export { AuthProvider, AuthContext, useAuthContext, LoginProvider, useLoginContext, LoginGuard, withLoginGuard, };

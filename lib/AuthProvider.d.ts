/**
 * Root Component, provider current login user
 */
import React from 'react';
interface LoginState<T> {
    inited: boolean;
    user: T | null;
}
interface AuthContextData<T = any> extends LoginState<T> {
    setUser: (user: T | null) => void;
}
export declare const AuthContext: React.Context<AuthContextData<any> | null>;
export interface Props<T> {
    children: React.ReactElement;
    initUser: () => Promise<T | null>;
}
export default function AuthProvider<T>(props: Props<T>): JSX.Element;
export declare function useAuthContext(): AuthContextData<any>;
export {};

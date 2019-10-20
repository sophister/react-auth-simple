/**
 * provide the placeholder for custom <Login /> Component
 */
import React from 'react';
interface LoginProviderValue {
    showLogin: () => void;
    hideLogin: () => void;
}
export interface Props {
    children: React.ReactNode;
    renderLoginComponent: (shouldShow: boolean) => React.ReactNode;
}
export declare const LoginContext: React.Context<LoginProviderValue | null>;
export default function LoginContainer(props: Props): JSX.Element;
export declare function useLoginContext(): LoginProviderValue;
export {};

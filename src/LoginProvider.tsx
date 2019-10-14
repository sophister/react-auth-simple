/**
 * provide the placeholder for custom <Login /> Component
 */

import React, { createContext, useContext, useRef, useState} from 'react';
import { useAuthContext } from './AuthProvider';

interface LoginProviderValue {
    // show login Component
    showLogin: () => void;
    // hide login Component
    hideLogin: () => void;
}

interface Props{
    children: React.ReactNode;
    // render custom Login Component
    renderLoginComponent: (shouldShow:boolean) => React.ReactNode;
}

export const LoginContext = createContext<LoginProviderValue | null>(null);

export default function LoginContainer(props: Props) {
    const [loginVisible, setLoginVisible] = useState(false);
    const valueRef = useRef({
        showLogin(){
            setLoginVisible(true);
        },
        hideLogin(){
            setLoginVisible(false);
        },
    });

    return (
        <LoginContext.Provider value={valueRef.current}>
            {props.children}
            {props.renderLoginComponent(loginVisible)}
        </LoginContext.Provider>
    );
}

export function useLoginContext() {
    const value = useContext(LoginContext);
    if (!value) {
        throw new Error('<LoginContainer> does NOT exist in anchor');
    }
    return value;
}

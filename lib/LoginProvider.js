/**
 * provide the placeholder for custom <Login /> Component
 */
import React, { createContext, useContext, useRef, useState } from 'react';
export const LoginContext = createContext(null);
export default function LoginContainer(props) {
    const [loginVisible, setLoginVisible] = useState(false);
    const valueRef = useRef({
        showLogin() {
            setLoginVisible(true);
        },
        hideLogin() {
            setLoginVisible(false);
        },
    });
    return (React.createElement(LoginContext.Provider, { value: valueRef.current },
        props.children,
        props.renderLoginComponent(loginVisible)));
}
export function useLoginContext() {
    const value = useContext(LoginContext);
    if (!value) {
        throw new Error('<LoginContainer> does NOT exist in anchor');
    }
    return value;
}
//# sourceMappingURL=LoginProvider.js.map
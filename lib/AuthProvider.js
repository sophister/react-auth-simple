/**
 * Root Component, provider current login user
 */
import React, { createContext, useState, useMemo, useEffect, useContext } from 'react';
export const AuthContext = createContext(null);
export default function AuthProvider(props) {
    const [loginState, setLoginState] = useState({
        inited: false,
        user: null,
    });
    const value = useMemo(function () {
        return {
            inited: loginState.inited,
            user: loginState.user,
            setUser: function (user) {
                setLoginState({
                    inited: true,
                    user,
                });
            },
        };
    }, [loginState]);
    useEffect(function () {
        // init current user after render
        props.initUser()
            .then(function (user) {
            setLoginState({
                inited: true,
                user,
            });
        }).catch(function (err) {
            console.error(err);
            setLoginState({
                inited: true,
                user: null,
            });
        });
    }, []);
    return (React.createElement(AuthContext.Provider, { value: value }, props.children));
}
export function useAuthContext() {
    const data = useContext(AuthContext);
    if (!data) {
        throw new Error('<AuthProvider> does NOT exist in anchor');
    }
    return data;
}
//# sourceMappingURL=AuthProvider.js.map
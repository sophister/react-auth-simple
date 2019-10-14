/**
 * Root Component, provider current login user
 */

import React, { createContext, useState, useMemo, useEffect, useContext } from 'react';

interface LoginState<T> {
    // has getting the current user done?
    inited: boolean;
    // current login user
    user: T | null;
}

interface AuthContextData<T = any> extends LoginState<T> {
    // update current user after login success
    setUser: (user: T | null) => void;
}

const AuthContext = createContext<AuthContextData | null>(null);

interface Props<T> {
    children: React.ReactElement;
    // custom logic to get the current login user. 
    // Maybe read `localStorage`, or request API server
    initUser: () => Promise<T | null>;
}

export default function AuthProvider<T>(props: Props<T>) {
    const [loginState, setLoginState] = useState<LoginState<T>>({
        inited: false,
        user: null,
    });
    const value = useMemo(function(){
        return {
            inited: loginState.inited,
            user: loginState.user,
            setUser: function(user: T | null){
                setLoginState({
                    inited: true,
                    user,
                });
            },
        };
    }, [loginState]);
    useEffect(function(){
        // init current user after render
        props.initUser()
        .then(function(user){
            setLoginState({
                inited: true,
                user,
            });
        }).catch(function(err: Error){
            console.error(err);
            setLoginState({
                inited: true,
                user: null,
            });
        });
    }, []);

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
}

export function useAuthContext(){
    const data = useContext(AuthContext);
    if (!data) {
        throw new Error('<AuthProvider> does NOT exist in anchor');
    }
    return data;
}

/**
 * As a protection for children, ONLY render children if has user login
 */
import React from 'react';
interface Props {
    children: React.ReactElement;
    renderLoginChecking: () => React.ReactElement;
}
export default function LoginGuard(props: Props): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | null;
export declare type Args = Pick<Props, 'renderLoginChecking'>;
export declare function withLoginGuard<T>(C: React.ComponentType<T>, args: Args): React.FunctionComponent<T>;
export {};

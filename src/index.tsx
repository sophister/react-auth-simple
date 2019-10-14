/**
 * entry
 */

import React from 'react';
import AuthProvider, { useAuthContext } from './AuthProvider';
import LoginProvider, { useLoginContext } from './LoginProvider';
import LoginGuard, { withLoginGuard } from './LoginGuard';

interface Props {
    children: React.ReactElement;
}

export default function AuthRoot(props: Props) {
    
}
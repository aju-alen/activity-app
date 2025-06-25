import React, { useContext, useEffect, useState } from 'react';
import { AuthError } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import  {GoogleSignin, isSuccessResponse, isErrorWithCode, statusCodes} from '@react-native-google-signin/google-signin';
import { developmentErrorLogs, developmentLogs } from '@/utils/DevelopmentLogs';

WebBrowser.maybeCompleteAuthSession();

export type AuthUser = {
    id: string;
    email: string;
    name: string;
    picture?: string;
    given_name?: string;
    family_name?: string;
    email_verified?: boolean;
    provider?: string;
    exp?: number;
    cookieExpiration?: number;
}

const AuthContext = React.createContext({
    user: null as AuthUser | null,
    signIn:async () => {},
    signOut:async () => {},
    getCurrentUser: async () => {},
    isLoading: false,
    error: null as Error | null,
});

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        developmentLogs('Refreshing Auth providerGoogleSignin.configure');
        GoogleSignin.configure({
            iosClientId:"1002168949968-rhfqtg8jo2tauhpr9oq9g6lcv0bd5n37.apps.googleusercontent.com",
            webClientId:"1002168949968-lrbkmq7v5saio30olojcmj6afn0cep7d.apps.googleusercontent.com"
        }); 
    },[])

    const signIn = async() => {
        setIsLoading(true);
        setError(null);
        
        try{
            const hasPlayServices = await GoogleSignin.hasPlayServices();
            developmentLogs(hasPlayServices, 'hasPlayServices');
            
            if(!hasPlayServices){
                throw new Error('Google Play Services are not available');
            }

            const userInfo = await GoogleSignin.signIn();
            if(isSuccessResponse(userInfo)){
                const {idToken, user} = userInfo.data;
                const {name, email, photo} = user;
                developmentLogs(userInfo, 'userInfo');
                setUser({
                    id: idToken || '',
                    name: name || '',
                    email: email || '',
                    picture: photo || '',
                });
            }else{
                throw new Error('Google Sign-In failed');
            }
        } catch(error){
            developmentErrorLogs(error, 'Google Sign-In error');
            
            if(isErrorWithCode(error)){
                switch(error.code){
                    case statusCodes.SIGN_IN_CANCELLED:
                        setError(new Error('Google Sign-In cancelled'));
                        break;
                    case statusCodes.IN_PROGRESS:
                        setError(new Error('Google Sign-In in progress'));
                        break;
                    case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                        setError(new Error('Google Play Services not available'));
                        break;
                    default:
                        setError(new Error(`Google Sign-In failed: ${error.message || 'Unknown error'}`));
                        break;
                }
            } else {
                // Handle non-Google Sign-In specific errors
                const errorMessage = error instanceof Error ? error.message : 'Google Sign-In failed';
                setError(new Error(errorMessage));
            }
            throw error; // Re-throw to be handled by the calling component
        } finally {
            setIsLoading(false);
        }
    }

    const signOut = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
          await GoogleSignin.signOut();
          setUser(null); // Remember to remove the user from your app's state as well
        } catch (error) {
          developmentErrorLogs(error, 'Error signing out');
          setError(new Error('Failed to sign out'));
        } finally {
          setIsLoading(false);
        }
      };

    const getCurrentUser = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
          const response = await GoogleSignin.signInSilently();
          if (response.type === 'success') {
            const {idToken, user} = response.data;
            const {name, email, photo} = user;
            setUser({
                id: idToken || '',
                name: name || '',
                email: email || '',
                picture: photo || '',
            });
          } else if (response.type === 'noSavedCredentialFound') {
            // user has not signed in yet, or they have revoked access
            setUser(null);
          }
        } catch (error) {
          developmentErrorLogs(error, 'Error getting current user');
          setUser(null);
          setError(new Error('Failed to get current user'));
        } finally {
          setIsLoading(false);
        }
      };

   

    return (
        <AuthContext.Provider value={{
            user,
            signIn,
            signOut,
            getCurrentUser,
            isLoading,
            error,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
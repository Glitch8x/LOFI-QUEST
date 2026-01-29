import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [initError, setInitError] = useState(null);

    useEffect(() => {
        console.log("AuthProvider mounted");
        if (!auth) {
            console.error("Auth missing in useEffect");
            setInitError("Firebase configuration is missing. Please check console and .env.local file.");
            // Even if config is missing, stop loading so app can render (Login page handles errors)
            setLoading(false);
            return;
        }

        console.log("Setting safety timeout (3000ms)...");
        // Safety timeout: If Firebase takes too long, we stop loading anyway
        const timer = setTimeout(() => {
            console.log("SAFETY TIMEOUT TRIGGERED - Force clearing loading state");
            setLoading(false);
        }, 3000);

        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("AuthStateChanged fired. User:", currentUser ? currentUser.email : "null");
            if (currentUser) {
                setUser({
                    id: currentUser.uid,
                    name: currentUser.displayName || currentUser.email.split('@')[0],
                    email: currentUser.email,
                    avatar: currentUser.photoURL || `https://ui-avatars.com/api/?name=${currentUser.email}&background=random`,
                    earnings: 0,
                    completedQuests: 0
                });
            } else {
                setUser(null);
            }
            clearTimeout(timer);
            console.log("Clearing loading state (normal flow)");
            setLoading(false);
        });

        return () => {
            console.log("AuthProvider unmounting/cleanup");
            unsubscribe();
            clearTimeout(timer);
        };
    }, []);

    const signup = async (email, password, name) => {
        if (!auth) throw new Error("Authentication service is unavailable.");
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const avatarUrl = `https://ui-avatars.com/api/?name=${name || email}&background=random`;

        await updateProfile(userCredential.user, {
            displayName: name,
            photoURL: avatarUrl
        });

        return userCredential.user;
    };

    const login = (email, password) => {
        if (!auth) throw new Error("Authentication service is unavailable.");
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleLogin = () => {
        if (!auth) throw new Error("Authentication service is unavailable.");
        return signInWithPopup(auth, googleProvider);
    };

    const logout = () => {
        if (!auth) return Promise.resolve();
        return signOut(auth);
    };

    const value = {
        user,
        signup,
        login,
        googleLogin,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {initError ? (
                <div style={{ color: 'white', padding: 20 }}>
                    <h2>Configuration Error</h2>
                    <p>{initError}</p>
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};

import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../services/firebase';
import { firestore } from '../services/firebase';
import { useHistory } from "react-router-dom";
// import { NewUser, Favorite, Business } from '../components/types';

const AuthContext = React.createContext<any>('');

const apiKey = process.env.React_APP_YELP_FUSION_API_KEY

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
    const history = useHistory();
    const [authLoading, setAuthLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<any>();
    const [profile, setProfile] = useState<any>();
    // const [businesses, setBusinesses] = useState<Business[]>();
    // const [favorites, setFavorites] = useState<Favorite[] | null>();

    const createProfile = async(user: any) => {
        try {
            const newUser = {
                uid: user.uid,
                email: user.email,
                password: user.password,
                posts:[]
            };
            await firestore.collection('Users').doc(user.uid).set(newUser);
        } catch (error) {
            console.log('it broke')
        }
    };

    const signup = async(email: string, password: string) => {
        const { user }:any = await auth.createUserWithEmailAndPassword(email, password);
        if (user) {
            const providerData: string[] = []
            user.providerData.forEach((data: any) => {
                providerData.push(data.providerId)
            });
            const firebaseUser: any = {
                uid: user.uid,
                providerData,
                email: user.email,
                password: password,
            };
            await createProfile(firebaseUser)
            await getProfile(user.uid)
        } else {
            console.log('failed')
        }
    };

    const getProfile = async (id: string) => {
        const retrievedProfile = await firestore.collection('Users').doc(id).get();
        setProfile(retrievedProfile.data())
    
        return retrievedProfile;
    }

    const resetPassword = (email: string) => {
        return auth.sendPasswordResetEmail(email)
    };

    const login = async(email: string, password: string) => {
       const userlogin = await auth.signInWithEmailAndPassword(email, password)
       try {
            if (userlogin) {
                const firestoreProfile = await firestore.collection('Users').where("email", "==", email).get()
                let docId = '';
                firestoreProfile.forEach((doc : any) => {
                    docId = doc.id
                });
                await getProfile(docId)
            } else {
                console.log('failed')
            }
        } catch (error) {
           return error
        }
    };

    // const updateFavorites = (restaurant: {
    //     image_url:string, 
    //     name:string,
    //     location: {
    //         city:string, 
    //         state:string, 
    //         zip_code:string,
    //     }, 
    //     categories:[{
    //         title:string
    //     }],
    //     rating:number, 
    //     review_count:number
    // }) => {   
    //     const newFavorites = {favorites: [...profile.favorites, restaurant]}
    //     firestore.collection('Users').doc(currentUser.uid).update(newFavorites)
    //     setFavorites(newFavorites.favorites);
    // }

    // const deleteFavorite = (favorite: string) => {
    //     const newFavorites = profile.favorites.filter((item: any) => item.name !== favorite);
    //     firestore.collection('Users').doc(currentUser.uid).update({favorites: newFavorites});
    //     setFavorites(newFavorites.favorites);
    // }

    const logout = () => {
       return auth.signOut()
    };

    const updateFirestoreEmailAndPassword = async(email: string, password:string) => {
        firestore.collection('Users').doc(currentUser.uid).update({
            email: email,
            password: password
        })
    }

    const updateEmailAndPassword = (email: string, password: string) => {
        return(
            currentUser.updateEmail(email),
            currentUser.updatePassword(password)
        )
    };

    useEffect(() =>{
        console.log('authuse')
        const unsubscribe = auth.onAuthStateChanged(async function(user: any) {
            try {
                if (user) {
                    if(!profile) {
                        await getProfile(user.uid);
                    } 
                    // else if(!favorites) {
                    //     setFavorites(profile.favorites);
                    // }
                    setCurrentUser(user)
                    setAuthLoading(false)
                } 
                setAuthLoading(false)
            } catch (error) {    
                history.push('/error1')
                setAuthLoading(false)
            }
        });
        return unsubscribe
    }, [authLoading, profile, currentUser, history]);

    
    const value = {
        currentUser,
        profile,
        authLoading,
        // businesses,
        // favorites,
        login,
        signup,
        logout, 
        resetPassword,
        updateEmailAndPassword,
        updateFirestoreEmailAndPassword,
        // updateFavorites,
        // deleteFavorite
    };

    return( 
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

import {createContext, useContext, useEffect, useState} from "react";
import {auth, db} from '../firebase';
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import {doc, setDoc} from 'firebase/firestore'

const AuthContext = createContext(undefined)

export function AuthContextProvider({children}) {
    const [user, setUser] = useState({})

    function signUp(email, password) {
        createUserWithEmailAndPassword(auth, email, password)
        setDoc(doc(db, 'user', email), {
            savedShows: []
        })
    }

    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logOut() {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        });
        return () => {
            unsubscribe()
        }
    })
    return (
        <AuthContext.Provider value={{signUp, logOut, logIn, user}}>
            {children}
        </AuthContext.Provider>
    )
}

export function UserAuth() {
    return useContext(AuthContext)
}
import {Auth, signOut} from "firebase/auth";

export default async function signOutFunc(auth: Auth) {
    let result = null,
        error = null;
    try {
        result = await signOut(auth);
    } catch (e) {
        error = e;
    }

    return { result, error };
}
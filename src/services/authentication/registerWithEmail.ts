import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import checkUserExists from "./checkUserExists";
import { auth, db } from '@/firebaseConfig';


interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

/**
 * Register with Email
 * @param param firstName, lastName, email, password
 * @returns true is successfull, throws error if not
 */
export default async function registerWithEmail({ firstName, lastName, email, password }: RegistrationData): Promise<boolean | Error> {
  if (!auth)
    throw new Error('Authentication service not available');

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userExists = await checkUserExists(userCredential.user.uid);
    if (!userExists) {
      await createEmailUserInDatabase(userCredential.user.uid, firstName, lastName, email);
      sendEmailVerification(userCredential.user);
    }
    return true;
  } catch (error: any) {
    throw error;
  }
}

/**
 * Create a user account within the Realtime Database using Email/Password
 * @param userID User Identification
 * @param displayName Username
 * @param email User Email
 */
async function createEmailUserInDatabase(userID: string, firstName: string, lastName: string, email: string) {
  try {
    await setDoc(doc(db, `USERS/${userID}`), {
      uid: userID,
      firstName: firstName,
      lastName: lastName,
      membership: 'none',
      email: email,
      photoURL: null,
      emailVerified: null
    });
  } catch (error: any) {
    throw error;
  }
}
import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import { StatusWithCrednetial } from '@/types/StatusWithCredential';

interface SignInData {
  email: string;
  password: string;
}

/**
 * 
 * @param param sign in data 
 * @returns 
 */
export default async function signInWithEmail({ email, password }: SignInData): Promise<StatusWithCrednetial> {
  try {

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, message: null, credential: userCredential };

  } catch (error: any) {

    if (error.code === 'auth/invalid-email') {
      return { success: false, message: 'Invalid Email', credential: null };
    } else if (error.code === 'auth/wrong-password') {
      return { success: false, message: 'Incorrect Password', credential: null };
    } else if (error.code === 'auth/user-not-found') {
      return { success: false, message: 'No account with that email was found', credential: null };
    } else if (error.code === 'auth/invalid-credential') {
      return { success: false, message: 'Invalid Email or Password', credential: null };
    } else {
      console.error('Authentication error:', error);
      return { success: false, message: 'An unexpected error occurred. Please try again later.', credential: null };
    }

  }
}

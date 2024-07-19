/**
 * Status type, with credential
 * Returned from functions for error handling
 */

import { UserCredential } from "firebase/auth";

export interface StatusWithCrednetial {
  success: boolean;
  message: string | null;
  credential: UserCredential | null;
}
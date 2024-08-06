/**
 * Status type
 * Returned from functions for error handling
 */

export interface Status {
  success: boolean;
  message: string | null;
}
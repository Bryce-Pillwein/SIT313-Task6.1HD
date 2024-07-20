/**
 * Services Index File
 * - Keeps imports entralised to single '@/services' path
 */

export { default as signInWithEmail } from '@/services/authentication/signInWithEmail'
export { default as registerWithEmail } from '@/services/authentication/registerWithEmail';
export { default as signOutUser } from '@/services/authentication/signOutUser';

export { default as setPost } from '@/services/post/setPost';
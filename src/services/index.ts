/**
 * Services Index File
 * - Keeps imports entralised to single '@/services' path
 */

export { default as signInWithEmail } from '@/services/authentication/signInWithEmail'
export { default as registerWithEmail } from '@/services/authentication/registerWithEmail';
export { default as signOutUser } from '@/services/authentication/signOutUser';

export { default as setPost } from '@/services/post/setPost';
export { default as getPost } from '@/services/post/getPost';
export { default as updatePost } from '@/services/post/updatePost';
export { default as getAllQuestions } from '@/services/post/getAllQuestions';
export { default as getUserQuestions } from '@/services/post/getUserQuestions';

export { default as getUserValue } from '@/services/user/getUserValue';
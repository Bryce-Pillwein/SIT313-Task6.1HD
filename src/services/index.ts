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
export { default as getFeaturedPosts } from '@/services/post/getFeaturedPosts';

export { default as setPostComment } from '@/services/postInteractions/setPostComment';
export { default as getPostComments } from '@/services/postInteractions/getPostComments';
export { default as deletePostComment } from '@/services/postInteractions/deletePostComment';
export { default as reportPostComment } from '@/services/postInteractions/reportPostComment';

export { default as getUserValue } from '@/services/user/getUserValue';
export { default as setSubscriber } from '@/services/user/setSubscriber';
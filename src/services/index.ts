/**
 * Services Index File
 * - Keeps imports centralised to single '@/services' path
 */

// Authentication
export { default as signInWithEmail } from '@/services/authentication/signInWithEmail'
export { default as registerWithEmail } from '@/services/authentication/registerWithEmail';
export { default as signOutUser } from '@/services/authentication/signOutUser';

// Posts
export { default as setPost } from '@/services/post/setPost';
export { default as getPost } from '@/services/post/getPost';
export { default as getPostAll } from '@/services/post/getPostAll';
export { default as updatePost } from '@/services/post/updatePost';
export { default as getUserQuestions } from '@/services/post/getUserQuestions';
export { default as getPostFeatured } from '@/services/post/getPostFeatured';
export { default as getUserPostForProfilePage } from '@/services/post/getUserPostForProfilePage';

// Post Comments
export { default as setPostComment } from '@/services/postInteractions/setPostComment';
export { default as getPostComments } from '@/services/postInteractions/getPostComments';
export { default as deletePostComment } from '@/services/postInteractions/deletePostComment';
export { default as reportPostComment } from '@/services/postInteractions/reportPostComment';

// User
export { default as getUserValue } from '@/services/user/getUserValue';
export { default as updateUserProfile } from '@/services/user/updateUserProfile';
export { default as setSubscriber } from '@/services/user/setSubscriber';

// Chats
export { default as getSearchedUserResults } from '@/services/chats/getSearchedUserResults'
export { default as setNewChat } from '@/services/chats/setNewChat';
export { default as getUserChatThreads } from '@/services/chats/getUserChatThreads';
export { default as getChatMessages } from '@/services/chats/getChatMessages';
export { default as setNewMessage } from '@/services/chats/setNewMessage';
export { default as deleteChatThread } from '@/services/chats/deleteChatThread';

// Stripe
export { default as getStripe } from '@/services/util/getStripe';
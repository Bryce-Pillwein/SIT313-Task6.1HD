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
export { default as getUserPosts } from '@/services/post/getUserPosts';
export { default as getUserPostForProfilePage } from '@/services/post/getUserPostForProfilePage';
export { default as getPostByAuthorId } from '@/services/post/getPostByAuthorId';
export { default as getCalcTrending } from '@/services/post/getCalcTrending';
export { default as setTrendingPostIds } from '@/services/post/setTrendingPostIds';
export { default as getTrending } from '@/services/post/getTrending';
export { default as getPostFromSearchQuery } from '@/services/post/getPostFromSearchQuery';

// Post Comments
export { default as setPostComment } from '@/services/postInteractions/setPostComment';
export { default as getPostComments } from '@/services/postInteractions/getPostComments';
export { default as deletePostComment } from '@/services/postInteractions/deletePostComment';
export { default as reportPostComment } from '@/services/postInteractions/reportPostComment';

// Post Interactions / Reactions
export { default as addReaction } from '@/services/postInteractions/addReaction';
export { default as removeReaction } from '@/services/postInteractions/removeReaction';
export { default as getUserReactionsToPost } from '@/services/postInteractions/getUserReactionToPost';

// User
export { default as getUserValue } from '@/services/user/getUserValue';
export { default as updateUserProfile } from '@/services/user/updateUserProfile';
export { default as setSubscriber } from '@/services/user/setSubscriber';
export { default as getContributions } from '@/services/user/getContributions';

// Chats
export { default as getSearchedUserResults } from '@/services/chats/getSearchedUserResults'
export { default as setNewChat } from '@/services/chats/setNewChat';
export { default as getUserChatThreads } from '@/services/chats/getUserChatThreads';
export { default as getChatMessages } from '@/services/chats/getChatMessages';
export { default as setNewMessage } from '@/services/chats/setNewMessage';
export { default as deleteChatThread } from '@/services/chats/deleteChatThread';

// Reports
export { default as setEnquiry } from '@/services/reports/setEnquiry';

// Stripe
export { default as getStripe } from '@/services/util/getStripe';

// Weather
export { default as getWeather } from '@/services/util/getWeather';
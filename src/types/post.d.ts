
/**
 * Post - For questions and articles
 */
export interface Post {
  title: string;
  abstract?: string;
  text: string;
  tags?: string[];
  image: File | null
}
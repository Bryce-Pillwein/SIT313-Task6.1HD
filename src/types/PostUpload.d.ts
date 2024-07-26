
/**
 * Post - For questions and articles
 */
export interface PostUpload {
  title: string;
  markdownText: string;
  tags: string[];
  image: File | null
}
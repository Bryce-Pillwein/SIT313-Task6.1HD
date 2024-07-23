
/**
 * Post - For questions and articles
 */
export interface PostUpload {
  title: string;
  abstract?: string;
  text: string;
  tags: string[];
  image: File | null
}
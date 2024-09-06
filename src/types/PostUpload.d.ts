import { EditorComponent } from "./EditorComponent";

/**
 * Post - For questions and articles
 */
export interface PostUpload {
  postId?: string;
  title: string;
  tags: string[];
  image: File | null;
  postType: string;
  components: EditorComponent[];
}
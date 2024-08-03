/**
 * Editor Component
 * For Post Provider and Posting Content 
 */

export interface EditorComponent {
  id: string;
  type: 'markdown' | 'code';
  content: string;
  filetype?: string;
}
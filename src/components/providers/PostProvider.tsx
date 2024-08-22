// Post Provider tsx

import { createContext, useContext, useState } from 'react';
import { EditorComponent } from '@/types/EditorComponent';
import { useNotification } from './NotificationProvider';
import { setPost } from '@/services';
import { PostUpload } from '@/types/PostUpload';

interface PostContent {
  postType: string;
  title: string;
  tags: string[];
  image: File | null;
}

interface PostContextType {
  components: EditorComponent[];
  content: PostContent;
  addComponent: (type: 'markdown' | 'code', fileType?: string) => void;
  removeComponent: (id: string) => void;
  moveComponent: (index: number, direction: 'up' | 'down') => void;
  updateContent: (id: string, content: string) => void;
  updateComponentFiletype: (id: string, fileType: string) => void;
  updatePostType: (value: string) => void;
  handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageChange: (file: File | null) => void;
  updateContentTags: (newTags: string[]) => void;
  postContent: () => Promise<void>;
}


/**
 * Context
 */
const PostContext = createContext<PostContextType | undefined>(undefined);

// Custom hook to use the PostContext
export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePostContext must be used within a PostProvider');
  }
  return context;
};



/**
 * Provider
 */
interface PostProviderProps {
  children: React.ReactNode;
}

export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
  const { addNotification } = useNotification();
  const [components, setComponents] = useState<EditorComponent[]>([]);
  const [content, setContent] = useState<PostContent>({ postType: '', title: '', tags: [], image: null });


  // Update Post Type (null, question, article)
  const updatePostType = (value: string) => {
    setContent({ ...content, postType: value });
  }

  // Handle Post Title Change
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setContent({ ...content, [name]: value });
  };

  // Handle Post Image Change
  const handleImageChange = (file: File | null) => {
    setContent({ ...content, image: file });
  };

  // Update Content Tags
  const updateContentTags = (newTags: string[]) => {
    setContent(prevContent => ({
      ...prevContent,
      tags: newTags
    }));
  };

  // Add Component (Code / Text Block)
  const addComponent = (type: 'markdown' | 'code', fileType?: string) => {
    setComponents([...components, { id: `${type}-${Date.now()}`, type, fileType, content: '' }]);
  };

  // Remove Compoenent (Code / Text Block)
  const removeComponent = (id: string) => {
    setComponents(components.filter(component => component.id !== id));
  };

  // Mode Compoenent (Code / Text Block)
  const moveComponent = (index: number, direction: 'up' | 'down') => {
    const newComponents = [...components];
    const [movedComponent] = newComponents.splice(index, 1);
    newComponents.splice(index + (direction === 'up' ? -1 : 1), 0, movedComponent);
    setComponents(newComponents);
  };

  // Update Content Inside Component (Code / Text Block)
  const updateContent = (id: string, content: string) => {
    setComponents(prevComponents =>
      prevComponents.map(component =>
        component.id === id ? { ...component, content } : component
      )
    );
  };

  // Update File Type (extension)
  const updateComponentFiletype = (id: string, fileType: string) => {
    setComponents(prevComponents =>
      prevComponents.map(component =>
        component.id === id ? { ...component, fileType } : component
      )
    );
  };

  /**
   * Post Content
   * Intitaited within post Page. Combines provider data and calls setPost service function
   * @returns Status as notification
   */
  const postContent = async () => {
    try {
      // Combine Data
      const postData: PostUpload = {
        title: content.title,
        tags: content.tags,
        image: content.image,
        postType: content.postType,
        components,
      };

      // Determine post path in db and init setPost
      const dbPath = content.postType === 'question' ? 'POST_QUESTION' : 'POST_ARTICLE';
      const status = await setPost(postData, dbPath);

      // Set Message if exists
      if (!status.success) {
        addNotification(status.message!);
        return;
      }

      // Reset Data Fields
      setContent({ postType: '', title: '', tags: [], image: null });
      setComponents([]);
    } catch (error) {
      console.error(error);
      addNotification('Error adding post. Try again later');
    }
  };

  return (
    <PostContext.Provider value={{
      components, content, addComponent, removeComponent, moveComponent, updateComponentFiletype,
      updateContent, updatePostType, handleTitleChange, handleImageChange, updateContentTags, postContent
    }}>
      {children}
    </PostContext.Provider>
  );
};

// Post Provider tsx

import { createContext, useContext, useState } from 'react';
import { EditorComponent } from '@/types/EditorComponent';
import { useNotification } from './NotificationProvider';
import { setPost } from '@/services';

interface PostContent {
  postType: -1 | 1 | 2;
  title: string;
  tags: string[];
  image: File | null;
}

interface PostContextType {
  components: EditorComponent[];
  content: PostContent;
  addComponent: (type: 'markdown' | 'code') => void;
  removeComponent: (id: string) => void;
  moveComponent: (index: number, direction: 'up' | 'down') => void;
  updateContent: (id: string, content: string) => void;
  updatePostType: (value: -1 | 1 | 2) => void;
  handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageChange: (file: File | null) => void;
  updateContentTags: (newTags: string[]) => void;
  postContent: (event: React.FormEvent) => void;
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
  const [content, setContent] = useState<PostContent>({ postType: -1, title: '', tags: [], image: null });
  const [isUploading, setIsUploading] = useState(false);
  const [isPostType, setIsPostType] = useState<-1 | 1 | 2>(-1);

  const updatePostType = (value: -1 | 1 | 2) => {
    setContent({ ...content, postType: value });
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setContent({ ...content, [name]: value });
  };

  const handleImageChange = (file: File | null) => {
    setContent({ ...content, image: file });
  };

  const updateContentTags = (newTags: string[]) => {
    setContent(prevContent => ({
      ...prevContent,
      tags: newTags
    }));
  };

  const addComponent = (type: 'markdown' | 'code') => {
    setComponents([...components, { id: `${type}-${Date.now()}`, type, content: '' }]);
  };

  const removeComponent = (id: string) => {
    setComponents(components.filter(component => component.id !== id));
  };

  const moveComponent = (index: number, direction: 'up' | 'down') => {
    const newComponents = [...components];
    const [movedComponent] = newComponents.splice(index, 1);
    newComponents.splice(index + (direction === 'up' ? -1 : 1), 0, movedComponent);
    setComponents(newComponents);
  };

  const updateContent = (id: string, content: string) => {
    setComponents(prevComponents =>
      prevComponents.map(component =>
        component.id === id ? { ...component, content } : component
      )
    );
  };


  const postContent = async () => {
    try {
      const type = isPostType === 1 ? 'POST_QUESTION' : 'POST_ARTICLE';
      const postData = {
        ...content,
        components,
      };

      // const status = await setPost(postData, type);

      // if (!status.success) {
      //   addNotification(status.message!);
      //   return;
      // }

      setContent({ postType: -1, title: '', tags: [], image: null });
      setComponents([]);
    } catch (error) {
      console.error(error);
      addNotification('Error adding post. Try again later');
    }
  };

  return (
    <PostContext.Provider value={{
      components, content, addComponent, removeComponent, moveComponent,
      updateContent, updatePostType, handleTitleChange, handleImageChange, updateContentTags, postContent
    }}>
      {children}
    </PostContext.Provider>
  );
};

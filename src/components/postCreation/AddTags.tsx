// Add Tags tsx

import { useState } from "react";
import { useNotification } from "../providers/NotificationProvider";
import { usePostContext } from "../providers/PostProvider";


const AddTags = () => {
  const { content, updateContentTags } = usePostContext();
  const { addNotification } = useNotification();
  const [tagsInputValue, setTagsInputValue] = useState<string>('');

  /**
   * Add Tag
   * @returns null errors
   */
  const addTag = () => {
    const newTags = tagsInputValue
      .split(' ')
      .map(tag => tag.trim())
      .filter(tag => tag !== ''); // Remove empty tags

    if (newTags.length === 0) {
      addNotification('Enter Value for a Tag');
      return;
    }

    if (content.tags.length >= 5) {
      addNotification('Reached Tag Limit');
      return;
    }

    // Combine with existing tags and ensure uniqueness, limit to 5
    const combinedTags = [...content.tags, ...newTags];
    const uniqueTags = Array.from(new Set(combinedTags)).slice(0, 5);

    updateContentTags(uniqueTags); // Update parent component
    setTagsInputValue(''); // Clear input
  };

  // Delete Tag
  const deleteTag = (idx: number) => {
    const updatedTags = content.tags.filter((_, index) => index !== idx);
    updateContentTags(updatedTags); // Update parent component
  };

  return (
    <div className="w-full">
      <label htmlFor="tags" className="text-hsl-l50 text-sm">Tags (max limit 5)</label>
      <div className="flex gap-4">
        <input type="text" id="tags" name="tags" className='df-input w-full' autoComplete="off" autoCapitalize="words"
          value={tagsInputValue} onChange={(event) => setTagsInputValue(event.target.value)} />
        <button className="btn" type="button" onClick={addTag}>Add</button>
      </div>

      <div className="flex flex-wrap mb-4 mt-2 gap-x-2 gap-y-1">
        {(content.tags?.length || 0) > 0 && (
          <>
            {content.tags?.map((tag, idx) => (
              <div key={idx} onClick={() => deleteTag(idx)}
                className="px-2 py-1 text-sm bg-hsl-l90 dark:bg-hsl-l20 rounded-xl cursor-pointer hover:bg-red-500 dark:hover:bg-red-600 hover:text-hsl-l95" >
                <p>{tag}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default AddTags;
// Editor Wrapper tsx

import dynamic from 'next/dynamic'
// Components
import IconGeneral from '../icons/IconGeneral';
import { usePostContext } from '../providers/PostProvider';
import { EditorComponent } from '@/types/EditorComponent';

const DynEditorMarkdown = dynamic(() => import('./EditorMarkdown'), { loading: () => null })
const DynEditorCodeMirror = dynamic(() => import('./EditorCodeMirror'), { loading: () => null })


const EditorWrapper = () => {
  const { components, addComponent } = usePostContext();

  return (
    <div>
      <p className="text-hsl-l50 text-sm text-center">Post Content</p>

      {components.map((component: EditorComponent, index: number) => (
        <div key={component.id} className='mt-4 mb-8'>
          {component.type === 'markdown' ? (
            <DynEditorMarkdown
              id={component.id}
              index={index}
              componentsLength={components.length}
            />
          ) : (
            <DynEditorCodeMirror
              id={component.id}
              index={index}
              componentsLength={components.length}
            />
          )}
        </div>
      ))}

      {/* Add New Code Block Tool Bar */}
      <div className='flex justify-end items-center gap-4 bg-hsl-l98 dark:bg-hsl-l20 rounded-md border border-solid border-hsl-l90 dark:border-hsl-l25'>
        <p className="text-hsl-l50 text-xs">Add Content:</p>

        <div className='flex justify-center items-center'>
          <button type="button" title='Add Markdown'
            className='rounded-sm hover:bg-mb-pink dark:hover:bg-mb-yellow py-2 px-4 border-l border-solid border-hsl-l90 dark:border-hsl-l25'
            onClick={() => addComponent('markdown')} >
            <IconGeneral type='markdown' size={30} fillLightMode='hsl(0 0% 20%)' fillDarkMode='hsl(0 0% 80%)' />
          </button>

          <button type="button" title='Add Code'
            className='rounded-sm hover:bg-mb-pink dark:hover:bg-mb-yellow py-2 px-4 border-l border-solid border-hsl-l90 dark:border-hsl-l25'
            onClick={() => addComponent('code')} >
            <IconGeneral type='terminal' size={30} fillLightMode='hsl(0 0% 20%)' fillDarkMode='hsl(0 0% 80%)' />
          </button>
        </div>
      </div>


    </div>
  );
};

export default EditorWrapper;

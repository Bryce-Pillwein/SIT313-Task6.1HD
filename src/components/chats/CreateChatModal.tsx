// Create Chat Modal tsx

"use client";

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { User } from '@/types/User';
import { getSearchedUserResults } from '@/services';
import IconGeneral from '../icons/IconGeneral';

// const createChatWithSelectedUsers = async (selectedUsers: User[]) => {
//   const participantIds = selectedUsers.map(user => user.uid);
//   // Call your addNewChat function here with the participant IDs
//   await addNewChat(participantIds);
// };

interface CreateChatModalProps {
  onClose: () => void;
}

const CreateChatModal: React.FC<CreateChatModalProps> = ({ onClose }) => {
  const innerDivRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  /**
   * Create event listerner for mouse clicks in modal menu
   */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    const handleClickOutside = (event: MouseEvent) => {
      if (innerDivRef.current && !innerDivRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  /**
   * Fetch Users
   * Use Search Term and return potential users
   */
  useEffect(() => {
    const fetchUsers = async () => {
      if (searchTerm.length > 0) {
        try {
          const users = await getSearchedUserResults(searchTerm);
          setUsers(users);
        } catch (error) {
          console.error('Error fetching users:', error);
          setUsers([]);
        }
      } else {
        setUsers([]);
      }
    };

    fetchUsers();
  }, [searchTerm]);

  // Function to select a user
  const selectUser = (user: User) => {
    setSelectedUsers(prev => [...prev, user]);
    setSearchTerm('');
    setUsers([]); // Clear search results after selection
  };

  // Function to remove a selected user
  const removeSelectedUser = (userId: string) => {
    setSelectedUsers(prev => prev.filter(user => user.uid !== userId));
  };

  return createPortal(
    <div className='fixed top-0 left-0 w-[100vw] h-[100vh] bg-black bg-opacity-70 flex flex-col justify-center items-center z-50'>
      <div ref={innerDivRef}
        className="bg-hsl-l98 dark:bg-hsl-l13 rounded-md flex flex-col min-w-[50%] max-w-[98%] mb:max-w-[90%] lg:max-w-[60%] min-h-[70%] max-h-[80%] px-4 py-4">

        {/* Title and close button */}
        <div className='flex justify-between items-center my-2'>
          <p className='font-medium text-xl'>Create a new chat</p>
          <button type='button' onClick={onClose}>
            <IconGeneral type='close' className='hover:fill-red-800' />
          </button>
        </div>

        {/* Selected Users */}
        {selectedUsers.length > 0 && (
          <>
            <p className='text-hsl-l50 text-sm mt-4'>Selected Users</p>
            <div className='flex items-center gap-4 mb-4'>
              {selectedUsers.map((user, idx) => (
                <div key={idx} onClick={() => removeSelectedUser(user.uid)}
                  className="group bg-hsl-l95 dark:bg-hsl-l15 rounded-md px-2 py-1" >
                  <p className='group-hover:text-red-600'>{user.firstName} {user.lastName}</p>
                </div>
              ))}
            </div>
          </>
        )}


        {/* Search and Results */}
        <div className='mt-4'>
          <p className='text-hsl-l50 text-sm'>Search New User</p>

          <input type="text" value={searchTerm} placeholder="User Name..."
            className="df-input w-full bg-hsl-l100"
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {users.length > 0 && (
            <div className="bg-hsl-l100 dark:bg-hsl-l15 border dark:border-mb-yellow mt-2 rounded">
              {users.map((user, idx) => (
                <p key={idx} onClick={() => selectUser(user)}
                  className="p-2 hover:bg-mb-pink dark:hover:bg-mb-yellow cursor-pointer">
                  {user.firstName} {user.lastName}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className='flex flex-col justify-end items-end flex-grow flex-shrink-0 pb-8'>
          {selectedUsers.length > 0 && (
            <button className="btn"
            // onClick={() => createChatWithSelectedUsers(selectedUsers)}
            >
              Create Chat
            </button>
          )}

        </div>

      </div>
    </div>,
    document.body
  );
};

export default CreateChatModal;

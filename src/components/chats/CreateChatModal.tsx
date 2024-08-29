// Create Chat Modal tsx

"use client";

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { User } from '@/types/User';
import { setNewChat, getSearchedUserResults } from '@/services';
import IconGeneral from '../icons/IconGeneral';
import { useNotification } from '../providers/NotificationProvider';

interface CreateChatModalProps {
  onClose: () => void;
  refresh: () => void;
}

const CreateChatModal: React.FC<CreateChatModalProps> = ({ onClose, refresh }) => {
  const { addNotification } = useNotification();
  const innerDivRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [initialMessage, setInitialMessage] = useState<string>('');

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
          const allUsers = await getSearchedUserResults(searchTerm);
          // Filter out selected users from the list of all users
          const filteredUsers = allUsers.filter(user =>
            !selectedUsers.some(selectedUser => selectedUser.uid === user.uid));
          setUsers(filteredUsers);
        } catch (error) {
          console.error('Error fetching users:', error);
          addNotification('An Error occured. Refresh');

          setUsers([]);
        }
      } else {
        setUsers([]);
      }
    };

    fetchUsers();
  }, [searchTerm]);

  /**
   * Select User
   * @param user 
   */
  const selectUser = (user: User) => {
    setSelectedUsers(prev => [...prev, user]);
    setSearchTerm('');
    setUsers([]); // Clear search results after selection
  };

  /**
   * Remove Selected User
   * @param userId User id
   */
  const removeSelectedUser = (userId: string) => {
    setSelectedUsers(prev => prev.filter(user => user.uid !== userId));
  };

  /**
   * Create Chat With Selected Users
   * @returns 
   */
  const createChatWithSelectedUsers = async () => {
    try {
      const validMessage = initialMessage.trim();
      if (selectedUsers.length <= 0 || validMessage.length <= 0) return;

      const response = await setNewChat(selectedUsers, validMessage);
      if (!response.success) {
        addNotification(response.message!);
        return;
      }
      addNotification('Message Sent!');
      refresh();
      onClose();
    } catch (error) {
      console.error('Error fetching users:', error);
      addNotification('Error creating chat');
    }
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


        {/* Search and Results */}
        <div className='mt-4'>
          <input type="text" value={searchTerm} placeholder="Search User Name..."
            className="df-input w-full !bg-hsl-l100"
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {users.length > 0 && (
            <div className="bg-hsl-l100 dark:bg-hsl-l15 border dark:border-mb-yellow mt-2 rounded">
              {users.map((user, idx) => (
                <div key={idx} onClick={() => selectUser(user)}
                  className=" p-2 hover:bg-mb-pink dark:hover:bg-mb-yellow cursor-pointer">
                  <p >{user.firstName} {user.lastName} </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Users */}
        {selectedUsers.length > 0 && (
          <>
            <p className='text-hsl-l50 text-sm mt-8'>Selected Users</p>
            <div className='flex items-center gap-4 mb-4'>
              {selectedUsers.map((user, idx) => (
                <div key={idx} onClick={() => removeSelectedUser(user.uid)}
                  className="flex items-center bg-hsl-l95 dark:bg-hsl-l15 rounded-md px-2 py-1 cursor-pointer" >
                  <p>{user.firstName} {user.lastName}</p>
                  <IconGeneral type='delete' className='fill-red-600' size={20} />
                </div>
              ))}
            </div>
          </>
        )}

        {/* Message Input */}
        {selectedUsers.length > 0 && (
          <div className='mt-4'>
            <input type="text" value={initialMessage} placeholder="Message"
              className="input-resize-content df-input w-full !bg-hsl-l100"
              onChange={(e) => setInitialMessage(e.target.value)}
            />
          </div>
        )}

        {/* Button */}
        <div className='flex flex-col justify-end items-end flex-grow flex-shrink-0 pb-8'>
          {(selectedUsers.length > 0) && (initialMessage?.length > 0) && (
            <button type="button" className="btn"
              onClick={() => createChatWithSelectedUsers()}>Send Message</button>
          )}
        </div>

      </div>
    </div>,
    document.body
  );
};

export default CreateChatModal;

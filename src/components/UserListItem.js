import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ConfirmDialog from './ConfirmDialog';
import {useStore, types} from '../StoreContext';

const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

/**
 * @name UserListItem
 * @description User List Item
 * @example
 *  <UserListItem user={id: '1} />
 */
const UserListItem = ({ user }) => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [, dispatch] = useStore();

    const handleRemove = (userId) => {
        dispatch({type: types.REMOVE_USER_ACTION, id: userId});
        setShowDeleteConfirm(false);
    }

    if(!user){
        return user;
    }

    return <div className='flex items-center py-3' data-testid='user-list-item'>
        <span className='w-8 h-8 rounded-full inline-flex items-center justify-center text-white capitalize' style={{ backgroundColor: getRandomColor() }}>{user.givenName && user.givenName[0]}</span>
        <span className='px-2 flex-grow'>{user.email}</span>
        <div>
            <button className='btn px-2 py-0 text-gray hover:text-secondary-coral fill-current' aria-label='edit' data-testid='editBtn' title='edit' onClick={() => dispatch({type: types.EDIT_USER_ACTION, id:user.id})}><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" /><path d="M0 0h24v24H0z" fill="none" /></svg></button>
            <button className='btn px-2 py-0 text-gray hover:text-secondary-coral fill-current' aria-label='remove' data-testid='deleteBtn' title='remove' onClick={() => setShowDeleteConfirm(true)}><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"/><path d="M0 0h24v24H0V0z" fill="none"/></svg></button>
        </div>
        <ConfirmDialog 
        isOpen={showDeleteConfirm} 
        title={`Delete user ${user.givenName}`} 
        desc='Are you sure you want to delete this user?' 
        onClose={() => setShowDeleteConfirm(false)}
        id={user.id}
        onConfirm={handleRemove}
        />
    </div>
}

UserListItem.propTypes = {
    user: PropTypes.object
}

export default UserListItem;
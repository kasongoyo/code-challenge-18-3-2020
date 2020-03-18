import React from 'react';
import {useStore, types} from '../StoreContext';
import UserListItem from './UserListItem';

/**
 * @name UserList
 * @description List users
 * @example <UserList />
 */
const UserList = () => {
    const [store, dispatch] = useStore();
    const {users} = store;

    if (!users || !users.length) {
        return <section className='text-center pt-12'>
            <h3 className='text-3xl font-bold'>No Users Yet</h3>
            <button className='btn text-gray' onClick={() => dispatch({type: types.EDIT_USER_ACTION})}>Click to Add User</button>
        </section>
    }
    return (
        <ul>
            {users.map(user => <UserListItem key={user.id} user={user} />)}
        </ul>
    )
}

export default UserList;
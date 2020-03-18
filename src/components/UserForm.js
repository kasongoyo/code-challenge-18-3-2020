import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useStore, types } from '../StoreContext';

const customStyles = {
    overlay: {
        backgroundColor: 'hsla(0, 0%, 0%, 0.5)',
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        // padding: 0,
    },
};

const initialUser = {
    givenName: '',
    lastName: '',
    email: '',
    active: false
}

/**
 * @name UserForm
 * @description Form used to save or edit user details
 * @example
 *    <UserForm />
 */
const UserForm = () => {
    Modal.setAppElement('#root');
    const [show, setShow] = useState(false);
    const [store, dispatch] = useStore();
    const { showUserForm, userToEdit } = store;
    const [user, setUser] = useState(initialUser);

    useEffect(() => {
        if (userToEdit) {
            setUser({ ...initialUser, ...userToEdit });
        }
    }, [userToEdit]);

    useEffect(() => {
        setShow(showUserForm);
        if(!showUserForm){
            setUser(initialUser);
        }
    }, [showUserForm]);

    const handleClose = () => {
        setUser(initialUser);
        dispatch({ type: types.CLOSE_USER_FORM });
    };

    const handleChange = event => {
        const { value, checked, type, id } = event.target;
        setUser(prevUser => ({ ...prevUser, [id]: type === 'checkbox' ? checked : value }));
    }

    const handleSave = () => {
        dispatch({ type: types.SAVE_USER_ACTION, payload: user });
    };

    return (
        <Modal
            isOpen={show}
            style={customStyles}
            className='w-1/2 absolute bg-white rounded'
        >
            <header className='flex items-center bg-gray-lighter p-2 rounded-t border-b border-gray-light'>
                <h5 className='font-bold'>{user.id ? 'Edit User' : 'Add User'}</h5>
                <button
                    className='ml-auto'
                    onClick={handleClose}
                    aria-label='Close'
                    title='Close'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className='text-gray fill-current' height="24" viewBox="0 0 24 24" width="24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /><path d="M0 0h24v24H0z" fill="none" /></svg>
                </button>
            </header>
            <form className='px-8 py-6 border-b border-gray-light' data-testid='user-form'>
                <label htmlFor='givenName' className='block'>First Name</label>
                <input id='givenName' type='text' placeholder='First Name' value={user.givenName} onChange={handleChange} className='input block mb-3' />
                <label htmlFor='lastName' className='block'>Last Name</label>
                <input id='lastName' type='text' placeholder='Last Name' value={user.lastName} onChange={handleChange} className='input block mb-3' />
                <label htmlFor='lastName' className='block'>Email</label>
                <input id='email' type='email' placeholder='Last Name' value={user.email} onChange={handleChange} className='input block mb-3' />
                <label htmlFor='status'>
                    <input type='checkbox' checked={user.active} id='active' onChange={handleChange} />&nbsp; Active
        </label>
            </form>
            <div className='p-2'>
                <button
                    className='btn btn-primary'
                    onClick={handleSave}
                >
                    SAVE
        </button>
                <button className='btn' onClick={handleClose}>
                    Cancel
        </button>
            </div>
        </Modal>
    );
};

export default UserForm;
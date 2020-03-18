import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';



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

/**
 * @name ConfirmDialog
 * @description Dialog component used to ask user to quickly confirm
 * about certain action he is about to do in the application
 * @example 
 * <ConfirmDialog
 *      isOpen={show} 
 *      title={`Delete user`} 
 *      desc='Are you sure you want to delete this user?' 
 *      onClose={handleShow}
 *      id={id}
 *      onConfirm={handleRemove}>
 * </ConfirmDialog>
 */
const ConfirmDialog = ({
    id,
    isOpen,
    title,
    desc,
    okText,
    cancelText,
    onClose,
    onConfirm,
}) => {
    Modal.setAppElement('#root');
    const [show, setShow] = useState(true);
    useEffect(() => {
        setShow(isOpen);
    }, [isOpen]);

    const handleClose = () => {
        onClose();
    };

    const handleConfirm = () => {
        onConfirm(id);
    };

    return (
        <Modal
            isOpen={show}
            style={customStyles}
            className='w-1/2 absolute bg-white rounded'
        >
            <header className='flex items-center bg-gray-lighter p-2 rounded-t border-b border-gray-light'>
                <h5 className='font-semibold'>{title}</h5>
                <button
                    className='ml-auto'
                    onClick={handleClose}
                    aria-label='Close'
                    title='Close'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className='text-gray fill-current' height="24" viewBox="0 0 24 24" width="24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /><path d="M0 0h24v24H0z" fill="none" /></svg>
                </button>
            </header>
            <div className='px-2 py-4 border-b border-gray-light'>
                {desc}
            </div>
            <div className='p-2'>
                <button
                    className='btn btn-primary'
                    onClick={handleConfirm}
                >
                    {okText || 'OK'}
                </button>
                <button className='btn' onClick={handleClose}>
                    {cancelText || 'Cancel'}
                </button>
            </div>
        </Modal>
    );
};

ConfirmDialog.propTypes = {
    id: PropTypes.string.isRequired,
    isOpen: PropTypes.bool,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    okText: PropTypes.string,
    cancelText: PropTypes.string,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func,
};

export default ConfirmDialog;

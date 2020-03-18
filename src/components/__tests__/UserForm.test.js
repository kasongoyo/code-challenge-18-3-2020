import React from 'react';
import { render } from '@testing-library/react';
import UserForm from '../UserForm';
import { StoreProvider } from '../../StoreContext';

/**
 * TODO
 * 1. should render default user form(form with 4 input fields)
 * 2. should save when save button is clicked
 * 3. should hide the form when cancel is clicked
 * Testing this component thorough need more time since the core
 * library(react-modal) use react portal which need different test strategy than 
 * normal tests
 */
describe('UserForm tests', () => {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'root');

    test('should render default userForm', () => {
        const store = {
            showUserForm: true
        }
        const tree = (
            <StoreProvider store={store}>
                <UserForm />
            </StoreProvider>
        );
        const { debug } = render(tree, {
            container: document.body.appendChild(modalRoot),
        });
        debug();
    });
});
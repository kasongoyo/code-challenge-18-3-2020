import React from 'react';
import { render } from '@testing-library/react';
import { StoreProvider } from '../../StoreContext';
import UserList from '../UserList';

describe('UserList', () => {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'root');
    test('should render empty user lists placeholder', () => {
        const tree = (
            <StoreProvider >
                <UserList />
            </StoreProvider>
        );
        const {getByText} = render(tree);
        expect(getByText(/No Users Yet/i)).toBeInTheDocument();
    });

    test('should render user lists', () => {
        const store = {
            users: [{id: '1'}, {id: '2'}]
        }
        const tree = (
            <StoreProvider store={store} >
                <UserList />
            </StoreProvider>
        );
        const {getAllByTestId} = render(tree, {
            container: document.body.appendChild(modalRoot)
        });
        expect(getAllByTestId(/user-list-item/i)).toHaveLength(2);
    });
});
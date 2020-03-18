import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { StoreProvider } from '../../StoreContext';
import UserListItem from '../UserListItem';

describe('UserListItem', () => {
    const user = {
        id: `${Date.now()}`,
        givenName: 'test',
        email: 'test@gma.com'
    }
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'root');
    

    test('should render default', () => {
        const { getAllByRole, getByText } = render(<StoreProvider><UserListItem user={user} /></StoreProvider>, {
            container: document.body.appendChild(modalRoot)
        });
        expect(getAllByRole('button')).toHaveLength(2);
        expect(getByText(/^t$/i)).toBeInTheDocument();
        expect(getByText(/test@gma.com/i)).toBeInTheDocument();
    });

    test('should trigger user edit', async () => {
        const dispatch = jest.fn();
        const tree = (
            <StoreProvider dispatch={dispatch}>
                <UserListItem user={user} />
            </StoreProvider>
        )
        const { getByTestId } = render(tree, {
            container: document.body.appendChild(modalRoot)
        });

        fireEvent.click(getByTestId(/editbtn/i));
        expect(dispatch).toHaveBeenCalled();
    });
});
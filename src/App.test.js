// dependencies
import React from 'react';
import { render } from '@testing-library/react';
import { StoreProvider } from './StoreContext';
import App from './App';


describe('App tests', () => {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'root');
    test('should render App', () => {
        const store = {
            users: [{ email: 'kaso@gmal.com', id: '1' }]
        }
        const { getByAltText, getByText } = render(<StoreProvider store={store}><App /></StoreProvider>, {
            container:  document.body.appendChild(modalRoot)
        });
        expect(getByAltText('logo')).toBeInTheDocument();
        expect(getByText(/Add user/i)).toBeInTheDocument();
        expect(getByText(/users/i)).toBeInTheDocument();
    });
});
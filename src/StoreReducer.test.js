import reducer from './StoreReducer';
import * as types from './types';

describe('Store Reducer', () => {
    test('should remove user', () => {
        const store = {
            users: [{ id: '1' }]
        }
        const state = reducer(store, {type: types.REMOVE_USER_ACTION, id: '1'});
        expect(state.users).toHaveLength(0);
    });

    test('should show user edit form', () => {
        const store = {
            users: [{ id: '1' }]
        }
        const state = reducer(store, {type: types.EDIT_USER_ACTION, id: '1'});
        expect(state.showUserForm).toBe(true);
        expect(state.userToEdit).toEqual({id: '1'});
    });

    test('should save new user', () => {
        const store = {
            users: [{ id: '1', email:'test@mail.com' }]
        }
        const state = reducer(store, {type: types.SAVE_USER_ACTION, payload: {email: 'new@mail.com'}});
        expect(state.users).toHaveLength(2);
    });

    test('should update existing user', () => {
        const store = {
            users: [{ id: '1', email:'test@mail.com' }]
        }
        const state = reducer(store, {type: types.SAVE_USER_ACTION, payload: {id: '1', email: 'new@mail.com'}});
        expect(state.users).toHaveLength(1);
        expect(state.users[0].email).toBe('new@mail.com');
    });

    test('should not add duplicate user', () => {
        const store = {
            users: [{ id: '1', email:'test@mail.com' }]
        }
        const state = reducer(store, {type: types.SAVE_USER_ACTION, payload: {email: 'test@mail.com'}});
        expect(state.users).toHaveLength(1);
    });

    test('should show user edit form', () => {
        const store = {
           showUserForm: true
        }
        const state = reducer(store, {type: types.CLOSE_USER_FORM});
        expect(state.showUserForm).toBe(false);
    });
});
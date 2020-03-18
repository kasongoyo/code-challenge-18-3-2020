
import { types } from './StoreContext';
import { setUsers } from './localStorage';

const storeReducer = (state, action) => {
    switch (action.type) {
        case types.REMOVE_USER_ACTION: {
            const updatedUsers = state.users.filter(user => user.id !== action.id);
            setUsers(updatedUsers);
            return { ...state, users: updatedUsers }
        }
        case types.EDIT_USER_ACTION: {
            let userToEdit;
            if (action.id) {
                userToEdit = state.users.find(user => user.id === action.id);
            }
            return { ...state, showUserForm: true, userToEdit };
        }
        case types.SAVE_USER_ACTION: {
            const { payload } = action;
            let updatedUsers = state.users;
            if (payload.id) {
                // update existing user
                updatedUsers = state.users.map((user) => {
                    if (user.id === payload.id) {
                        return payload;
                    }
                    return user;
                });
            } else {
                // new user
                const emailExist = state.users.some(user => user.email === payload.email);
                if (!emailExist) {
                    const user = { ...payload, id: `${Date.now()}` };
                    updatedUsers = [...state.users, user];;
                }
                // duplicate user
                // TODO show notification/alert to user, fail to add duplicate user
            }
            setUsers(updatedUsers);
            return { ...state, users: updatedUsers, showUserForm: false, userToEdit: undefined };
        }
        case types.CLOSE_USER_FORM:
            return { ...state, showUserForm: false, userToEdit: undefined }
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

export default storeReducer;
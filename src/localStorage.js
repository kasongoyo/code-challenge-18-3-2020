/**
 * @name localStorage
 * Local Storage service to persist and read user data
 * TODO add tests for this service
 */

export const setUsers = users => {
    localStorage.setItem('users', JSON.stringify(users));
}

export const getUsers = () => {
    const users = JSON.parse(localStorage.getItem('users'));
    return users;
}
import React from 'react';
import logo from './logo.png';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import {useStore, types} from './StoreContext';

function App() {
  const [, dispatch] = useStore();
  return (
    <div>
      <header className='border-b border-primary bg-white'>
        <nav className='max-w-4xl mx-auto py-3 flex justify-center'>
          <a href='/'><img src={logo} className='w-48' alt='logo'></img></a>
        </nav>
      </header>
      <section className='max-w-xl mx-auto pt-8'>
        <header className='mb-6 flex items-center'>
          <h3 className='text-3xl font-bold'>Users</h3>
          <button className='btn btn-primary ml-auto' onClick={() => dispatch({type: types.EDIT_USER_ACTION})}>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" className='w-4 h-4 inline-block mr-2 text-white fill-current' viewBox="0 0 768 768">
              <title></title>
              <g id="icomoon-ignore">
              </g>
              <path d="M160 416h192v192c0 17.664 14.336 32 32 32s32-14.336 32-32v-192h192c17.664 0 32-14.336 32-32s-14.336-32-32-32h-192v-192c0-17.664-14.336-32-32-32s-32 14.336-32 32v192h-192c-17.664 0-32 14.336-32 32s14.336 32 32 32z"></path>
            </svg>
            <span>Add User</span></button>
        </header>
        <UserList />
      </section>
      <UserForm />
    </div>
  );
}

export default App;

import { store } from '@/config/store';
import { IUserLogin } from '../models';
import { selectCurrentUser } from '../redux';

export default function getCurrentUser(): IUserLogin {
  const state = store.getState();
  const currentUser = selectCurrentUser(state);

  if (!currentUser) {
    throw new Error('Current user not found');
  };

  return currentUser;
}

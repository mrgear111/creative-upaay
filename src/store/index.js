import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';

const persistenceMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  console.log('Saving state to localStorage:', state.tasks);
  localStorage.setItem('boardState', JSON.stringify(state.tasks));
  return result;
};

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistenceMiddleware),
});

if (typeof window !== 'undefined') {
  window.store = store;
}

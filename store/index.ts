import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import postsReducer from './slices/postsSlice';
import favoritesReducer from './slices/favoritesSlice';
import userReducer from './slices/userSlice';
import usersReducer from './slices/usersSlice';
import commentsReducer from './slices/commentsSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['favorites'],
};

const rootReducer = combineReducers({
  posts    : postsReducer,
  favorites: favoritesReducer,
  user     : userReducer,
  users    : usersReducer,
  comments : commentsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
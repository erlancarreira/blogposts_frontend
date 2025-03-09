import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, Post, PostWithUser } from '@/types';
import { apiService } from '@/services/api';
import { addUserToPostUsers } from './postsSlice';
import { SESSION_KEY } from '@/constants';
import { getData } from '@/utils/storage';
import { formatSessionUser } from '@/utils';
import { RootState } from '@/store';

interface UserState {
  user: User | null;
  userPosts: PostWithUser[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  userPosts: [],
  loading: false,
  error: null,
};

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId: number, { dispatch }) => {
    const session = await getData<User>(SESSION_KEY);
    
    let user: User;
    
    if (session && Number(userId) === Number(session.id)) {
      user = formatSessionUser(session);
    } else {
      user = await apiService.get<User>(`/users/${userId}`); 
    }

    dispatch(addUserToPostUsers(user));

    return user;
  }
);

export const fetchUserPosts = createAsyncThunk(
  'user/fetchUserPosts',
  async (userId: number, { getState }) => {
    const state = getState() as RootState;
    const session = await getData<User>(SESSION_KEY);
    const posts = await apiService.get<Post[]>(`/users/${userId}/posts`);

    let user: User | undefined;

    if (session && Number(userId) === Number(session.id)) {
      user = formatSessionUser(session);
    } else {
      user = state.users.users.find(u => u.id === userId);
    }

    const postsWithUsers = posts.map(post => ({
      ...post,
      user 
    }));

    return postsWithUsers;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Falhou ao buscar o perfil';
      })

      .addCase(fetchUserPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action: PayloadAction<PostWithUser[]>) => {
        state.loading = false;
        state.userPosts = action.payload;
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Falhou ao buscar os posts do usuário';
      });
  },
});

export default userSlice.reducer;

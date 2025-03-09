import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiService } from '@/services/api';
import { Post, PostWithUser, User } from '@/types';
import { getData } from '@/utils/storage';
import { SESSION_KEY } from '@/constants';
import { RootState } from '@/store';
import { formatSessionUser, getPaginationData } from '@/utils';
import { fetchUsers } from './usersSlice';

interface PostsState {
  posts: PostWithUser[];
  allPosts: PostWithUser[];
  currentPost: PostWithUser | null;
  currentUser: User | null;
  postUsers: { [key: number]: User };
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  searchQuery: string;
  isSearching: boolean;
  currentPage: number;
  hasMore: boolean;
}

const initialState: PostsState = {
  posts: [],
  allPosts: [],
  currentPost: null,
  currentUser: null,
  postUsers: {},
  loading: false,
  loadingMore: false,
  error: null,
  searchQuery: '',
  isSearching: false,
  currentPage: 1,
  hasMore: true,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const { currentPage, searchQuery, isSearching } = state.posts;
    
    // Garantir que temos os usuários
    let users = state.users.users;
    if (users.length === 0) {
      await dispatch(fetchUsers());
      const newState = getState() as RootState;
      users = newState.users.users;
    }

    let url = '/posts';
    if (searchQuery && isSearching) {
      // Se estiver buscando, não usar paginação
      url += `?title_like=${searchQuery}`;
    } else {
      // Se não estiver buscando, usar paginação normal
      const { start, limit } = getPaginationData(currentPage);
      url += `?_start=${start}&_limit=${limit}`;
    }

    const response = await apiService.get<Post[]>(url);
    
    const postsWithUsers = response.map(post => {
      const user = users.find(u => u.id === post.userId);
      return {
        ...post,
        user
      };
    });
    
    return {
      posts: postsWithUsers,
      hasMore: !searchQuery && response.length >= 10, 
      allPosts: postsWithUsers
    };
  }
);

export const fetchPostDetails = createAsyncThunk(
  'posts/fetchPostDetails',
  async (postId: number, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const existingPost = state.posts.posts.find(post => post.id === postId);
    
    if (!existingPost) {
      return rejectWithValue('Post não encontrado');
    }

    const session = await getData<User>(SESSION_KEY);
    
    let user: User;
    if (session && Number(existingPost.userId) === Number(session.id)) {
      user = formatSessionUser(session);
    } else {
      user = await apiService.get<User>(`/users/${existingPost.userId}`);
    }
    
    return { 
      post: {
        ...existingPost,
        user
      },
      user 
    };
  }
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData: { title: string; body: string; userId: number }, { rejectWithValue }) => {
   
    const response = await apiService.post<Post>('/posts', postData);
    
    const session = await getData<User>(SESSION_KEY);
    
    if (!session) { 
      return rejectWithValue('Usuário não autenticado');
    }

    const user = formatSessionUser(session);
    
    return {
      ...response,
      id: Date.now(),
      userId: session?.id,
      user
    } as PostWithUser;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setIsSearching: (state, action: PayloadAction<boolean>) => {
      state.isSearching = action.payload;
    },
    loadPost: (state, action: PayloadAction<PostWithUser>) => {
      state.currentPost = action.payload;
    },
    addUserToPostUsers: (state, action: PayloadAction<User>) => {
      state.postUsers[action.payload.id] = action.payload;
    },
    resetPagination: (state) => {
      state.currentPage = 1;
      state.hasMore = true;
      state.posts = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        if (state.currentPage === 1) {
          state.loading = true;
        } else {
          state.loadingMore = true; 
        }
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<{ posts: PostWithUser[], hasMore: boolean, allPosts: PostWithUser[] }>) => {
        state.loading = false;
        state.loadingMore = false;
    
        if (state.currentPage === 1) {
          state.allPosts = action.payload.allPosts;
          state.posts = action.payload.posts;
        } else {
          const existingIds = new Set(state.posts.map(post => post.id));
          const newPosts = action.payload.posts.filter(post => !existingIds.has(post.id));
          if (newPosts.length > 0) {
            state.posts = [...state.posts, ...newPosts];
          }
        }
      
        state.hasMore = action.payload.hasMore;
        if (action.payload.hasMore && action.payload.posts.length > 0) {
          state.currentPage += 1;
        }
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.loadingMore = false;
        state.error = action.error.message || 'Falhou ao buscar os posts';
      })
      
      .addCase(fetchPostDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostDetails.fulfilled, (state, action: PayloadAction<{post: PostWithUser, user: User}>) => {
        state.loading = false;
        state.currentPost = action.payload.post;
        state.currentUser = action.payload.user;
      })
      .addCase(fetchPostDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Falhou ao buscar os detalhes do post';
      })
      
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<PostWithUser>) => {
        state.loading = false;
        state.posts.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Falhou ao criar o post';
      });
  },
});

export const { 
  setSearchQuery, 
  setIsSearching, 
  loadPost, 
  addUserToPostUsers, 
  resetPagination 
} = postsSlice.actions;

export default postsSlice.reducer;

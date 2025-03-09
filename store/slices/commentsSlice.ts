import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiService } from '@/services/api';
import { Comment } from '@/types';

interface CommentsState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: null,
};

export const addComment = createAsyncThunk(
  'comments/addComment',
  async ({ postId, comment }: { postId: number; comment: Omit<Comment, 'id' | 'postId'> }) => {
    const response = await apiService.post<Comment>(`/posts/${postId}/comments`, {
      ...comment,
      postId,
    });
    
    return {
      ...response,
      id: response.id || Date.now(),
      postId
    };
  }
);

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const response = await apiService.get<Comment[]>(`/posts/${postId}/comments`);
    return response;
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action: PayloadAction<Comment[]>) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao carregar comentários';
      })
      .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action: PayloadAction<Comment>) => {
        state.loading = false;
        state.comments.unshift(action.payload);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao adicionar comentário';
      });
  },
});

export default commentsSlice.reducer;
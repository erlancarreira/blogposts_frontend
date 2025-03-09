import { apiService } from './api';

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

interface CreatePostDTO {
  title: string;
  content: string;
}

interface UpdatePostDTO {
  title?: string;
  content?: string;
}

const postsService = {
  
  getAllPosts: () => 
    apiService.get<Post[]>('/posts'),
  
  getPostById: (id: string) => 
    apiService.get<Post>(`/posts/${id}`),
  
  createPost: (data: CreatePostDTO) => 
    apiService.post<Post>('/posts', data),
  
  updatePost: (id: string, data: UpdatePostDTO) => 
    apiService.put<Post>(`/posts/${id}`, data),
  
  deletePost: (id: string) => 
    apiService.delete<void>(`/posts/${id}`),

  getPostsByAuthor: (authorId: string) => 
    apiService.get<Post[]>(`/posts/author/${authorId}`),
};

export default postsService;
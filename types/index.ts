import { Theme } from '@/context/ThemeContext';

export interface StyledProps {
  theme: Theme;
}

export interface Credentials {
  name   ?: string;
  email   : string;
  password: string;
};

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  username?: string;
  password?: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo?: {
      lat: string;
      lng: string;
    };
  };
  phone?: string;
  website?: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface PostWithUser extends Post {
  user?: User;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}
export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

export interface Recipe {
  id: number;
  name: string;
  image: string;
  cuisine: string;
  difficulty: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
}
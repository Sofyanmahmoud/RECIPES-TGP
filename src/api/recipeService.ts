import axiosClient from './axiosClient';
import { Recipe } from '../types';

// Get all recipes
export const getRecipes = async (): Promise<Recipe[]> => {
  const response = await axiosClient.get('/recipes');
  return response.data.recipes;
};

// Get single recipe by ID
export const getRecipe = async (id: number): Promise<Recipe> => {
  const response = await axiosClient.get(`/recipes/${id}`);
  return response.data;
};

// Create new recipe
export const createRecipe = async (recipe: Partial<Recipe>): Promise<Recipe> => {
  const response = await axiosClient.post('/recipes/add', recipe);
  return response.data;
};

// Update existing recipe
export const updateRecipe = async (id: number, recipe: Partial<Recipe>): Promise<Recipe> => {
  const response = await axiosClient.put(`/recipes/${id}`, recipe);
  return response.data;
};

// Delete recipe
export const deleteRecipe = async (id: number) => {
  const response = await axiosClient.delete(`/recipes/${id}`);
  return response.data;
};
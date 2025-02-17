import categoriesJson from '@/stores/categories.json';
import { Category } from '@/types/Votes';

const getCategories = async (): Promise<Category[]> => {
  return categoriesJson.categories;
};

export const VotesService = {
  getCategories
};

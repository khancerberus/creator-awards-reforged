import { api } from '@/lib/api';
import { Category } from '@/types/Votes';

const getCategories = async (): Promise<Category[]> => {
  const response = await api.get('/vote-system/nominations');
  const categories = response.data;

  return categories.map((category: Category) => ({
    ...category,
    votedNominations: []
  }));
};

const uploadVotes = async (categories: Category[]): Promise<string> => {
  const response = await api.post('/vote-system/vote', categories);
  return response.data;
};

export const VotesService = {
  getCategories,
  uploadVotes
};

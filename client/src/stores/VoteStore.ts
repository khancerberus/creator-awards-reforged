import { Category } from '@/types/Votes';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type VoteStoreState = {
  isVoting: boolean;
  currentIndex: number;
  categories: Category[];
};

type VoteStoreActions = {
  setIsVoting: (isVoting: boolean) => void;
  setCurrentIndex: (index: number) => void;
  decrementIndex: () => void;
  incrementIndex: () => void;
  setCategories: (categories: Category[]) => void;
  addToVotedNominations: (nominationId: number) => boolean;
  removeFromVotedNominations: (nominationId: number) => void;
  reset: () => void;
};

type VoteStore = VoteStoreState & VoteStoreActions;

const defaultStates: Pick<VoteStore, 'isVoting' | 'currentIndex' | 'categories'> = {
  isVoting: false,
  currentIndex: 0,
  categories: []
};

export const useVoteStore = create<VoteStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...defaultStates,
        setIsVoting: (isVoting: boolean) => {
          set({ isVoting });
        },
        setCurrentIndex: (currentIndex: number) => {
          set({ currentIndex });
        },
        decrementIndex: () =>
          set((state) => ({
            currentIndex:
              state.currentIndex === 0 ? state.categories.length - 1 : state.currentIndex - 1
          })),
        incrementIndex: () =>
          set((state) => ({
            currentIndex:
              state.currentIndex === state.categories.length - 1 ? 0 : state.currentIndex + 1
          })),
        setCategories: (categories: Category[]) => {
          set({ categories: categories, currentIndex: 0 });
        },
        addToVotedNominations: (nominationId: number) => {
          const currentIndex = get().currentIndex;
          const categories = get().categories;
          const currentCategory = categories[currentIndex];

          const votedNominations = currentCategory.votedNominations;
          if (votedNominations.length >= currentCategory.maxVotes) return false;

          set((state) => {
            const newCategories = state.categories.map((category) => {
              if (category.id === currentCategory?.id) {
                return {
                  ...category,
                  votedNominations: [...category.votedNominations, nominationId]
                };
              }
              return category;
            });
            return { categories: newCategories };
          });
          return true;
        },
        removeFromVotedNominations: (nominationId: number) =>
          set((state) => {
            const currentCategory = state.categories[state.currentIndex];
            const newCategories = state.categories.map((category) => {
              if (category.id === currentCategory?.id) {
                currentCategory.votedNominations = currentCategory?.votedNominations.filter(
                  (id) => id !== nominationId
                );
                return {
                  ...category,
                  votedNominations: category.votedNominations.filter((id) => id !== nominationId)
                };
              }
              return category;
            });
            return {
              categories: newCategories
            };
          }),
        reset: () => set(defaultStates)
      }),
      {
        name: 'vote-store'
      }
    )
  )
);

export interface Nomination {
  id: number;
  title: string;
  description: string;

  type: number;
  preview: string;
  src: string;
}

export interface Category {
  id: number;
  title: string;
  description: string;
  nominations: Nomination[];
  votedNominations: number[];
  maxVotes: number;
}

export interface TicketsType {
    id: number;
    imageUrl: string;
    isSub: boolean;
    isGift: boolean;
    tier: number;
}

export type CreateTicketsType = Omit<TicketsType, 'id'>;

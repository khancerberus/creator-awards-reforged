import { TicketType } from './Ticket';

export interface TwitchUserType {
  publicId: string;
  displayName: string;
  profileImageUrl: string;
  ticket?: TicketType;
}

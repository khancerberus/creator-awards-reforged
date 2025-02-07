import { api } from '@/lib/api';
import { TicketType } from '@/types/Ticket'

const generate = async (): Promise<TicketType> => {
  const response = await api.post('/tickets/generate');
  return response.data.ticket;
};

const saveImage = async ({ image }: { image: Blob }): Promise<string> => {
  const formData = new FormData();
  formData.append('image', image);

  const response = await api.post('/tickets/save-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.imageUrl;
};

export const TicketService = {
  generate,
  saveImage,
};

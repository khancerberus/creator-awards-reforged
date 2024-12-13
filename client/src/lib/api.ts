import axios from 'axios';
import { API_HOST } from '../config/system';

export const api = axios.create({
  baseURL: API_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
});

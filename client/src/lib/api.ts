import axios from 'axios';
import { config } from '../config/system';

export const api = axios.create({
  baseURL: config.apiHost,
  headers: {
    'Content-Type': 'application/json',
  },
});

import axios from 'axios';
import { BASE_URL } from '../configs/envs';

export const app = axios.create({
  baseURL: BASE_URL,
});

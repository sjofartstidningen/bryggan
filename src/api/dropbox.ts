import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.dropboxapi.com/2/',
});

export const content = axios.create({
  baseURL: 'https://content.dropboxapi.com/2/',
});

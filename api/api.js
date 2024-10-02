import axios from 'axios';
import { API_KEY, BASE_URL } from './apiConfig';

export const fetchMovies = async (type) => {
  const response = await axios.get(`${BASE_URL}/movie/${type}?api_key=${API_KEY}`);
  return response.data.results;
};

export const fetchTVShows = async (type) => {
  const response = await axios.get(`${BASE_URL}/tv/${type}?api_key=${API_KEY}`);
  return response.data.results;
};

export const searchMedia = async (query, type) => {
  const response = await axios.get(`${BASE_URL}/search/${type}?api_key=${API_KEY}&query=${query}`);
  return response.data.results;
};

export const fetchSingleMovie = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  return response.data;
};

export const fetchSingleTVShow = async (id) => {
  const response = await axios.get(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);
  return response.data;
};
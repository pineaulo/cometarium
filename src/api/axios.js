import axios from 'axios';
import config from '../config'

const api = axios.create({
  baseURL: 'https://api.nasa.gov/neo/rest/v1/',
  timeout: 20000,
  headers: {'Accept': 'application/json'},
  params: { api_key: config.api_key }
});

export default api;
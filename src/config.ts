import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from a .env file
dotenv.config({ path: path.resolve('.env') });

const API_KEY = process.env.API_KEY;
export const BASE_URL = 'http://api.openweathermap.org/geo/1.0/';
export const END_URL = `limit=1&appid=${API_KEY}`;

export const HELPABLE_STRINGS = ['help', '--help', '-h', '-H', 'HELP'];

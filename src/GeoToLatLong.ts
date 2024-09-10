#!/usr/bin/env node
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from a .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const API_KEY = process.env.API_KEY;
const BASE_URL = 'http://api.openweathermap.org/geo/1.0/';
const END_URL = `limit=1&appid=${API_KEY}`;

/**
 * Fetches latitude and longitude for a given ZIP code.
 *
 * @param zip - The ZIP code to fetch the latitude and longitude for. Can be a string or number.
 */
async function getLatLongByZip(zip: string | number) {
    try {
        const response = await fetch(`${BASE_URL}zip?zip=${zip},US&${END_URL}`);
        if (!response.ok) {
            throw new Error(`${response.status}\nError fetching Lat Long from ZIP Code:\t ${response.statusText}`);
        }
        const data = await response.json();
        logResults(zip, data.lat, data.lon);
    } catch (error) {
        console.error(error);
    }
}

/**
 * Fetches latitude and longitude for a given city name.
 *
 * @param city - The city name to fetch the latitude and longitude for.
 */
async function getLatLongByCity(city: string) {
    try {
        const response = await fetch(`${BASE_URL}direct?q=${city}&${END_URL}`);
        if (!response.ok) {
            throw new Error(`Error fetching City data: ${response.statusText}`);
        }
        let data = await response.json();
        data = data[0];
        logResults(city, data.lat, data.lon);
    } catch (error) {
        console.error(error);
    }
}

/**
 * Logs the latitude and longitude of a given location to the console.
 *
 * @param location - Location desired, this can be either a string (e.g., City, State) or a number (e.g., ZIP code).
 * @param lat - The latitude of the location, represented as a string.
 * @param lon - The longitude of the location, represented as a string.
 */
function logResults(location: string | number, lat: string, lon: string) {
    console.log(`${location}:\nLat:\t${lat},\nLong:\t${lon}\n`);
}

/**
 * Outputs help information for using the script.
 */
function helpOutput() {
    console.log(`Please retry with the following syntax:\n
    node /path/to/GeoToLatLong.js "ZIP_CODE" "CITY, STATE"
    `);
    console.log('NOTE: You can list multiple locations as long as they are separated by only a space, no commas');
    console.log('Please ensure your city names have more than two characters.');
    process.exit(1);
}

/**
 * Processes a list of location inputs, determining whether each is a ZIP code or a city name,
 * and fetches the latitude and longitude for each location.
 *
 * @param locations - An array of location strings. Each string can be a ZIP code or a city name.
 *
 * @throws Will call `helpOutput()` if a location string has fewer than 2 characters.
 */
async function processLocations(locations: string[]) {
    for (const location of locations) {
        if (location.length < 2) {
            helpOutput();
        } else if (/^\d+$/.test(location)) {
            // If the location is all digits, treat it as a ZIP code
            await getLatLongByZip(location);
        } else {
            // Otherwise, treat it as a city name
            await getLatLongByCity(location);
        }
    }
    process.exit(0);
}

/**
 * Immediately Invoked Function Expression (IIFE) to process input locations and run API calls.
 * Iterates through each location, determining whether it is a ZIP code or city name, and calls the respective API function.
 */
(function () {
    // Parse the input arguments and handle the help or invalid usage cases
    const args = process.argv;
    if (args.length === 2) {
        helpOutput();
    } else if (args.includes('help') || args.includes('--help') || args.includes('-h') || args.includes('-H')) {
        helpOutput();
    } else {
        const locations = args.slice(2);
        processLocations(locations);
    }
})();

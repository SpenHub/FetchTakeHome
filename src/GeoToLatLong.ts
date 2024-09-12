#!/usr/bin/env node

import { BASE_URL, END_URL } from './config';
import { bArrayNeedsToPrintHelpOutput, convertRegion } from './Utilities';

/**
 * Fetches latitude and longitude for a given ZIP code.
 * @param zip - The ZIP code to fetch the latitude and longitude for. Can be a string or number.
 * @returns string - Either a touple containing [lat, long], or an error msg.
 */
export async function getLatLongByZip(zip: string | number): Promise<string> {
    try {
        const response = await fetch(`${BASE_URL}zip?zip=${zip},US&${END_URL}`);
        const data = await response.json();
        if (!response.ok || data === undefined) {
            throw new Error(`${response.status}\nError fetching Lat Long from ZIP Code:\t ${response.statusText}`);
        }
        return `${data.lat}, ${data.lon}`;
        // logResults(zip, data.lat, data.lon);
    } catch (error) {
        return String(error);
    }
}

/**
 * Fetches latitude and longitude for a given city name.
 * @param city - The city name to fetch the latitude and longitude for.
 * @returns string - Either a touple containing [lat, long], or an error msg.
 */
export async function getLatLongByCity(city: string): Promise<string> {
    try {
        const response = await fetch(`${BASE_URL}direct?q=${city}&${END_URL}`);
        let data = await response.json();
        if (!response.ok || data === undefined) {
            throw new Error(`Error fetching City data: ${response.statusText}`);
        }
        data = data[0];
        return `${data.lat}, ${data.lon}`;
        // logResults(city, data.lat, data.lon);
    } catch (error) {
        return String(error);
    }
}

/**
 * Outputs help information for using the script.
 */
export function helpOutput() {
    console.log(`Please retry with the following syntax:\n
    node /path/to/GeoToLatLong.js "ZIP_CODE" "CITY, STATE"
    `);
    console.log('NOTE: You can list multiple locations as long as they are separated by only a space, no commas');
    console.log('Please ensure your city names have more than two characters.');
}

/**
 * Processes a list of location inputs, determining whether each is a ZIP code or a city name,
 * and fetches the latitude and longitude for each location.
 * @param locations - An array of location strings. Each string can be a ZIP code or a city name.
 * @throws Will call `helpOutput()` if a location string has fewer than 2 characters.
 */
export async function processLocations(locations: string[]) {
    let resultsArray: [string, string][] = [];
    for (let location of locations) {
        if (location.length < 2) {
            helpOutput();
        } else if (/^\d+$/.test(location)) {
            // If the location is all digits, treat it as a ZIP code
            resultsArray.push([location, await getLatLongByZip(location)]);
        } else {
            if (!location.includes(',')) {
                helpOutput();
            } else if (location.length === 2) {
                location = convertRegion(location);
            }
            // Otherwise, treat it as a city, state
            resultsArray.push([location, await getLatLongByCity(location)]);
        }
    }
    console.log(resultsArray);
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
    } else if (bArrayNeedsToPrintHelpOutput(args)) {
        helpOutput();
    } else {
        const locations = args.slice(2);
        processLocations(locations);
    }
})();

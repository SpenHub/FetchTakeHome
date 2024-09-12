import { HELPABLE_STRINGS } from './config';

/**
 * Quick utility to see if the array of parameters include any help
 * strings that should return the helpOutput() function.
 * @param Array The list of parameters sent from the user
 * @returns boolean if list has help strings and needs to call helpOutput()
 * @example
 * // returns true
 * const exampleArray = ["Boulder, CO", "--help"]
 * bArrayNeedsToPrintHelpOutput(exampleArray);
 */
export function bArrayNeedsToPrintHelpOutput(array: any[]) {
    // Also return true to trigger help if empty
    if (array.length === 0) {
        return true;
    }

    // Check if the array contains any of the help strings
    return HELPABLE_STRINGS.some(helpString => array.includes(helpString));
}

/**
 * Converts a region input from a two-letter state or province code into the full state or province name.
 * The input format should be in the form of "City, State/Province Code", e.g., "Denver, CO".
 * The function sanitizes the input by removing any spaces and returns the city and the full name
 * of the state or province, e.g., "Denver, Colorado".
 * @param string A string containing a city and a two-letter state or province code separated by a comma.
 * @returns string A string in the format "City, Full State/Province Name".
 * @example
 * // returns "Denver,Colorado"
 * convertRegion("Denver, CO");
 */
export function convertRegion(input: string) {
    // sanitizing input before we convert country code
    input = input.replace(/\s+/g, '');
    const city = input.split(',')[0];
    let state = input.split(',')[1];

    var states = [
        ['Alabama', 'AL'],
        ['Alaska', 'AK'],
        ['American Samoa', 'AS'],
        ['Arizona', 'AZ'],
        ['Arkansas', 'AR'],
        ['Armed Forces Americas', 'AA'],
        ['Armed Forces Europe', 'AE'],
        ['Armed Forces Pacific', 'AP'],
        ['California', 'CA'],
        ['Colorado', 'CO'],
        ['Connecticut', 'CT'],
        ['Delaware', 'DE'],
        ['District Of Columbia', 'DC'],
        ['Florida', 'FL'],
        ['Georgia', 'GA'],
        ['Guam', 'GU'],
        ['Hawaii', 'HI'],
        ['Idaho', 'ID'],
        ['Illinois', 'IL'],
        ['Indiana', 'IN'],
        ['Iowa', 'IA'],
        ['Kansas', 'KS'],
        ['Kentucky', 'KY'],
        ['Louisiana', 'LA'],
        ['Maine', 'ME'],
        ['Marshall Islands', 'MH'],
        ['Maryland', 'MD'],
        ['Massachusetts', 'MA'],
        ['Michigan', 'MI'],
        ['Minnesota', 'MN'],
        ['Mississippi', 'MS'],
        ['Missouri', 'MO'],
        ['Montana', 'MT'],
        ['Nebraska', 'NE'],
        ['Nevada', 'NV'],
        ['New Hampshire', 'NH'],
        ['New Jersey', 'NJ'],
        ['New Mexico', 'NM'],
        ['New York', 'NY'],
        ['North Carolina', 'NC'],
        ['North Dakota', 'ND'],
        ['Northern Mariana Islands', 'NP'],
        ['Ohio', 'OH'],
        ['Oklahoma', 'OK'],
        ['Oregon', 'OR'],
        ['Pennsylvania', 'PA'],
        ['Puerto Rico', 'PR'],
        ['Rhode Island', 'RI'],
        ['South Carolina', 'SC'],
        ['South Dakota', 'SD'],
        ['Tennessee', 'TN'],
        ['Texas', 'TX'],
        ['US Virgin Islands', 'VI'],
        ['Utah', 'UT'],
        ['Vermont', 'VT'],
        ['Virginia', 'VA'],
        ['Washington', 'WA'],
        ['West Virginia', 'WV'],
        ['Wisconsin', 'WI'],
        ['Wyoming', 'WY'],
    ];

    // So happy that Canada and the US have distinct abbreviations
    var provinces = [
        ['Alberta', 'AB'],
        ['British Columbia', 'BC'],
        ['Manitoba', 'MB'],
        ['New Brunswick', 'NB'],
        ['Newfoundland', 'NF'],
        ['Northwest Territory', 'NT'],
        ['Nova Scotia', 'NS'],
        ['Nunavut', 'NU'],
        ['Ontario', 'ON'],
        ['Prince Edward Island', 'PE'],
        ['Quebec', 'QC'],
        ['Saskatchewan', 'SK'],
        ['Yukon', 'YT'],
    ];

    var regions = states.concat(provinces);

    var i; // Reusable loop variable
    state = state.toUpperCase();
    for (i = 0; i < regions.length; i++) {
        if (regions[i][1] == state) {
            state = regions[i][0];
        }
    }
    return `${city},${state}`;
}

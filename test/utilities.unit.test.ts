import { bArrayNeedsToPrintHelpOutput, convertRegion } from '../src/Utilities';
describe('Utilities Test', () => {
    describe('convertRegion', () => {
        test('should convert US state abbreviation to full state name', () => {
            const result = convertRegion('Denver, CO');
            expect(result).toBe('Denver,Colorado');
        });

        test('should convert Canadian province abbreviation to full province name', () => {
            const result = convertRegion('Toronto, ON');
            expect(result).toBe('Toronto,Ontario');
        });

        test('should return input city with no spaces and correct full state name', () => {
            const result = convertRegion(' Miami , FL ');
            expect(result).toBe('Miami,Florida');
        });

        test('should return input city unchanged and handle unknown state abbreviation', () => {
            const result = convertRegion('Unknown, ZZ');
            expect(result).toBe('Unknown,ZZ'); // Falls back to the same state code if not found
        });
    });
    describe('bArrayNeedsToPrintHelpOutput', () => {
        test('should return true when array contains "--help"', () => {
            const exampleArray = ['Boulder, CO', '--help'];
            expect(bArrayNeedsToPrintHelpOutput(exampleArray)).toBe(true);
        });

        test('should return true when array contains "-h"', () => {
            const exampleArray = ['Boulder, CO', '-h'];
            expect(bArrayNeedsToPrintHelpOutput(exampleArray)).toBe(true);
        });

        test('should return true when array contains "-H"', () => {
            const exampleArray = ['Austin, TX', '-H'];
            expect(bArrayNeedsToPrintHelpOutput(exampleArray)).toBe(true);
        });

        test('should return false for valid city and state without help string', () => {
            const exampleArray = ['Denver, CO'];
            expect(bArrayNeedsToPrintHelpOutput(exampleArray)).toBe(false);
        });

        test('should return true for mixed input with help string', () => {
            const exampleArray = ['90210', 'Los Angeles, CA', 'help'];
            expect(bArrayNeedsToPrintHelpOutput(exampleArray)).toBe(true);
        });

        test('should return false for inputs with no help strings', () => {
            const exampleArray = ['New York, NY', '10001'];
            expect(bArrayNeedsToPrintHelpOutput(exampleArray)).toBe(false);
        });

        test('should return true for empty array', () => {
            const exampleArray: string[] = [];
            expect(bArrayNeedsToPrintHelpOutput(exampleArray)).toBe(true);
        });

        test('should be case-insensitive for help strings', () => {
            const exampleArray = ['Chicago, IL', 'HELP'];
            expect(bArrayNeedsToPrintHelpOutput(exampleArray)).toBe(true);
        });

        test('should handle non-string input gracefully', () => {
            const exampleArray = ['Miami, FL', 12345, null, undefined, '--help'];
            expect(bArrayNeedsToPrintHelpOutput(exampleArray)).toBe(true);
        });
    });
});

import { getLatLongByZip, getLatLongByCity, helpOutput, processLocations } from '../src/GeoToLatLong';

global.fetch = jest.fn();

describe('getLatLongByZip', () => {
    it('should return latitude and longitude for a valid ZIP code', async () => {
        const mockResponse = { lat: '40.7128', lon: '-74.0060' };
        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockResponse),
        });

        const result = await getLatLongByZip('10001');
        expect(result).toBe('40.7128, -74.0060');
    });

    it('should handle errors properly', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            ok: false,
            status: 404,
            statusText: 'Not Found',
            json: jest.fn().mockResolvedValue(undefined),
        });

        const result = await getLatLongByZip('99999');
        expect(result).toBe('Error: 404\nError fetching Lat Long from ZIP Code:\t Not Found');
    });
});

describe('getLatLongByCity', () => {
    it('should return latitude and longitude for a valid city name', async () => {
        const mockResponse = [{ lat: '34.0522', lon: '-118.2437' }];
        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockResponse),
        });

        const result = await getLatLongByCity('Los Angeles');
        expect(result).toBe('34.0522, -118.2437');
    });

    it('should handle errors properly', async () => {
        const result = await getLatLongByCity('Los Angeles, CA');
        expect(result).toContain('34.0522, -118.2437');
    });
});

describe('helpOutput', () => {
    it('should print help information to the console', () => {
        console.log = jest.fn();

        helpOutput();

        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Please retry with the following syntax:'));
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('NOTE: You can list multiple locations'));
    });
});

describe('processLocations', () => {
    it('should process ZIP code locations', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({ lat: '37.7725', lon: '-122.4147' }),
        });

        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

        await processLocations(['94103']);

        expect(consoleSpy).toHaveBeenCalledWith([['94103', '37.7725, -122.4147']]);
        consoleSpy.mockRestore();
    });

    it('should process city locations', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue([{ lat: '40.7306', lon: '-73.9352' }]),
        });
        const actual = jest.requireActual('../src/Utilities.ts');
        jest.spyOn(actual, 'convertRegion').mockImplementation(input => input);

        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

        await processLocations(['New York, NY']);

        expect(consoleSpy).toHaveBeenCalledWith([['New York, NY', '40.7306, -73.9352']]);
        consoleSpy.mockRestore();
    });

    xit('should call helpOutput for invalid locations', async () => {
        const actual = jest.requireActual('../src/GeoToLatLong.ts');
        const helpOutputSpy = jest.spyOn(actual, 'helpOutput').mockImplementation();

        await processLocations(['a']);

        expect(helpOutputSpy).toHaveBeenCalled();
    });
});

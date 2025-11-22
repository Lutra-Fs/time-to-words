const { convertTimeToWords } = require('./index');

describe('Time to Words Converter (lean set)', () => {
  describe('Happy path', () => {
    it('handles midnight and midday', () => {
      expect(convertTimeToWords('0:00')).toBe('midnight');
      expect(convertTimeToWords('12:00')).toBe('midday');
    });

    it('speaks on-the-hour time', () => {
      expect(convertTimeToWords('5:00')).toBe('five o\'clock');
    });

    it('speaks past/half/to patterns', () => {
      expect(convertTimeToWords('8:30')).toBe('half past eight');
      expect(convertTimeToWords('2:45')).toBe('quarter to three');
    });

    it('normalizes 24-hour input', () => {
      expect(convertTimeToWords('14:15')).toBe('quarter past two');
      expect(convertTimeToWords('23:59')).toBe('one to twelve');
      expect(convertTimeToWords('0:05')).toBe('five past twelve');
    });

    it('trims surrounding whitespace', () => {
      expect(convertTimeToWords(' 8:05 ')).toBe('five past eight');
    });
  });

  describe('Validation', () => {
    it('rejects non-string input', () => {
      expect(() => convertTimeToWords(123)).toThrow('Time must be a string');
    });

    it('rejects malformed time', () => {
      expect(() => convertTimeToWords('8:3')).toThrow('Invalid time format');
      expect(() => convertTimeToWords('')).toThrow('Invalid time format');
    });

    it('rejects out-of-range values', () => {
      expect(() => convertTimeToWords('24:00')).toThrow('Hours must be 0-23');
      expect(() => convertTimeToWords('8:60')).toThrow('Minutes must be 0-59');
    });
  });
});

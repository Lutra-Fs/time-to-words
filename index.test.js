const  { convertTimeToWords } = require('./index');

describe('Time to words', () => {
  it('Handles midnight', () => {
    const timeInWords = convertTimeToWords('0:00');
    expect(timeInWords).toBe('midnight');
  });

  it('Handles 30 - 8:30', () => {
    const timeInWords = convertTimeToWords('8:30');
    expect(timeInWords).toBe('half past eight');
  });

  it('Handles times after 30 mins - 2:45', () => {
    const timeInWords = convertTimeToWords('2:45');
    expect(timeInWords).toBe('quarter to three');
  });

  it('3:13', () => {
    const timeInWords = convertTimeToWords('3:13');
    expect(timeInWords).toBe('thirteen past three');
  });
  it('o\'clock', () => {
    const timeInWords = convertTimeToWords('5:00');
    expect(timeInWords).toBe('five o\'clock');
  });
  it('6:37', () => {
    const timeInWords = convertTimeToWords('6:37');
    expect(timeInWords).toBe('twenty three to seven');
  });
});

const basicNumbers = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  10: 'ten',
  11: 'eleven',
  12: 'twelve',
  13: 'thirteen',
  14: 'fourteen',
  15: 'quarter',
  16: 'sixteen',
  17: 'seventeen',
  18: 'eighteen',
  19: 'nineteen',
  20: 'twenty',
  30: 'half',
};

function convertNumtoStr(num) {
  // Handle 0-30 (same as before)
  if (num === 0) return 'zero';
  if (num <= 20 || num === 30) {
    return basicNumbers[num];
  }

  // Handle 21-29
  if (num < 30) {
    return `twenty ${convertNumtoStr(num - 20)}`;
  }

  // Handle numbers outside expected range
  // (although from convertTimeToWords we can guarntee the input range)
  return num.toString();
}

/**
 * Converts time string to spoken English words
 * Supports both 12-hour and 24-hour formats
 * @param {string} time - Time in "H:MM" or "HH:MM" format (24-hour 0-23)
 * @returns {string} Time in words (e.g., "half past eight", "quarter to three")
 * @throws {Error} If input format is invalid
 *
 * @example
 * convertTimeToWords('8:30') // returns 'half past eight'
 * convertTimeToWords('14:15') // returns 'quarter past two'
 * convertTimeToWords('0:00') // returns 'midnight'
 */
function convertTimeToWords(time) {
  // Input validation - professional error handling
  if (typeof time !== 'string') {
    throw new Error('Time must be a string');
  }

  const normalized = time.trim();
  const timeRegex = /^([0-9]{1,2}):([0-9]{2})$/;
  const match = timeRegex.exec(normalized);
  if (!match) {
    throw new Error('Invalid time format. Expected "H:MM" or "HH:MM"');
  }

  const [, hoursStr, minutesStr] = match;
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  // Range validation for 24-hour format
  if (hours > 23) {
    throw new Error('Hours must be 0-23 in 24-hour format');
  }
  if (minutes > 59) {
    throw new Error('Minutes must be 0-59');
  }

  if (hours === 0 && minutes === 0) {
    return 'midnight';
  }
  if (hours === 12 && minutes === 0) {
    return 'midday';
  }

  // Convert 24-hour to 12-hour for display
  let displayHour = hours;
  if (hours > 12) {
    displayHour = hours - 12; // 13 -> 1, 14 -> 2, etc.
  } else if (hours === 0) {
    displayHour = 12; // 0:00 is handled as midnight, other 0:XX should be 12 AM
  }

  const hourStr = convertNumtoStr(displayHour);

  if (minutes === 0) {
    return `${hourStr} o'clock`;
  } if (minutes < 30) {
    const minuteStr = convertNumtoStr(minutes);
    return `${minuteStr} past ${hourStr}`;
  } if (minutes === 30) {
    return `half past ${hourStr}`;
  }

  // For minutes > 30, calculate "to" next hour
  const minuteStr = convertNumtoStr(60 - minutes);
  let nextHour = displayHour + 1;
  if (nextHour > 12) nextHour = 1; // Handle 12 -> 1 wraparound
  const nextHourStr = convertNumtoStr(nextHour);
  return `${minuteStr} to ${nextHourStr}`;
}

module.exports = { convertTimeToWords };

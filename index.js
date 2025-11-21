// expecting time to be a string in the format like '8:15' or '12:30'
function convertTimeToWords(time) {
  // TODO: real code goes here!
  if (time === '0:00') {
    return 'midnight';
  } else if (time === '12:00') {
    return 'midday';
  }
  const minutes = parseInt(time.slice(time.length - 2, time.length));
  const hours = parseInt(time.slice(0, time.length - 3));
  let hourStr = convertNumtoStr(hours);

  if (minutes === 0) {
    return `${hourStr} o'clock`;
  } else if (minutes < 30) {
    let minuteStr = convertNumtoStr(minutes);
    return `${minuteStr} past ${hourStr}`;
  } else if (minutes === 30) {
    return `half past ${hourStr}`
  } else {
    const minuteStr = convertNumtoStr(60 - minutes);
    hourStr = convertNumtoStr((hours + 1)%12===0?12:(hours + 1)%12);
    return `${minuteStr} to ${hourStr}`;
  }
  // return 'half past eight';
}

function convertNumtoStr(num) {
  switch (num) {
    case 1:
      return "one";
    case 2:
      return "two";
    case 3:
      return "three";
    case 4:
      return "four";
    case 5:
      return "five";
    case 6:
      return "six";
    case 7:
      return "seven";
    case 8:
      return "eight";
    case 9:
      return "nine";
    case 10:
      return "ten";
    case 11:
      return "eleven";
    case 12:
      return "twelve";
    case 13:
      return "thirteen";
    case 14:
      return "fourteen";
    case 15:
      return "quarter";
    case 16:
      return "sixteen";
    case 17:
      return "seventeen";
    case 18:
      return "eighteen";
    case 19:
      return "nineteen";
    case 20:
      return "twenty";
    case 21:
      return "twenty one";
    case 22:
      return "twenty two";
    case 23:
      return "twenty three";
    case 24:
      return "twenty four";
    case 25:
      return "twenty five";
    case 26:
      return "twenty six";
    case 27:
      return "twenty seven";
    case 28:
      return "twenty eight";
    case 29:
      return "twenty nine";
    case 30:
      return "half";
    default:
      return undefined;
  }
}

module.exports = { convertTimeToWords };
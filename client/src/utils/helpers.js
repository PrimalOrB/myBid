export function paddedNumber ( number ) {
    var s = String( number );
    while (s.length < 2 ) {s = "0" + s;}
    return s;
}

export function calculateTimeLeft( endDate) {
    let difference = +new Date( Number( endDate ) ) - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
    };
  }
  return timeLeft;
}

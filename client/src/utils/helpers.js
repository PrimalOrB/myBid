export function paddedNumber ( number ) {
    var s = String( number );
    while (s.length < 2 ) {s = "0" + s;}
    return s;
}
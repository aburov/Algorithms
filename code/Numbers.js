/*
 * ========================= GCD =========================
 */
function gcd(a, b) {
        while(b != 0) {
                r = a % b;
                a = b;
                b = r;
        }
        return a;
}
(function() {
	console.log("GCD: " + gcd(9, 33));
})();



/*
 * ========================= SQRT =========================
 */
function sqrt(n) {
  /*We are using n itself as initial approximation
   This can definitely be improved */
  var x = n;
  var y = 1;
  var e = 0.000001; /* e decides the accuracy level*/
  while(x - y > e) {
    x = (x + y)/2;
    y = n/x;
  }
  return x;
}
(function() {
	console.log("SQRT: " + sqrt(256));
})();




/*
 * ========================= FIB =========================
 */
function fib(n) {
		if (n==0 || n==1)
			return 1;
    return fib(n-2) + fib(n-1);
}
function fibI(n) {
		var n2 = 0,
			n1 = 1;
        while (n>0) {
        	n--;
        	var tmp = n1;
        	n1 = n2 + n1;
        	n2 = tmp;
        }
        return n1;
}
(function() {
	console.log("FIB: " + fib(6));
	console.log("FIB I: " + fibI(6));
})();



/*
 * ========================= FACTORIAL =========================
 */
function factorial(n) {
    if (n==0)
      return 1;
    return n * factorial(n-1);
}
(function() {
  console.log("FACTORIAL: " + factorial(6));
})();



/*
 * ========================= REVERSE DIGITS =========================
 */
function reverse(num) {
    var newNum = 0;
    var remainder;
    while (num > 0) {      
      remainder = num%10;
      newNum = newNum*10 + remainder;
      num = parseInt(num/10);
    }
    return newNum;
}
(function() {
  console.log("REVERSE DIGITS: " + reverse(123456));
})();
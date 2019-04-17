function gcd (a, b) {
  let res = 0
  for (let i = 1;  i <= a; i++) {
    if ((a % i == 0) && (b % i == 0)) {
      res = i
    }
  }

  return res
}

console.log('Maximo comun divisor:', gcd(54, 38))
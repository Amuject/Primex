import fs from 'fs';

const primes = [];
function getPrimes(min, max) {
  const a = [];
  f: for (let i = min; i <= max; i++) {
    for (let p of primes) if (i % p == 0) continue f;
    primes.push(i);
    a.push(i);
  }
  return a;
}
for (let i = 0; i < 100; i++) {
  const t = new Date().getTime();
  const a = getPrimes(Math.max(2, i * 100000 + 1), (i + 1) * 100000 + 1);
  console.log(i, a.length, primes.length, new Date().getTime() - t + 'ms');
}

fs.writeFileSync('primesa.json', JSON.stringify(primes));

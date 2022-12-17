import fs from 'fs';

const primes = [];

function isPrime(n, k) {
  n = BigInt(n);
  if (n <= 1n) {
    return false;
  }
  for (const p of [2n, 3n, 5n, 7n]) {
    if (p == n) {
      return true;
    } else if (n % p == 0n) {
      return false;
    }
    if (p > n) {
      break;
    }
  }

  let d = n - 1n;
  while (d % 2n == 0n) {
    d /= 2n;
  }
  for (let i = 0; i < k; i++) {
    if (!miller(d, n)) {
      return false;
    }
  }
  return true;

  function miller(d, n) {
    let a = 2n + (randin(0n, n - 2n) % (n - 4n));
    let x = pow(a, d, n);
    if (x == 1n || x == n - 1n) {
      return true;
    }
    while (d != n - 1n) {
      x = (x * x) % n;
      d *= 2n;
      if (x == 1n) {
        return false;
      }
      if (x == n - 1n) {
        return true;
      }
    }
    return false;

    function pow(x, y, p) {
      let r = 1n;
      x = x % p;
      while (y > 0n) {
        if (y & 1n) {
          r = (r * x) % p;
        }
        y = y >> 1n;
        x = (x * x) % p;
      }
      return r;
    }

    function randin(l, h) {
      const d = h - l;
      const dl = d.toString().length;
      let m = '';
      while (m.length < dl) {
        m += Math.random().toString().split('.')[1];
      }
      m = m.slice(0, dl);
      const rd = (d * BigInt(m)) / BigInt('1' + '0'.repeat(dl));
      return l + rd;
    }
  }
}

function getPrimes(min, max) {
  const a = [];
  f: for (let i = min; i <= max; i++) {
    if (!isPrime(i, (i + '').length)) continue f;
    primes.push(i);
    a.push(i);
  }
  return a;
}
for (let i = 0; i < 100; i++) {
  const t = new Date().getTime();
  const a = getPrimes(Math.max(2, i * 100000), (i + 1) * 100000);
  console.log(i, a.length, primes.length, new Date().getTime() - t + 'ms');
}

fs.writeFileSync('primesb.json', JSON.stringify(primes));

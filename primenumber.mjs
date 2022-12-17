import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const primes = [];
for (const p of JSON.parse(fs.readFileSync(path.resolve(__dirname, './prime-numbers.json')))) primes.push(BigInt(p));

function isPrime(n, k = 100) {
  n = BigInt(n);
  if (n <= 1n) {
    return false;
  }
  for (const p of primes) {
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

function prevPrime(n, k) {
  n = BigInt(n);

  if (n <= 2n) {
    return null;
  }
  if (n == 3n) {
    return 2n;
  }

  n--;
  if (n % 2n == 0) {
    n--;
  }

  while (!isPrime(n, k)) {
    n -= 2n;
  }

  return n;
}

function nextPrime(n, k) {
  n = BigInt(n);

  if (n < 2n) {
    return 2n;
  }

  n++;
  if (n % 2n == 0) {
    n++;
  }

  while (!isPrime(n, k)) {
    n += 2n;
  }

  return n;
}

function randomPrime(l, k) {
  return nextPrime(randl(l));

  function randl(l) {
    let n = '';
    n += Math.max(1, Math.floor(Math.random() * 10));
    for (let i = 1; i < l; i++) {
      n += Math.floor(Math.random() * 10);
    }
    return BigInt(n);
  }
}

export default {
  is: isPrime,
  isPrime: isPrime,
  prev: prevPrime,
  next: nextPrime,
  rand: randomPrime,
  random: randomPrime,
};

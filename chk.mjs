import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const primesa = [];
for (const p of JSON.parse(fs.readFileSync(path.resolve(__dirname, './primesa.json')))) primesa.push(BigInt(p));
const primesb = [];
for (const p of JSON.parse(fs.readFileSync(path.resolve(__dirname, './primesb.json')))) primesb.push(BigInt(p));

console.log(primesa.length, primesb.length);

var off = 0;
for (var i = 0; i < primesb.length; i++) {
  var a = primesa[i];
  var b = primesb[i + off];
  if (a != b) {
    console.log(a, b);
    off++;
  }
}

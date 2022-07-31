import fs from "fs";
import {Transform} from 'stream'

const encryptingTransformer = createEncryptingTransformer();
const outputFile = fs.createWriteStream("./text.txt");

process.stdin
    .pipe(encryptingTransformer)
    .pipe(outputFile);

function createEncryptingTransformer() {
    return new Transform({
        transform(chunk, encoding, callback) {
            const encryptedString = textCipher(chunk.toString());
            callback(null, encryptedString);
        }
    });

    function textCipher(text) {
        return text
            .trim()
            .toUpperCase()
            .split("")
            .map(c => charToEncodedNumber(c))
            .join(" ")
            .trim() + '\n';
    }

    function charToEncodedNumber(c) {
        return c === ' ' ? ' ' : c.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
    }
}

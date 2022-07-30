import fs from "fs";

function textWriter() {
    const line = process.argv[2]||'';
   /* const writeStream = fs.createWriteStream("./text.txt");
    writeStream.write(textCipher(line))*/
    fs.appendFile("./text.txt", textCipher(line)+'\n', (err) => {
        if (err) throw err;
        console.log('line was cipher and saved to file');
    } )
}

function textCipher(text) {

    text = text
        .replaceAll(/[,.]+/g, '')
        .toUpperCase();
    const result = text
        .split("")
        .map((_, i) => text.charCodeAt(i) - 64 === -32 ? " " : text.charCodeAt(i) - 64)
    return result.join(" ").trim()
}
textWriter();
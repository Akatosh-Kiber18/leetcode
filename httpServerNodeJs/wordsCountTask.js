export function countWords(text) {
    let wordCounts = new Map();
    text
        .replaceAll(/  +/g, ' ')
        .replaceAll(',', '')
        .replaceAll('.', '')
        .toLowerCase()
        .split(' ')
        .forEach(w => wordCounts.set(w, (wordCounts.get(w) || 0) + 1))
    let maxCount = 0;
    let word = "";
    let couOfUniqueWords = wordCounts.size;

    wordCounts.forEach((cou, wrd) => {
        if (maxCount < cou) {
            maxCount = cou;
            word = wrd;
        }
    })

    return {CountOfUniqueWords: couOfUniqueWords, MostOftenWord: word, wordCounts: Object.fromEntries(wordCounts)};
}

console.log(countWords("some text to loooc asdasd sdsdsdsd fffff ggggg"));
let text = "asdasdsda asdasdsda asdasdsda asdasdsda adsasd34, dasdadsf |aadsdassd"
function countWords(text) {
    let map = new Map();
    text
        /*.replaceAll(/[^a-zA-Z0-9]+/g, ' ')
        .replaceAll(' ', '')
        .toLowerCase()*/
        .split(' ')
        .forEach(w => map.set(w, (map.get(w)||0) + 1))
    console.log(map);
}
countWords(text)



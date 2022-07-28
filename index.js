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

/*
let myReverse = function (matrix) {
    for (let i = 0; i < matrix.length; i++) {
        let t = matrix[i];
        matrix[i] = matrix[matrix.length -1 - i];
        matrix[matrix.length - 1 -i] = t
    }
}
export let rotate = function(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = i; j < matrix.length; j++) {
            let t = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = t;
        }
        //matrix[i].reverse();
        myReverse(matrix[i])
    }
    return matrix;
};
console.log(rotate([[1,2],[3,4]]));
[
[[0,0],[0,1],[0,2]],
[[1,0],[1,1],[1,2]],
[[2,0],[2,1],[2,2]]
]
[
[[2,0],[1,0],[0,0]],
[[0,1],[1,1],[2,1]],
[[2,2],[1,2],[0,2]]
]
*/

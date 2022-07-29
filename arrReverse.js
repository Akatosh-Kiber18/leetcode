/*let myReverse = function (matrix) {
    for (let i = 0; i < matrix.length; i++) {
        let t = matrix[i];
        matrix[i] = matrix[matrix.length -1 - i];
        matrix[matrix.length - 1 -i] = t
    }
}*/
export let rotate = function(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = i; j < matrix.length; j++) {
            let t = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = t;
        }
        matrix[i].reverse();
        //myReverse(matrix[i])
    }
    return matrix;
};
console.log(rotate([[1,2],[3,4]]));

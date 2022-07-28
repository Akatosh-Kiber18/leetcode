/*
let calculateVariantsIn2D = (n,m) => {
    let field = new Array(n).fill(0).map(() => new Array(m).fill(1));

    for (let i = 1; i < field.length; i++) {
        for (let j = 1; j < field[i].length; j++) {
               field[i][j] = field[i-1][j] + field[i][j-1];
        }
    }

    console.log(field[n-1][m-1]);
}
calculateVariantsIn2D(4,4)*/
function calculatePi (n) {
    let hits = 0;
    for (let i = 0; i < n; i++) {
        const x = Math.random() * 2 - 1;
        const y = Math.random() * 2 - 1;
        const d = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
        if (d<1) {
            hits++;
        }
    }
    return (hits / n) * 4;
}

console.log(calculatePi(1000000000));
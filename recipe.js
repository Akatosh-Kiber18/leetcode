const products = [
    {
        name: "laptop",
        price: 600,
        category: "computers"
    },
    {
        name: "dumbbell",
        price: 120,
        category: "sport inventory",
    },
    {
        name: "bicycle",
        price: 350,
        category: "sport inventory",
    },
    {
        name: "fitness boll",
        price: 250,
        category: "sport inventory",
    },
    {
        name: "smartphone",
        price: 400,
        category: "phones"
    },
]

let categories = new Map();
products.map(p => p.category).forEach(c => categories.set(c,[]));
products.forEach(p => categories.get(p.category).push(p));

const sortedCatNames = Array.from(categories.keys()).sort();

let res = '';

sortedCatNames.forEach(c => {
    res += c + " total: ";
    res += categories.get(c).reduce((a,p) => a+p.price, 0) + "\n";
    categories.get(c)
        .sort((a,b)=>a.name.localeCompare(b.name))
        .forEach(p => res += `\t${p.name} ${p.price}\n`);
})
res += "\nTotal price: " + products.reduce((t, p) => t + p.price, 0);

console.log(res);
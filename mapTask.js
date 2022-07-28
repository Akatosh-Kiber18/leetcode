const testData = [
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

let checkOut = (list) => {
    let map = sortByCategory(list);
    let res = '';
    let totalPrice = 0;
    map.forEach((c, cCat) => {
        res += cCat + " [total category price: "
        res += c.reduce((a, p) => a + p.price, 0) + "] \n";
        c.sort((a, b) => a.name.localeCompare(b.name))
            .forEach(p => res += `\t${p.name} ${p.price}\n`);
        totalPrice += c.reduce((t, p) => t + p.price, 0)
    })
    return res +"\nTotal price: "+totalPrice;
}


let sortByCategory = (list) => {
    let map = new Map();
    list.forEach(e => {
        if (!map.has(e.category)) {
            map.set(e.category, [{name: e.name, price: e.price}])
        } else {
            map.set(e.category, map.get(e.category).concat({name: e.name, price: e.price}))
        }
    })
    return map;
}
console.log(sortByCategory(testData))
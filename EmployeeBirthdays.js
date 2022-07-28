const birthdays = [
    {
        name: 'ALex Pilipenko',
        bDate: '07-02-1999'
    },
    {
        name: 'Petro Ostapenko',
        bDate: '08-12-1989'
    },
    {
        name: 'Dima Ostapenko',
        bDate: '08-14-1992'
    },
    {
        name: 'Ivan Matushenko',
        bDate: '10-05-2001'
    },
    {
        name: 'Taras Nacukevich',
        bDate: '11-21-1996'
    },
    {
        name: 'Denis Zarevich',
        bDate: '11-22-1986'
    },
]

let employeeBirthdays = (listOfBirthdays) => {
    let date = new Date();
    let map = new Map();
    let res = '';
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    listOfBirthdays.forEach(n => {
        let bDate = new Date(n.bDate)
        if (!map.has(monthNames[bDate.getMonth()])) {
            map.set(monthNames[bDate.getMonth()], [n]);
        } else {
            map.set(monthNames[bDate.getMonth()], map.get(monthNames[bDate.getMonth()]).concat(n))
        }
    })
    map.forEach((d, m) => {
        if (monthNames.indexOf(m) - date.getMonth() === 0 || monthNames.indexOf(m) - date.getMonth() === 1) {
            d.forEach(b => {
                let bDate = new Date(b.bDate);
                if (!res.includes(monthNames[bDate.getMonth()])){
                    res += `${monthNames[bDate.getMonth()]} ${date.getFullYear()}\n`;
                }
                res += `(${bDate.getDate()}) - ${b.name} (${date.getFullYear() - bDate.getFullYear() + 1}) years!\n`;
            })
        }
    })
    return res
}
console.log(employeeBirthdays(birthdays));

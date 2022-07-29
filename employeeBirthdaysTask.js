import fs from "fs";
import path from "path";

let empPath = process.argv[2];
let horizon = process.argv[3] || 0;

fs.readFile(empPath, {encoding: 'utf8'}, (err, data) => {

    if (err) {
        console.error(err);
        return;
    }
    let employees = data.split('\n')
        .filter(Boolean)
        .map(line => line.split(','))
        .map(([name, birthday]) => ({name, birthday}))

    employeeBirthdaysTask(employees, horizon);
});

function employeeBirthdaysTask(listOfBirthdays, horizon) {
    let date = new Date();
    let map = new Map();
    let res = '';
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    monthNames.forEach(mName => map.set(mName, []));
    listOfBirthdays.forEach(n => {
        let bDate = new Date(n.birthday)
        let month = monthNames[bDate.getMonth()];
        map.get(month).push(n);
    })
    monthNames
        .filter((m, i) => {
            let relativeMonthNumber = i - date.getMonth();
            return relativeMonthNumber >= 0 && relativeMonthNumber <= horizon;
        })
        .forEach((m) => {
            res += `${m} ${date.getFullYear()}\n`;
            map.get(m).forEach(employee => {
                const bDate = employee.birthday.split("-")
                res += `(${bDate[2]}) - ${employee.name} (${date.getFullYear() - bDate[0] + 1} years!)\n`
            })
            if (map.get(m).length === 0) {
                res += 'no employees birthdays in this month =('
            }
        });
    console.log(res)
}

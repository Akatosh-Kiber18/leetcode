import fs from "fs";

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const empPath = process.argv[2];
const horizon = process.argv[3] || 0;

readTextFile(empPath, csvContent => {
    const employees = parseEmployeeFromCsv(csvContent);
    const monthEmployees = groupEmployeeByBirthdayMonth(employees);
    const schedule = formatEmployeeBirthdaySchedule(monthEmployees);
    console.log(schedule);
});

function groupEmployeeByBirthdayMonth(employees) {
    let monthEmployees = new Map();

    monthNames.forEach(mName => monthEmployees.set(mName, []));
    employees.forEach(e => {
        let bDate = new Date(e.birthday)
        let month = monthNames[bDate.getMonth()];
        monthEmployees.get(month).push(e);
    });

    return monthEmployees;
}

function parseEmployeeFromCsv(data) {
    return data.split('\n')
        .filter(Boolean)
        .map(line => line.split(','))
        .map(([name, birthday]) => ({name, birthday}));
}

function formatEmployeeBirthdaySchedule(monthEmployees) {
    let date = new Date();
    let res = '';
    monthNames
        .filter((m, i) => {
            let relativeMonthNumber = i - date.getMonth();
            return relativeMonthNumber >= 0 && relativeMonthNumber <= horizon;
        })
        .forEach((m) => {
            res += `${m} ${date.getFullYear()}\n`;
            monthEmployees.get(m).forEach(employee => {
                const bDate = employee.birthday.split("-")
                res += `(${bDate[2]}) - ${employee.name} (${date.getFullYear() - bDate[0] + 1} years!)\n`
            })
            if (monthEmployees.get(m).length === 0) {
                res += 'no employees birthdays in this month =('
            }
        });
    return res;
}

function readTextFile(path, onSuccess) {
    if (!path) {
        console.error('You should specify a csv file path as an application argument.');
        return;
    }

    fs.readFile(empPath, {encoding: 'utf8'}, (err, text) => {
        if (err) {
            console.error(err);
            return;
        }
        onSuccess(text);
    });
}
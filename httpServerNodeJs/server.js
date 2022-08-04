import http from 'http';
import {plural} from "./plural.js";
import {countWords} from "./wordsCountTask.js";

function logRequest({method, url}) {
    console.log(`[${new Date().toISOString()}] ${method} ${url}`)
}

const tasks = [{name: 'Get tasks'}, {name: 'Create task'}];

const server = http.createServer((req, res) => {
    const arrPartsOfUrl = req.url.split('?');
    const path = arrPartsOfUrl[0];

    logRequest(req)

    if (path === '/tasks') {
        if (req.method === 'GET') {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(tasks));
        } else if (req.method === 'POST') {
            const data = [];
            req.on('data', chunk => data.push(chunk));
            req.on('end', () => {
                const task = JSON.parse(data.join(''))
                tasks.push(task);
                res.writeHead(201, {'Content-Type': 'application/json'})
            })
        } else {
            res.writeHead(404, 'Not Found');
            res.end();
        }
    } else if (path === '/headers') {//task1(headers)test => curl localhost:3000/headers
        if (req.method === 'GET') {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(JSON.stringify(req.headers));
        } else {
            res.writeHead(404, 'Not Found');
            res.end();
        }
    } else if (path === '/plural') {//task2(plural)test => curl "localhost:3000/plural?number=1&forms=apple,apples,apples"
        const arrOfQueryParams = arrPartsOfUrl[1].split('&');
        const number = arrOfQueryParams[0].split('=')[1];
        const forms = arrOfQueryParams[1].slice(6).split(',');

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(plural(number, forms[0], forms[1], forms[2]) + '\n');
    } else if (path === '/frequency') {//task3 (frequency) test => curl -v -X POST localhost:3000/frequency --data-raw "Little red fox jumps over logs. Fox is red"
        if (req.method === 'POST') {
            const data = [];
            req.on('data', chunk => data.push(chunk));
            req.on('end', () => {
                const countWordsResElem = countWords(data.toString())
                res.writeHead(201, {
                    'Content-Type': 'application/json',
                    'X-Unique-Words-Count': countWordsResElem.CountOfUniqueWords,
                    'X-The-Most-Frequent-Word': countWordsResElem.MostOftenWord
                })
                res.end();
            })
        } else {
            res.writeHead(404, 'Not Found');
            res.end();
        }
    } else {
        res.writeHead(404, 'Not Found');
        res.end();
    }
})

const port = 3000;
server.listen(port, () => {
    console.log(`Server started at localhost: ${port}`);
});
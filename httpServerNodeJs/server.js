import http from 'http';

function logRequest({method, url}) {
    console.log(`[${new Date().toISOString()}] ${method} ${url}`)
}

const tasks = [{name: 'Get tasks'}, {name: 'Create task'}];
const headers = [];
const server = http.createServer((req, res) => {
    const arrPartsOfUrl = req.url.split('?');
    const path = arrPartsOfUrl[0];
    logRequest(req)
    console.log(req.path);
    if (path === '/tasks') {
        if (req.method === 'GET') {
            res.writeHead(200, {'Content-Type': 'text/html'});
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
    } else if (path === '/headers') {//task1(headers)
        if (req.method === 'GET') {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(headers.toString());
        } else if (req.method === 'POST') {
            const data = [];
            req.on('data', chunk => data.push(chunk.toString()));
            req.on('end', () => {
                const header = data.join('')
                headers.push(header);
                res.writeHead(201, {'Content-Type': 'text/html'})
            })
        } else {
            res.writeHead(404, 'Not Found');
            res.end();
        }
    } else if (path === '/plural') {//task2(plural)test1 curl "http://localhost:3000/plural?number=1&forms=aple,aples,aples"
            const arrOfQueryParams = arrPartsOfUrl[1].split('&');
        console.log(arrOfQueryParams);
        const number = arrOfQueryParams[0].split('=')[1];
        console.log(number);
        const forms = arrOfQueryParams[1].slice(6).split(',');
        console.log(forms);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end((plural(number, forms[0], forms[1], forms[2])));
    }
        else {
        res.writeHead(404, 'Not Found');
        res.end();
    }
})

const port = 3000;
server.listen(port, () => {
    console.log(`Server started at localhost: ${port}`);
});

function plural(count, one, few, many) {
    const prefix = count + " ";
    count = Math.abs(count)
    if (count > 9 && count < 21) {
        return prefix + many
    }
    if (count % 10 === 1) {
        return prefix + one
    }
    if (count % 10 > 1 && count % 10 < 5) {
        return prefix + few
    }
    return prefix + many
}
import express from "express";
const app = express();

function logRequest({method, url}, res, next) {
    console.log(`[${new Date().toISOString()}] ${method} ${url}`);
    next();
}

app.use(express.json());
app.use(logRequest);

const inc = (init = 0) => () => ++init
const genId = inc();

const tasks = [
    {
        id: genId(),
        name: 'Get task'
    },
    {
        id: genId(),
        name: 'Create task'
    },
];
const createTask = data => {
    return {
        id: genId(),
        name: data.name,
        done: false,
    }
}
app.get('/tasks', (req, res) => res.json(tasks))

app.post('/tasks', (req, res) => {
    let task = createTask(req.body);
    tasks.push(task);
    res.json(task);
});

app.patch('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        Object.assign(task, req.body);
        res.json(task);
    } else {
        res.status(404).json({error: 'Task not found'});
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});
//check task
//curl localhost:3000/tasks
//add task
//curl localhost:3000/tasks -d '{ "name": "new task", "done": false }' -H "Content-Type: application/json"
//change task
//curl -X PATCH localhost:3000/tasks/3 -d '{ "done": true, "ololo": "ololol" }' -H 'Content-type: application/json'
/////////////////HTTPie//////////////////
//http localhost:3000/tasks
//http :3000/tasks name="Get by id again"
//http PATCH :3000/tasks/1 name="Get by id again"
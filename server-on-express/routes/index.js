import express from "express";

export const router = express.Router();

const inc = (init = 0) => () => ++init
const genListId = inc();
const genTaskId = inc();

const lists = [
    {
        id: genListId(),
        listName: 'Tomorrow tasks',
        tasks: [
            {
                id: genTaskId(),
                name: 'Buy some milk',
                done: false
            }
        ]
    }
]

const createTask = data => {
    return {
        id: genTaskId(),
        name: data.name,
        done: false,
    }
}
const createList = data => {
    return {
        id: genListId(),
        listName: data.listName,
        tasks: data.tasks ? data.tasks: []
    }
}
router.get('/lists', (req, res) => res.json(lists));//http localhost:3000/lists

router.get('/lists/:id', (req, res) => {//http localhost:3000/lists/1
    const listId = parseInt(req.params.id);
    const list = lists.find(l => l.id === listId);
    res.json(list)
});

router.get('/tasks', (req, res) => {//http localhost:3000/tasks?listId=1
    const listId = parseInt(req.query['listId']);
    const list = lists.find(l => l.id === listId);
    res.json(list.tasks)
});

router.get('/tasks/:id', (req, res) => {//http localhost:3000/tasks/1?listId=1
    const listId = parseInt(req.query['listId']);
    const list = lists.find(l => l.id === listId);

    const taskId = parseInt(req.params.id);
    const task = list.tasks.find(t => t.id === taskId);

    res.json(task)
});


router.post('/lists', (req, res) => {//http localhost:3000/lists listName=ToDo
    let list = createList(req.body);
    lists.push(list);
    res.json(lists);
});

router.post('/tasks', (req, res) => {//http localhost:3000/tasks?listId=1 name="task" done=false
    const listId = parseInt(req.query['listId']);
    const list = lists.find(l => l.id === listId);
    if (list) {
        const task = createTask(req.body);
        list.tasks.push(task);
    }
    res.json(lists);
});

router.patch('/lists/:id', (req, res) => {//http PATCH localhost:3000/lists/1 listName="Done"
    const listId = parseInt(req.params.id);
    const list = lists.find(l => l.id === listId);

    if (list) {
        Object.assign(list, req.body);
        res.json(list);
    } else {
        res.status(404).json({error: 'List not found'});
    }
});

router.patch('/tasks/:id', (req, res) => {//http PATCH localhost:3000/tasks/1?listId=1 name="wth" done=true
    const listId = parseInt(req.query['listId']);
    const list = lists.find(l => l.id === listId);

    const taskId = parseInt(req.params.id);
    const task = list.tasks.find(t => t.id === taskId);

    if (task) {
        Object.assign(task, req.body);
        res.json(task);
    } else {
        res.status(404).json({error: 'Task not found'});
    }
});

router.delete('/lists/:id', (req, res) => {//http DELETE localhost:3000/lists/1
    const listId = parseInt(req.params.id);
    const list = lists.find(l => l.id === listId);

    if (list) {
        lists.splice(lists.indexOf(list), 1)
        res.json(lists);
    } else {
            res.status(404).json({error: 'List not found'});
        }
})

router.delete('/tasks/:id', (req, res) => {//http DELETE localhost:3000/tasks/1?listId=1
    const listId = parseInt(req.query['listId']);
    const list = lists.find(l => l.id === listId);

    const tasks = list.tasks;

    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => parseInt(t.id) === taskId);

    if (task) {
        tasks.splice(tasks.indexOf(task), 1);
        res.json(tasks);
    } else {
        res.status(404).json({error: 'Task not found'});
    }
})

router.put('/lists/:id',(req, res) => {//http PUT localhost:3000/lists/1 name="HelloMOTOROLAS"//
    const listId = parseInt(req.params.id);
    const list = lists.find(l => parseInt(l.id) === listId);

    if (list) {
        lists[lists.indexOf(list)] = req.body;
        res.json(lists);
    } else {
        res.status(404).json({error: 'List not found'});
    }
})

router.put('/tasks/:id', (req, res) => {//http PUT localhost:3000/tasks/1?listId=1 name="HelloMOTOROLAS" done=true oil="oil"
    const listId = parseInt(req.query['listId']);
    const list = lists.find(l => parseInt(l.id) === listId);

    const tasks = list.tasks;

    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => parseInt(t.id) === taskId);
    if (task) {
        tasks[tasks.indexOf(task)] = req.body;
        res.json(tasks);
    } else {
        res.status(404).json({error: 'Task not found'});
    }
})

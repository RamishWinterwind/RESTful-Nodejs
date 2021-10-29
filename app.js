const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {id: 1, name: 'Program'},
    {id: 2, name: 'DSA'},
    {id: 3, name: 'ML'}
];

app.get('/', (req, res) => {
    res.send('Hello Ramish');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given Id is not present');
    res.send(course);
});


app.post('/api/courses', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

const port = process.env.port || 3000
app.listen(port, () => {
    console.log('Listening on Port '+port+'........');
});
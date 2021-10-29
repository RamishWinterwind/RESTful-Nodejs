const express = require('express');
const Joi = require('joi');
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
    if (!course) return res.status(404).send('The course with the given Id is not present');
    res.send(course);
});


app.post('/api/courses', (req, res) => {
    
    const { error } = validateCourse(req.body)

    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given Id is not present');

    const { error } = validateCourse(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.body.id));
    if (!course) return res.status(400).send('The course with the given Id is not present');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

const port = process.env.port || 3000
app.listen(port, () => {
    console.log('Listening on Port '+port+'........');
});

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}
const express = require('express');

const app = express();
app.use(express.json());

let courses = [
  {id: 1, name: 'Curso 1' },
  {id: 2, name: 'Curso 2' },
  {id: 3, name: 'Curso 3' },
];

app.get('/courses', (request, response) => {
  return response.json(courses);
});

app.post('/courses', (request, response) => {
  const course = request.body;
  courses.push(course);
  return response.status(201).json({ message: 'Curso adicionado com sucesso!' });
})

app.put('/courses/:id', (request, response) => {
  const { id } = request.params;
  const courseData = request.body;

  const findCourse = courses.find(course => course.id === Number(id));
  
  if (!findCourse) {
    return response.status(400).json({ message: 'Curso não encontrado!' });
  }

  courses = courses.map(course => {
    if (course.id === findCourse.id) return courseData;
    return course;
  })

  return response.status(201).json({ message: 'Curso alterado com sucesso!' });
})

app.patch('/courses/:id', (request, response) => {
  const { id } = request.params;
  const { name } = request.body;
  
  const findCourse = courses.find(course => course.id === Number(id));
  
  if (!findCourse) {
    return response.status(400).json({ message: 'Curso não encontrado!' });
  }

  courses = courses.map(course => {
    if (course.id === findCourse.id) return { ...course, name };
    return course;
  })

  return response.status(201).json({ message: 'Nome do curso alterado com sucesso!' });
})

app.delete('/courses/:id', (request, response) => {
  const { id } = request.params;

  const findCourse = courses.find(course => course.id === Number(id));

  if (!findCourse) {
    return response.status(400).json({ message: 'Curso não encontrado!' });
  }

  courses = courses.filter(course => course.id !== Number(id));

  return response.status(201).json({ message: 'Curso removido com sucesso!' });
})

app.listen(3333);

// index.js
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

// Almacenamiento en memoria
const users = [];
const logs = {}; // { userId: [ { description, duration, date } ] }

// Generador simple de IDs
function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

// Ruta raíz
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Crear un nuevo usuario
app.post('/api/users', (req, res) => {
  const username = req.body.username;
  if (!username) {
    return res.status(400).json({ error: 'Falta el campo username' });
  }
  const _id = generateId();
  const user = { username, _id };
  users.push(user);
  logs[_id] = [];
  res.json(user);
});

// Obtener todos los usuarios
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Añadir ejercicio a un usuario
app.post('/api/users/:_id/exercises', (req, res) => {
  const userId = req.params._id;
  const user = users.find(u => u._id === userId);
  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  const { description, duration, date } = req.body;
  if (!description || !duration) {
    return res.status(400).json({ error: 'Faltan description o duration' });
  }

  const durNum = parseInt(duration);
  let dateObj = date ? new Date(date) : new Date();
  if (isNaN(dateObj.getTime())) {
    return res.status(400).json({ error: 'Formato de fecha inválido' });
  }

  const dateString = dateObj.toDateString();
  const exercise = {
    description,
    duration: durNum,
    date: dateString
  };

  logs[userId].push(exercise);

  res.json({
    username: user.username,
    description: exercise.description,
    duration: exercise.duration,
    date: exercise.date,
    _id: user._id
  });
});

// Obtener log de ejercicios de un usuario
app.get('/api/users/:_id/logs', (req, res) => {
  const userId = req.params._id;
  const user = users.find(u => u._id === userId);
  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  let userLogs = logs[userId] || [];

  // Filtrar por fechas desde 'from' y hasta 'to'
  const { from, to, limit } = req.query;
  if (from) {
    const fromDate = new Date(from);
    if (!isNaN(fromDate.getTime())) {
      userLogs = userLogs.filter(e => new Date(e.date) >= fromDate);
    }
  }
  if (to) {
    const toDate = new Date(to);
    if (!isNaN(toDate.getTime())) {
      userLogs = userLogs.filter(e => new Date(e.date) <= toDate);
    }
  }

  // Aplicar límite
  if (limit) {
    const lim = parseInt(limit);
    if (!isNaN(lim)) {
      userLogs = userLogs.slice(0, lim);
    }
  }

  res.json({
    username: user.username,
    count: userLogs.length,
    _id: user._id,
    log: userLogs
  });
});

// Puesto a escuchar
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('La aplicación está escuchando en el puerto ' + listener.address().port);
});

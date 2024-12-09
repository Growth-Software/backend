const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// Utilizar una DB
const USERS = [
    { username: 'admin', password: 'admin' },
];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    console.log(req.body)

    const user = USERS.find(
        (user) => (user.username === username) && (user.password === password)
    );

    if (user) {
        res.status(200).json({ mensaje: 'Login exitoso', usuario: user.username });
    } else {
        res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

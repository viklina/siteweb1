const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Привет, мир! Сервер работает на порту ' + PORT);
});

app.post('/register', (req, res) => {
    const { name, mail, password } = req.body;
    const newUser = { name, mail, password };

    if (!fs.existsSync('users.json')) {
        fs.writeFileSync('users.json', '[]'); // Создание пустого массива, если файл не существует
    }

    let users = JSON.parse(fs.readFileSync('users.json'));

    // Добавление нового пользователя
    users.push(newUser);

    // Запись обновленных данных в файл users.json
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));

    res.json({ message: 'Пользователь зарегистрирован' });
});

app.post('/login', (req, res) => {
    const { mail, password } = req.body;

    let users = JSON.parse(fs.readFileSync('users.json'));

    const user = users.find((user) => user.name === name1 && user.mail === mail1 && user.password === parol);

    if (user) {
        res.json({ message: 'Вы вошли' });
    } else {
        res.status(401).json({ message: 'Ошибка аутентификации' });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});

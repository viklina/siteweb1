
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const jwt = require('jsonwebtoken');
const path = require('path');

const PORT = 3000;

app.use(express.json());
app.use(cors());

const sitePath = path.join(__dirname,'C:/Users/vikap/Documents/GitHub/siteweb2')

app.use('/css', express.static(path.join(sitePath, 'css')));
app.use('/images', express.static(path.join(sitePath, 'images')));

app.get('/', (req, res) => {
    res.sendFile(path.join(sitePath, 'index.html'));
});

app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "default-src 'self'; img-src * data:https://github.com/viklina/siteweb1.git");
    next();
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

    const user = users.find((user) => user.mail === mail && user.password === password);

    if (user) {
        const token = jwt.sign({ user }, 'your_secret_key'); // Создание токена

        res.json({ token }); // Отправка токена клиенту
    } else {
        res.status(401).json({ message: 'Ошибка аутентификации' });
    }
});
// Пример middleware для проверки токена при запросах, требующих аутентификации
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Отсутствует токен' });
    }

    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Недействительный токен' });
        }
        req.user = decoded.user;
        next();
    });
}

// Пример защищенного маршрута, требующего аутентификации
app.get('/protected', verifyToken, (req, res) => {
    res.json(req.user);
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});

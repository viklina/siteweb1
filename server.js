
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');

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


const folderPath = 'uploads'; // Задайте путь к папке

// Проверяем, существует ли папка
if (!fs.existsSync(folderPath)) {
    // Если не существует, создаем папку
    fs.mkdirSync(folderPath);
    console.log(`Папка '${folderPath}' успешно создана.`);
} else {
    console.log(`Папка '${folderPath}' уже существует.`);
}
// Используем Multer для обработки файлов
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Здесь файлы будут временно сохраняться
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
    const { caption } = req.body;
    const imagePath = path.join(__dirname, 'uploads', req.file.filename);

    // Здесь вы можете сохранить данные (например, в базе данных) или что-то еще.

    res.json({ message: 'Изображение успешно загружено и опубликовано!' });
});




app.post('/register', (req, res) => {
    const { name, mail, password } = req.body;
    const newUser = { name, mail, password };

    if (!fs.existsSync('users.json')) {
        fs.writeFileSync('users.json', '[]'); // Создание пустого массива, если файл не существует
    }

    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }

        let existingUsers = JSON.parse(data);

        // Проверка пароля
        if (password.length < 5 || !/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
            return res.status(400).json({ message: 'Пароль должен содержать не менее 5 символов, включая буквы и цифры.' });
        }

        // Проверка почты
        if (!mail.includes("@")) {
            return res.status(400).json({ message: 'Некорректный адрес электронной почты.' });
        }

        // Проверка уникальности почты
        if (existingUsers.some(user => user.mail === mail)) {
            return res.status(400).json({ message: 'Такая почта уже занята.' });
        }

        // Проверка уникальности пароля
        if (existingUsers.some(user => user.password === password)) {
            return res.status(400).json({ message: 'Такой пароль уже занят.' });
        }

        // Добавление нового пользователя
        existingUsers.push(newUser);

        // Запись обновленных данных в файл users.json
        fs.writeFile('users.json', JSON.stringify(existingUsers, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Ошибка сервера' });
            }

            res.json({ message: 'Пользователь зарегистрирован' });
        });
    });
});


app.post('/login', (req, res) => {
    const { mail, password } = req.body;
    console.log('Вход: ', mail, password); // добавьте вывод в консоль

    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }

        let users = JSON.parse(data);

        const user = users.find((user) => user.mail === mail && user.password === password);
        console.log('Найденный пользователь: ', user); // добавьте вывод в консоль

        if (user) {
            const token = jwt.sign({ user }, 'your_secret_key'); // Создание токена
            console.log('Токен: ', token); // добавьте вывод в консоль
            // Добавляем условие для перенаправления в зависимости от имени и почты
            if (user.name === 'Денис' && user.mail === 'webtehnologi@gmail.com' && user.password === 'CIS27plethud') {
                console.log('Пользователь Денис, перенаправляем на zakas.html');
                res.json({ token, redirect: 'zakas.html' });
            } else {
                console.log('Пользователь не Денис, перенаправляем на profil.html');
                res.json({ token, redirect: 'profil.html' });
            }
        } else {
            res.status(401).json({ message: 'Ошибка аутентификации' });
        }
    });
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

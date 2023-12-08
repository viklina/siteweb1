const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const uploadsFolderPath = path.join(__dirname, 'uploads');
const entriesFilePath = path.join(__dirname, 'entries.json');
const relativePathToUploads = 'http://localhost:3000/uploads';

app.use(express.static(path.join(__dirname, 'site')));

app.use('/uploads', express.static('uploads'));

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'Token is missing' });
    }
    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = decoded.user;
        next();
    });
}


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsFolderPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const data = await fs.readFile(entriesFilePath, 'utf8');
        let entries = JSON.parse(data);

        if (!Array.isArray(entries)) {
            entries = [];
        }

        const imagePath = `${relativePathToUploads}/${req.file.filename}`;
        const { caption, imageLink } = req.body;
        const newEntry = { imagePath, caption, imageLink };
        entries.push(newEntry);

        await fs.writeFile(entriesFilePath, JSON.stringify(entries, null, 2));

        res.json({ message: 'Image successfully uploaded and published!', imagePath, redirect: 'gurnal.html' });

    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.get('/gurnal.html', async (req, res) => {
    try {
        const data = await fs.readFile(entriesFilePath, 'utf8');
        const entries = JSON.parse(data);

        let htmlString = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <!-- your title, styles, and scripts -->
        </head>
        <body>
            <div class="container2" id="journalEntries">
        `;

        entries.forEach(entry => {
            const entryElement = `<div><img src="${relativePathToUploads}/${entry.imagePath}" alt="${entry.caption}" style="max-width: 100%; height: auto;"></div>`;
            htmlString += entryElement;
        });

        htmlString += `
                </div>
                <!-- other HTML content -->
            </body>
            </html>
        `;

        res.send(htmlString);
    } catch (error) {
        console.error('Error reading entries.json file:', error);
        res.status(500).send('Internal Server Error');
    }
});




app.post('/register', async (req, res) => {
    try {
        const { name, mail, password } = req.body;
        const newUser = { name, mail, password };

        try {
            // Используем асинхронный метод для проверки существования файла
            await fs.access('users.json');
        } catch (error) {
            // Если файл не существует, создаем пустой файл
            await fs.writeFile('users.json', '[]');
        }

        const data = await fs.readFile('users.json', 'utf8');
        const existingUsers = JSON.parse(data);

        // Ваша логика валидации

        existingUsers.push(newUser);

        await fs.writeFile('users.json', JSON.stringify(existingUsers, null, 2));

        res.json({ message: 'User registered successfully', redirect: 'test.html' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.post('/login', (req, res) => {
    const { mail, password } = req.body;

    fs.readFile('users.json', 'utf8')
        .then((data) => {
            const users = JSON.parse(data);

            const user = users.find((user) => user.mail === mail && user.password === password);

            if (user) {
                const token = jwt.sign({ user }, 'your_secret_key');

                if (user.name === 'Денис' && user.mail === 'webtehnologi@gmail.com' && user.password === 'CIS27plethud') {
                    res.json({ token, redirect: 'zakas.html' });
                } else {
                    res.json({ token, redirect: 'test.html' });
                }
            } else {
                res.status(401).json({ message: 'Authentication error' });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        });
});
app.get('/journal-entries', async (req, res) => {
    try {
        const data = await fs.readFile(entriesFilePath, 'utf8');
        const entries = JSON.parse(data);
        res.json(entries);
    } catch (error) {
        console.error('Ошибка чтения файла entries.json:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

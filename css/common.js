// common.js
async function displayImages() {
    try {
        const response = await fetch('http://localhost:3000/journal-entries', {
            headers: {
                'Content-Security-Policy': 'default-src \'self\'; connect-src \'self\' http://localhost:3000;'
            }
        });

        const entries = await response.json();

        const journalEntriesContainer = document.getElementById('journalEntries');
        journalEntriesContainer.innerHTML = '';

        if (Array.isArray(entries)) {
            entries.forEach(entry => {
                const imagePath = entry.imagePath.startsWith('http') ? entry.imagePath : `/uploads/${entry.imagePath}`;
                console.log('Image path:', imagePath);
                let entryElement = document.createElement('div');
                entryElement.innerHTML = `
                    <img src="${imagePath}" alt="${entry.caption}" style="max-width: 100%; height: auto;">
                `;
                // Создаем элемент img для изображения
                let imageElement = document.createElement('img');
                imageElement.src = imagePath;
                imageElement.alt = entry.caption;
                imageElement.style.maxWidth = '100%';
                imageElement.style.height = 'auto';

                // Создаем элемент p для текстовой информации
                let textElement = document.createElement('p');
                textElement.textContent = entry.caption;
                let linkElement = document.createElement('p');
                linkElement.textContent = entry.imageLink;

               
                entryElement.appendChild(linkElement);
                
                entryElement.appendChild(textElement);

                journalEntriesContainer.appendChild(entryElement);
            });
        } else {
            console.error('Ошибка: entries не является массивом');
        }
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
    }
}

// Функция для публикации поста
async function publishPost() {
    const captionInput = document.getElementById('caption');
    const imageInput = document.getElementById('image');
    const imageLinkInput = document.getElementById('imageLink');

    const caption = captionInput.value;
    const imageFile = imageInput.files[0];
    const imageLink = imageLinkInput.value;

    if (!caption || (!imageFile && !imageLink)) {
        console.log('Заполните все поля для публикации');
        return;
    }

    const formData = new FormData();
    formData.append('caption', caption);

    if (imageFile) {
        formData.append('image', imageFile);
    } else {
        formData.append('imageLink', imageLink);
    }

    try {
        const response = await fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        console.log(result);
        if (result.redirect) {
            window.location.href = result.redirect;
            // После перенаправления вызываем displayImages для обновления отображения
            await displayImages();
        }

    } catch (error) {
        console.error('Ошибка:', error);
    }
}

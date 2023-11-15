function publishPost() {
    var caption = document.getElementById("caption").value;
    var imageInput = document.getElementById("image");
    var imageFile = imageInput.files[0];

    if (!caption || !imageFile) {
        console.log("Заполните все поля для публикации");
        return;
    }

    var formData = new FormData();
    formData.append('caption', caption);
    formData.append('image', imageFile);

    fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            console.log(data); // Вывод ответа от сервера
            // Дополнительные действия, если необходимо
        })
        .catch(error => console.error('Ошибка:', error));
}
fetch('http://localhost:3000/journal-entries') // Замените на ваш маршрут для получения данных
    .then(response => response.json())
    .then(entries => {
        const journalEntriesElement = document.getElementById('journalEntries');

        entries.forEach(entry => {
            const entryElement = document.createElement('div');
            entryElement.innerHTML = `
                <img src="${entry.imagePath}" alt="${entry.caption}" style="max-width: 300px;">
                <p>${entry.caption}</p>
            `;
            journalEntriesElement.appendChild(entryElement);
        });
    })
    .catch(error => console.error('Ошибка:', error));

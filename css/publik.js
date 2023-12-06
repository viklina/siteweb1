document.addEventListener("DOMContentLoaded", function () {
    // Проверяем, на какой странице мы находимся
    const isGurnalPage = document.getElementById('journalEntries') !== null;

    if (isGurnalPage) {
        const relativePathToUploads = 'http://localhost:3000/uploads';
        // Вызываем функцию для отображения изображений только на странице gurnal.html
        displayImages(relativePathToUploads);
    }





});
document.addEventListener("DOMContentLoaded", function () {
    // ���������, �� ����� �������� �� ���������
    const isGurnalPage = document.getElementById('journalEntries') !== null;

    if (isGurnalPage) {
        const relativePathToUploads = 'http://localhost:3000/uploads';
        // �������� ������� ��� ����������� ����������� ������ �� �������� gurnal.html
        displayImages(relativePathToUploads);
    }





});
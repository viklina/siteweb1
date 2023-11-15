function publishPost() {
    var caption = document.getElementById("caption").value;
    var imageInput = document.getElementById("image");
    var imageFile = imageInput.files[0];

    if (!caption || !imageFile) {
        console.log("��������� ��� ���� ��� ����������");
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
            console.log(data); // ����� ������ �� �������
            // �������������� ��������, ���� ����������
        })
        .catch(error => console.error('������:', error));
}
fetch('http://localhost:3000/journal-entries') // �������� �� ��� ������� ��� ��������� ������
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
    .catch(error => console.error('������:', error));

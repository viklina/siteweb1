document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("knopka2").addEventListener("click", function (event) {
        event.preventDefault();

        var mail = document.getElementById("mail1").value;
        var password = document.getElementById("parol").value;

        if (mail === "" || password === "") {
            console.log("Заполните все поля для входа");
        } else {
            fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ mail, password })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data); // Вывод ответа от сервера
                    if (data.token) {
                        localStorage.setItem('token', data.token); // Сохранение токена в localStorage
                        console.log("Успешный вход!");
                        console.log("Токен:", data.token);
                        // Проверяем наличие параметра redirect в ответе
                        if (data.redirect) {
                            // Если есть, перенаправляем пользователя на указанную страницу
                            window.location.href = data.redirect;
                        } else {
                            // В противном случае, перенаправляем на стандартную страницу
                            window.location.href = 'profil.html';
                        }
                    } else {
                        console.log("Ошибка входа, проверьте правильность введенных данных");
                    }
                })
                .catch(error => console.error('Ошибка:', error));
        }
    });
});

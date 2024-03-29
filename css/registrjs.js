document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("knopka1").addEventListener("click", function (event) {
        event.preventDefault();
        var name = document.getElementById("name").value;
        var mail = document.getElementById("mail").value;
        var password = document.getElementById("password").value;
        var password2 = document.getElementById("password2").value;

        if (name === "" || mail === "" || password === "" || password2 === "") {
            var russianWord = "Заполните все поля";
            console.log(russianWord);
        } else if (password !== password2) {
            var russianWord5 = "Пароли не совпадают";
            console.log(russianWord5);
        } else {
            var userInfo = "Имя: " + name + ", Почта: " + mail + ", Пароль: " + password + " || Вы зарегистрированы!";
            console.log(userInfo);

            fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, mail, password })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data); // Вывод ответа от сервера
                    if (data.message === 'Пользователь зарегистрирован') {
                        // Здесь можете выполнить дополнительные действия после регистрации
                        //console.log("Пользователь зарегистрирован успешно!");
                        window.location.href = data.redirect;
                    }
                    if (data.token) {
                        console.log("Токен:", data.token);
                    }
                })
                .catch(error => console.error('Ошибка:', error));
        }
       
    });

});

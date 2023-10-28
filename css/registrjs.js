document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("submit").addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the default form submission if inside a form
        var name = document.getElementById("name").value;
        var mail = document.getElementById("mail").value;
        var password = document.getElementById("password").value;
        var password2 = document.getElementById("password2").value;

        if (name === "" && mail === "" && password === "" && password2 === "") {
            var russianWord = "Заполните все поля";
            console.log(russianWord);
        } else if (name === "") {
            var russianWord1 = "Заполните поле Имя";
            console.log(russianWord1);
        } else if (mail === "") {
            var russianWord2 = "Заполните поле Почта";
            console.log(russianWord2);
        } else if (password === "") {
            var russianWord3 = "Заполните поле Пароль";
            console.log(russianWord3);
        } else if (password2 === "") {
            var russianWord4 = "Заполните поле Повторите пароль";
            console.log(russianWord4);
        } else if (password !== password2) {
            var russianWord5 = "Пароли не совпадают";
            console.log(russianWord5);
        } else {
            var userInfo = "Имя: " + name + ", Почта: " + mail + ", Пароль: " + password + " || Вы зарегистрированы!";
            console.log(userInfo);
        
            fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, mail, password, password2 })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data.message); // Вывод ответа от сервера
                })
                .catch(error => console.error('Ошибка:', error)); }
        });
});

  
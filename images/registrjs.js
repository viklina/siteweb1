document.getElementById("knopka").onclick = function () {
    var name = document.getElementById("name").value;
    var password = document.getElementById("password").value;
    if (name === "" && password === "") {
        alert("Заполните поле");
    }
    else if (name === "") {
        alert("Заполните поле Имя");
    }
    else if (password === "") {
        alert("Заполните поле Пароль");
    }
    else {
        var name1 = "Имя: " + name + "Пароль: " + password + " || Вы зарегестрированы! ";
        alert(name1);
    }
}

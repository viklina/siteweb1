document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("submit").addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the default form submission if inside a form
        var name = document.getElementById("name").value;
        var password = document.getElementById("password").value;

        if (name === "" && password === "") {
            var russianWord = "��������� ����";
            console.log(russianWord);
            
        } else if (name === "") {
            var russianWord1 = "��������� ���� ���";
            console.log(russianWord1);


        } else if (password === "") {
            var russianWord2 = "��������� ���� ������";
            console.log(russianWord2);
           
        } else {
            var name1 = "���: " + name + " ������: " + password + " || �� ����������������! ";
            console.log(name1);
        }

        
    });
});

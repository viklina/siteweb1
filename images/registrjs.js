document.getElementById("knopka").onclick = function () {
    var name = document.getElementById("name").value;
    var password = document.getElementById("password").value;
    if (name === "" && password === "") {
        alert("��������� ����");
    }
    else if (name === "") {
        alert("��������� ���� ���");
    }
    else if (password === "") {
        alert("��������� ���� ������");
    }
    else {
        var name1 = "���: " + name + "������: " + password + " || �� ����������������! ";
        alert(name1);
    }
}

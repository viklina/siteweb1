function showResult() {
    // Получение формы
    const form = document.querySelector('form');

    // Обработка события отправки формы
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Получение всех выбранных ответов
        const answers = {
            question1: document.querySelector('input[name="question1"]:checked').value,
            question2: document.querySelector('input[name="question2"]:checked').value,
            question3: document.querySelector('input[name="question3"]:checked').value,
            question4: document.querySelector('input[name="question4"]:checked').value,
            question5: document.querySelector('input[name="question5"]:checked').value,
            question6: document.querySelector('input[name="question6"]:checked').value,
            question7: document.querySelector('input[name="question7"]:checked').value,
            question8: document.querySelector('input[name="question8"]:checked').value,
            question9: document.querySelector('input[name="question9"]:checked').value,
            question10: document.querySelector('input[name="question10"]:checked').value,
        };

        // Подсчет количества выбранных вариантов для каждой буквы
        const counts = {
            a: 0,
            b: 0,
            c: 0,
            d: 0,
        };

        // Подсчет количества ответов для каждой буквы
        for (const answer in answers) {
            counts[answers[answer]]++;
        }

        // Определение результата и вывод
        let resultText = '';
        // Пример логики для вывода результата в зависимости от большего количества ответов под определенной буквой
        // Например, если больше ответов под буквой 'a'
        if (counts.a > counts.b && counts.a > counts.c && counts.a > counts.d) {
            resultText = 'Результат: Кажется вам подходит сфера IT, связанная с разработкой программного обеспечения, она охватывает широкий спектр деятельности.' +
                'Она включает в себя создание и поддержку программных продуктов для различных целей и отраслей, начиная от веб - приложений и мобильных приложений до систем управления базами данных и встраиваемых систем.' +
                'Основные навыки, востребованные в этой сфере, включают в себя программирование на различных языках(таких как Java, Python, JavaScript, C++), архитектурное проектирование, тестирование и работу с базами данных.' +
                'Профессионалы в данной области ориентированы на постоянное развитие и инновации.Они стремятся к созданию удобных, эффективных решений для пользователей и взаимодействуют с передовыми технологиями для улучшения повседневной жизни.' +
                'Работа в разработке программного обеспечения предлагает креативные задачи, постоянные вызовы и возможность постоянного профессионального роста.Также она требует высокого уровня ответственности и способности адаптироваться к постоянно меняющимся требованиям рынка и технологий.';
        } else if (counts.b > counts.a && counts.b > counts.c && counts.b > counts.d) {
            resultText = 'Вам подходит область администрирования систем, если вы ориентированы на обеспечение стабильности и безопасности информационных технологий в организации.Если вы умеете эффективно управлять серверами, сетями, и обеспечивать безопасность информационных систем, это идеальная сфера для вас.Работа в этой области предполагает непрерывную поддержку и обеспечение стабильности инфраструктуры, гарантируя ее бесперебойную и безопасную работу.';
        } else if (counts.c > counts.a && counts.c > counts.b && counts.c > counts.d) {
            resultText = "Вам подойдет свера Интернет вещей(IoT), если вы заинтересованы в создании и управлении устройствами, обменивающимися данными и оптимизирующими повседневные процессы.Работа в области IoT требует навыков работы с сенсорами, протоколами связи и анализа данных для создания встроенных систем, улучшающих жизнь людей и оптимизирующих рабочие процессы.";
        } else if (counts.d > counts.a && counts.d > counts.b && counts.d > counts.c) {
            resultText = "Работа в сфере кибербезопасности подходит вам, если вы заинтересованы в знаниях о сетевых уязвимостях, шифровании, мониторинге и реагировании на киберугрозы. Это требует умения распознавать угрозы, защищать данные и обеспечивать надежность в цифровой среде.";
        }

        // Вывод результата
        const resultElement = document.getElementById('resultText');
        if (resultElement) {
            resultElement.textContent = resultText;
        } else {
            console.error('Элемент resultText не найден.');
        }

        // Отображение результата
        const resultDiv = document.getElementById('result');
        if (resultDiv) {
            resultDiv.style.display = 'block';
        } else {
            console.error('Элемент result не найден.');
        }
    });
}
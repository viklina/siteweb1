function showResult() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const answers = {};

        // Получение ответов на вопросы
        for (let i = 1; i <= 10; i++) {
            const questionName = `question${i}`;
            const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);

            if (selectedOption) {
                answers[questionName] = selectedOption.value;
            } else {
                alert(`Пожалуйста, ответьте на вопрос ${i}.`);
                return; // Прерываем выполнение функции, если не все вопросы отвечены
            }
        }

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
                'Работа в разработке программного обеспечения предлагает креативные задачи, постоянные вызовы и возможность постоянного профессионального роста.Также она требует высокого уровня ответственности и способности адаптироваться к постоянно меняющимся требованиям рынка и технологий.Вы можете пройти эти курсы по разработке программного обеспечения https://career.habr.com/courses/skills/razrabotka-programmnogo-obespecheniya';
        } else if (counts.b > counts.a && counts.b > counts.c && counts.b > counts.d) {
            resultText = 'Вам подходит область администрирования систем, если вы ориентированы на обеспечение стабильности и безопасности информационных технологий в организации.Если вы умеете эффективно управлять серверами, сетями, и обеспечивать безопасность информационных систем, это идеальная сфера для вас.Работа в этой области предполагает непрерывную поддержку и обеспечение стабильности инфраструктуры, гарантируя ее бесперебойную и безопасную работу. ' +
                'Вы можете пройти следующие курсынистрированию https://skillbox.ru/course/devops/?ysclid=lpswhvfysn702145901. Вы научитесь настраивать веб-серверы и поддерживать работу сайтов, диагностировать неполадки, пользоваться базами данных. Сможете начать карьеру системного администратора.';
        } else if (counts.c > counts.a && counts.c > counts.b && counts.c > counts.d) {
            resultText = "Вам подойдет свера Интернет вещей(IoT), если вы заинтересованы в создании и управлении устройствами, обменивающимися данными и оптимизирующими повседневные процессы.Работа в области IoT требует навыков работы с сенсорами, протоколами связи и анализа данных для создания встроенных систем, улучшающих жизнь людей и оптимизирующих рабочие процессы.Вы можете пройти эти курсы https://openedu.ru/course/ITMOUniversity/INTROIOT/?ysclid=lpsw4uvktg544412963. В рамках курса вы овладеете базовыми знаниями работы Интернета вещей и приобретете практический опыт разработки на базе устройств Arduino.";
        } else if (counts.d > counts.a && counts.d > counts.b && counts.d > counts.c) {
            resultText = "Работа в сфере кибербезопасности подходит вам, если вы заинтересованы в знаниях о сетевых уязвимостях, шифровании, мониторинге и реагировании на киберугрозы. Это требует умения распознавать угрозы, защищать данные и обеспечивать надежность в цифровой среде.Вы можете пройти эти курсы по кибербезопасности https://skillbox.ru/course/profession-cybersecurity/?ysclid=lpsw78dky2546949142 Вы разовьёте аналитическое мышление, научитесь искать уязвимости и обеспечивать безопасность IT-систем. Освоите востребованную профессию даже с нулевым опытом в IT.";
        }

        const resultElement = document.getElementById('resultText');
        const resultDiv = document.getElementById('result');

        // Проверяем, ответили ли на все вопросы, прежде чем отображать результат
        if (Object.keys(answers).length === 10 && resultElement && resultDiv) {
            resultElement.textContent = resultText;
            resultDiv.style.display = 'block';
        } else {
            console.error('Не все вопросы были отвечены, результат не может быть отображен.');
        }
    });
}
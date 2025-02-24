window.onload = function () {
    let a = '';
    let b = '';
    let expressionResult = '';
    let selectedOperation = null;

    // Окно вывода результата
    let outputElement = document.getElementById("result");

    // Список объектов кнопок циферблата (id которых начинается с btn_digit_)
    let digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');

    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if (digit !== '.' || (digit === '.' && !a.includes(digit))) {
                a += digit;
            }
            outputElement.innerHTML = a;
        } else {
            if (digit !== '.' || (digit === '.' && !b.includes(digit))) {
                b += digit;
                outputElement.innerHTML = b;
            }
        }
    }

    // Установка обработчиков событий для кнопок цифр
    digitButtons.forEach(button => {
        button.onclick = function () {
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        }
    });

    // Установка обработчиков событий для кнопок операций
    function setOperation(op) {
        if (a === '') return;
        selectedOperation = op;
    }

    document.getElementById("btn_op_mult").onclick = function () { setOperation('*'); };
    document.getElementById("btn_op_plus").onclick = function () { setOperation('+'); };
    document.getElementById("btn_op_minus").onclick = function () { setOperation('-'); };
    document.getElementById("btn_op_div").onclick = function () { setOperation('/'); };

    // Кнопка смены знака "+/-"
    document.getElementById("btn_op_sign").onclick = function () {
        if (!selectedOperation) {
            if (a !== '' && a !== '0') {
                a = (-parseFloat(a)).toString();
                outputElement.innerHTML = a;
            }
        } else {
            if (b !== '' && b !== '0') {
                b = (-parseFloat(b)).toString();
                outputElement.innerHTML = b;
            }
        }
    };

    //Кнопка "%"
    document.getElementById("btn_op_percent").onclick = function () {
        if (selectedOperation && b !== '') {
            b = ((parseFloat(a) * parseFloat(b)) / 100).toString();
            outputElement.innerHTML = b;
        }
    };

    //кнопка возведениея в "квадрат"
    document.getElementById("btn_op_step").onclick = function () {
        if (!selectedOperation && a !== '') {
            a = (parseFloat(a) ** 2).toString();
            outputElement.innerHTML = a;
        }
    };
    
    //кнопка нахождения квадратного кореня 
    document.getElementById("btn_op_sqrt").onclick = function () {
        if (!selectedOperation && a !== '') {
            a = Math.sqrt(parseFloat(a)).toString();
            outputElement.innerHTML = a;
        }
    };

    //Функция факториала
    function factorial(n) {
        if (n < 0) return "Ошибка"; // Факториал отрицательного числа не определён
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }
    
    //Кнопка нахождения факториала "!"
    document.getElementById("btn_op_factorial").onclick = function () {
        if (!selectedOperation && a !== '' && Number.isInteger(parseFloat(a))) {
            a = factorial(parseInt(a)).toString();
            outputElement.innerHTML = a;
        }
    };

     // Кнопка удаления последнего символа "←"
     document.getElementById("btn_op_backspace").onclick = function () {
        if (!selectedOperation) {
            a = a.slice(0, -1);
            outputElement.innerHTML = a || '0';
        } else {
            b = b.slice(0, -1);
            outputElement.innerHTML = b || '0';
        }
    };

    // Кнопка очищения "АC"
    document.getElementById("btn_op_clear").onclick = function () {
        a = '';
        b = '';
        selectedOperation = '';
        expressionResult = '';
        outputElement.innerHTML = 0;
    };

    // Кнопка расчёта результата "="
    document.getElementById("btn_op_equal").onclick = function () {
        if (a === '' || b === '' || !selectedOperation) return;

        switch (selectedOperation) {
            case '*':
                expressionResult = parseFloat(a) * parseFloat(b);
                break;
            case '+':
                expressionResult = parseFloat(a) + parseFloat(b);
                break;
            case '-':
                expressionResult = parseFloat(a) - parseFloat(b);
                break;
            case '/':
                if (parseFloat(b) === 0) {
                    outputElement.innerHTML = "Ошибка";
                    return;
                }
                expressionResult = parseFloat(a) / parseFloat(b);
                break;
        }

        a = expressionResult.toString();
        b = '';
        selectedOperation = null;

        outputElement.innerHTML = a;
    };
};
window.onload = function () {
    let a = '';
    let b = '';
    let expressionResult = '';
    let selectedOperation = null;

    // Окно вывода результата
    let outputElement = document.getElementById("result");

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
        };
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
                a = (-parseFloat(a)).toFixed(3);
                outputElement.innerHTML = a;
            }
        } else {
            if (b !== '' && b !== '0') {
                b = (-parseFloat(b)).toFixed(3);
                outputElement.innerHTML = b;
            }
        }
    };

    // Кнопка "%"
    document.getElementById("btn_op_percent").onclick = function () {
        if (a !== '') {
            let firstNumber = parseFloat(a);  // Первое число
            let secondNumber = parseFloat(b); // Второе число

            if (selectedOperation === null) {
                a = (firstNumber / 100).toString(); // 50% → 0.5
                outputElement.innerHTML = a;
            } 
            else if (!isNaN(secondNumber) && b !== '') {
                b = (firstNumber * (secondNumber / 100)).toString();
                outputElement.innerHTML = b;
            }
        }
    };
    
    
   // Кнопка возведения в "квадрат"
    document.getElementById("btn_op_step").onclick = function () {
        if (!selectedOperation && a !== '') {
            let squareResult = (parseFloat(a) ** 2);

            if (Number.isInteger(squareResult)) {
                outputElement.innerHTML = squareResult;
            } else {
                outputElement.innerHTML = squareResult.toFixed(3);
            }

            // Обновляем значение переменной a
            a = outputElement.innerHTML;
        }
    };


    // Кнопка нахождения квадратного корня
    document.getElementById("btn_op_sqrt").onclick = function () {
        if (!selectedOperation && a !== '') {
            let sqrtResult = Math.sqrt(parseFloat(a));

            if (Number.isInteger(sqrtResult)) {
                outputElement.innerHTML = sqrtResult;
            } else {
                outputElement.innerHTML = sqrtResult.toFixed(3);
            }

            // Обновляем значение переменной a
            a = outputElement.innerHTML;
        }
    };

    function factorial(n) {
        if (!Number.isInteger(n) || n < 0) {
            return "Ошибка"; 
        }
        
        if (n === 0 || n === 1) return 1;  // Факториал 0 и 1 равен 1
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
           
            if (result.toString().length > 15) {
                return "Большое число";  // Если результат слишком велик, возвращаем сообщение
            }
        }
        return result;
    }
    
    // Кнопка нахождения факториала "!"
    document.getElementById("btn_op_factorial").onclick = function () {
        if (!selectedOperation && a !== '') {
            let factResult = factorial(parseFloat(a));
            if (factResult === "Ошибка" || factResult === "Большое число") {
                outputElement.innerHTML = factResult; 
            } else {
                outputElement.innerHTML = factResult; 
            }
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

    // Кнопка очищения "AC"
    document.getElementById("btn_op_clear").onclick = function () {
        a = '';
        b = '';
        selectedOperation = '';
        expressionResult = '';
        outputElement.innerHTML = 0;
    };

    // Кнопка "=" для вычисления результата
    document.getElementById("btn_op_equal").onclick = function () {
        if (a !== '' && b !== '' && selectedOperation) {
            let firstNumber = parseFloat(a);
            let secondNumber = parseFloat(b);
            let result;
    
            switch (selectedOperation) {
                case '+':
                    result = firstNumber + secondNumber;
                    break;
                case '-':
                    result = firstNumber - secondNumber;
                    break;
                case '*':
                    result = firstNumber * secondNumber;
                    break;
                case '/':
                    if (secondNumber === 0) {
                        outputElement.innerHTML = "Ошибка";
                        return;
                    }
                    result = firstNumber / secondNumber;
                    break;
            }
    
            if (Number.isInteger(result)) {
                outputElement.innerHTML = result;  // Вывод целого числа
            } else {
                outputElement.innerHTML = result.toFixed(3);  // Вывод с 3 знаками после запятой
            }
    
            // Обновляем переменные для нового ввода
            a = result.toString();
            b = '';
            selectedOperation = null;
        }
    };
    

    // Кнопка расчёта высоты орбиты спутника
    document.getElementById("sputnik").onclick = function () {
        let velocity = parseFloat(a);  // Преобразуем строку в число

        if (isNaN(velocity) || velocity <= 0) {
            outputElement.innerHTML = "Ошибка";  // Если скорость некорректна
            return;
        }

        // Константы для расчёта
        const G = 6.674e-11;  // Гравитационная постоянная (м³/кг*с²)
        const M = 5.972e24;   // Масса Земли (кг)
        const R = 6.371e6;    // Радиус Земли (м)

        let orbitHeight = (G * M) / (velocity * velocity) - R;

        if (orbitHeight < 0 || isNaN(orbitHeight)) {
            outputElement.innerHTML = "Ошибка";  
            return;
        }

        if (Number.isInteger(orbitHeight)) {
            outputElement.innerHTML = `${orbitHeight / 1000} км`;
        } else {
            outputElement.innerHTML = `${(orbitHeight / 1000).toFixed(3)} км`;
        };
    };
};
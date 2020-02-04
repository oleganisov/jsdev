/* ДЗ 3 - работа с исключениями и отладчиком */

/*
 Задание 1:

 1.1: Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true только если fn вернула true для всех элементов массива

 1.2: Необходимо выбрасывать исключение в случаях:
   - array не массив или пустой массив (с текстом "empty array")
   - fn не является функцией (с текстом "fn is not a function")

 Зарпещено использовать встроенные методы для работы с массивами

 Пример:
   isAllTrue([1, 2, 3, 4, 5], n => n < 10) // вернет true
   isAllTrue([100, 2, 3, 4, 5], n => n < 10) // вернет false
 */
function isAllTrue(array, fn) {
    if (!Array.isArray(array) || array.length === 0) {
        throw 'empty array';
    } else if (typeof fn !== 'function') {
        throw 'fn is not a function';
    }
    let isFilter = true;

    for (let item of array) {
        if (fn(item) === false) {
            isFilter = false;
            break;
        }
    }

    return isFilter;
}

/*
 Задание 2:

 2.1: Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true если fn вернула true хотя бы для одного из элементов массива

 2.2: Необходимо выбрасывать исключение в случаях:
   - array не массив или пустой массив (с текстом "empty array")
   - fn не является функцией (с текстом "fn is not a function")

 Зарпещено использовать встроенные методы для работы с массивами

 Пример:
   isSomeTrue([1, 2, 30, 4, 5], n => n > 20) // вернет true
   isSomeTrue([1, 2, 3, 4, 5], n => n > 20) // вернет false
 */
function isSomeTrue(array, fn) {
    if (!Array.isArray(array) || array.length === 0) {
        throw 'empty array';
    } else if (typeof fn !== 'function') {
        throw 'fn is not a function';
    }

    let isFilter = false;

    for (let item of array) {
        if (fn(item) === true) {
            isFilter = true;
            break;
        }
    }

    return isFilter;
}

/*
 Задание 3:

 3.1: Функция принимает заранее неизветсное количество аргументов, первым из которых является функция fn
 Функция должна поочередно запустить fn для каждого переданного аргумента (кроме самой fn)

 3.2: Функция должна вернуть массив аргументов, для которых fn выбросила исключение

 3.3: Необходимо выбрасывать исключение в случаях:
   - fn не является функцией (с текстом "fn is not a function")
 */
function returnBadArguments(fn, ...rest) {
    if (typeof fn !== 'function') {
        throw 'fn is not a function';
    }

    let arrSource = [...rest];
    let arrBadArgs = [];

    for (let item of arrSource) {
        try {
            fn(item);
        } catch (e) {
            arrBadArgs.push(item);
        }
    }

    return arrBadArgs;
}

/*
 Задание 4:

 4.1: Функция имеет параметр number (по умолчанию - 0)

 4.2: Функция должна вернуть объект, у которого должно быть несколько методов:
   - sum - складывает number с переданными аргументами
   - dif - вычитает из number переданные аргументы
   - div - делит number на первый аргумент. Результат делится на следующий аргумент (если передан) и так далее
   - mul - умножает number на первый аргумент. Результат умножается на следующий аргумент (если передан) и так далее

 Количество передаваемых в методы аргументов заранее неизвестно

 4.3: Необходимо выбрасывать исключение в случаях:
   - number не является числом (с текстом "number is not a number")
   - какой-либо из аргументов div является нулем (с текстом "division by 0")
 */
function calculator(number = 0) {
    if (!isFinite(number)) {
        throw 'number is not a number';
    }

    let obj = {
        sum: function() {
            let sum = number;

            for (let i = 0; i < arguments.length; i++) {
                sum += arguments[i];
            }

            return sum;
        },
        dif: function() {
            let dif = number;

            for (let i = 0; i < arguments.length; i++) {
                dif -= arguments[i];
            }

            return dif;
        },
        div: function() {
            let div = number;

            for (let i = 0; i < arguments.length; i++) {
                if (arguments[i] === 0) {
                    throw 'division by 0';
                }
                div /= arguments[i];
            }

            return div;
        },
        mul: function() {
            let mul = number;

            for (let i = 0; i < arguments.length; i++) {
                mul *= arguments[i];
            }

            return mul;
        }
    };

    return obj;
}

/* При решении задач, пострайтесь использовать отладчик */

export { isAllTrue, isSomeTrue, returnBadArguments, calculator };

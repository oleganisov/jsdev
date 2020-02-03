/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    let arrayNew = [];

    for (let i = 0; i < array.length; i++) {
        arrayNew.push(fn(array[i], i, array));
    }

    return arrayNew;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    let prev = initial;

    for (let i = 0; i < array.length; i++) {
        if (initial === undefined && i === 0) {
            prev = array[i];
        } else {
            prev = fn(prev, array[i], i, array);
        }
    }

    return prev;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    let arrayKeys = Object.keys(obj),
        arrayKeysUpper = arrayKeys.map(item => item.toUpperCase());

    return arrayKeysUpper;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
    let arraySlice = [];
    let fromNew;
    let toNew;

    if (from === undefined) {
        fromNew = 0;
    } else if (from < 0) {
        fromNew = array.length + from;
    } else {
        fromNew = from;
    }

    if (to === undefined) {
        toNew = array.length;
    } else if (to < 0) {
        toNew = array.length + to;
    } else {
        toNew = to;
    }

    for (let i = 0; i < array.length; i++) {
        if (i >= fromNew && i < toNew) {
            arraySlice.push(array[i]);
        }
    }

    return arraySlice;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {}

export { forEach, map, reduce, upperProps, slice, createProxy };

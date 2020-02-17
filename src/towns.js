/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
    let url =
        'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';
    let resultPromise = fetch(url)
        .then(response => {
            if (!response.ok) {
                return Promise.reject('Не удалось загрузить города');
            }

            return response.json();
        })
        .then(json => {
            const towns = json.sort((a, b) => (a.name > b.name ? 1 : -1));

            loadingBlock.style.display = 'none';
            filterBlock.style.display = 'block';

            return towns;
        })
        .catch(error => {
            if (!document.querySelector('#btn-refetch')) {
                let divError = document.createElement('div'),
                    btnRefetch = document.createElement('button');

                divError.innerText = error;
                divError.id = 'error-block';
                btnRefetch.innerText = 'Повторить';
                btnRefetch.id = 'btn-refetch';
                btnRefetch.addEventListener('click', () => {
                    loadTowns();
                });

                homeworkContainer.appendChild(divError);
                homeworkContainer.appendChild(btnRefetch);
                loadingBlock.style.display = 'none';
            }
        });

    return resultPromise;
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    let cmpResult = full.toLowerCase().includes(chunk.toLowerCase());

    return cmpResult;
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

let resolvedPromise = loadTowns();

// window.addEventListener('load', () => {
//     resolvedPromise = loadTowns();
//     console.log(promise);
// });

filterInput.addEventListener('keyup', function(e) {
    resolvedPromise
        .then(array => {
            let newArray = array.filter(item =>
                isMatching(item.name, e.target.value)
            );

            return newArray;
        })
        .then(val => console.log(val));

    // const towns = loadTowns();
    // const fragment = document.createDocumentFragment();
    // const list = document.createElement('ul');
    // for (let town of towns) {
    //     const li = document.createElement('li');
    //     li.innerText = town.name;
    //     fragment.appendChild(li);
    // }
    // list.appendChild(fragment);
    // filterResult.appendChild(list);
    // это обработчик нажатия кливиш в текстовом поле
});

export { loadTowns, isMatching };

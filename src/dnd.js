/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    const div = document.createElement('div');

    div.classList.add('draggable-div');
    div.setAttribute('draggable', 'true');
    let divId = 'div' + Math.floor(Math.random() * 100);

    div.setAttribute('id', divId);
    div.style.border = '2px solid black';
    div.style.backgroundColor =
        '#' + Math.floor(Math.random() * 16777215).toString(16);
    div.style.height = Math.floor(Math.random() * 300) + 'px';
    div.style.width = Math.floor(Math.random() * 300) + 'px';
    div.style.top = Math.floor(Math.random() * 100) + 'px';
    div.style.left = Math.floor(Math.random() * 500) + 'px';
    div.style.position = 'absolute';

    return div;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */

function addListeners(target) {
    let handlerDragStart = e => {
        let box = target.getBoundingClientRect();

        e.target.style.opacity = '0.4';
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text', e.target.id);
        e.dataTransfer.setData('shiftX', e.clientX - box.x);
        e.dataTransfer.setData('shifty', e.clientY - box.y);
    };
    let handlerDragOver = e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };
    let handlerDragEnter = e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };
    let handlerDragEnd = e => {
        e.preventDefault();
        e.target.style.opacity = 1;
    };
    let handlerDrop = e => {
        e.preventDefault();
        let srcElemId = e.dataTransfer.getData('text');
        let srcElem = document.querySelector('#' + srcElemId);
        let coordX = -e.dataTransfer.getData('shiftX') + e.clientX;
        let coordY = -e.dataTransfer.getData('shiftY') + e.clientY;

        srcElem.style.left = coordX + 'px';
        srcElem.style.top = coordY + 'px';
        e.dataTransfer.clearData();
    };

    target.addEventListener('dragstart', handlerDragStart, false);
    target.addEventListener('dragend', handlerDragEnd, false);
    if (!target.parentNode.getAttribute('listener')) {
        target.parentNode.addEventListener(
            'dragenter',
            handlerDragEnter,
            false
        );
        target.parentNode.addEventListener('dragover', handlerDragOver, false);
        target.parentNode.addEventListener('drop', handlerDrop, false);
        target.parentNode.style.height = '100vh';
        target.parentNode.setAttribute('listener', 'true');
    }
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export { createDiv };

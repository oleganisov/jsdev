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
    div.style.backgroundColor =
        '#' + Math.floor(Math.random() * 16777215).toString(16);
    div.style.height = Math.floor(Math.random() * 100) + 'px';
    div.style.width = Math.floor(Math.random() * 500) + 'px';
    div.style.top = Math.floor(Math.random() * 100) + 'px';
    div.style.left = Math.floor(Math.random() * 100) + 'px';

    return div;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
let dragSrcEl = null;

function addListeners(target) {
    let handlerDragStart = e => {
        dragSrcEl = e.target;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', e.target.innerHTML);
        console.log(e.dataTransfer);

        return true;
    };
    let handlerDragEnter = e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';

        return true;
    };
    let handlerDragOver = e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';

        return false;
    };
    let handlerDrop = e => {
        // console.log('target', e.target, e);
        // console.log('dragSrc', dragSrcEl);
        e.stopPropagation();
        if (dragSrcEl != e.target) {
            dragSrcEl.innerHTML = e.target.innerHTML;
            e.target.innerHTML = e.dataTransfer.getData('text/html');
            console.log(e.dataTransfer);
        }

        return false;
    };

    target.addEventListener('dragstart', handlerDragStart, false);
    target.addEventListener('dragenter', handlerDragEnter, false);
    target.addEventListener('dragover', handlerDragOver, false);
    target.addEventListener('drop', handlerDrop, false);
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

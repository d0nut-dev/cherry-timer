//IOS fix
window.onresize = function() {
    document.body.height = window.innerHeight;
}
window.onresize();





// Model
let sessions;
let todaysSessions;
let passedSessions;


// Controller

// View
function addRangeInput(title, shortTitle ,min, max, value){
    const rangeCont = document.createElement('div');
    const rangeTitle = document.createElement('div');
    const rangeInput = document.createElement('input');

    rangeTitle.textContent = title;
    rangeInput.type = 'range';
    rangeInput.min = min;
    rangeInput.max = max;
    rangeInput.value = value;
    rangeInput.id = 'range-' + shortTitle;

    rangeCont.classList.add('conf-pm');

    rangeCont.appendChild(rangeTitle);
    rangeCont.appendChild(rangeInput);

    modalConfigsCont.appendChild(rangeCont);
}

function addWeekDayButton(num, shortName){
    const wdbutton = document.createElement('button');

    wdbutton.textContent = shortName;
    wdbutton.id = 'wdb-' + num;

    wdbutton.classList.add('add-weekday-btn');

    dayOfWeekContainer.appendChild(wdbutton);
}

const modalConfigsCont = document.createElement('div');
const dayOfWeekContainer = document.createElement('div');
function addSession(){
    const modalContainer = document.createElement('div');
    const formCont = document.createElement('form');

    const modalHeader = document.createElement('div');
    const modal = document.createElement('div');
    // const modalSubmit   = document.createElement('div');

    
    const confPmNumCont = document.createElement('div');
    const confPmNumContDesc = document.createElement('div');
    const confPmNumContInput = document.createElement('input');
    
    modalHeader.textContent = 'Add session';

    confPmNumContDesc.textContent = 'Num of Pomodoros:';
    confPmNumContInput.type = 'number';
    confPmNumContInput.id = 'input-pm-num';
    confPmNumContInput.min = 3;
    confPmNumContInput.max = 45;

    modalContainer.classList.add('modal-cont');
    formCont.classList.add('form-container');
    modal.classList.add('modal');
    modalHeader.classList.add('modal-head');
    modalConfigsCont.classList.add('modal-configs');
    confPmNumCont.classList.add('conf-pm-num');
    dayOfWeekContainer.classList.add('conf-pm-num');

    confPmNumCont.appendChild(confPmNumContDesc);
    confPmNumCont.appendChild(confPmNumContInput);

    modalConfigsCont.appendChild(confPmNumCont);

    addRangeInput('Time per Pomodoro', 'timeperpm', 10, 60, 25);
    addRangeInput('Short break', 'shortbreak', 1, 45, 5);
    addRangeInput('Long break', 'longbreak', 1, 45, 5);

    addWeekDayButton(0, 'sun');
    addWeekDayButton(1, 'mon');
    addWeekDayButton(2, 'tue');
    addWeekDayButton(3, 'wed');
    addWeekDayButton(4, 'thu');
    addWeekDayButton(5, 'fri');
    addWeekDayButton(6, 'sat');

    modalConfigsCont.appendChild(dayOfWeekContainer);
    modal.appendChild(modalHeader);
    modal.appendChild(modalConfigsCont);

    formCont.appendChild(modal);
    // formCont.appendChild(modalSubmit);
    modalContainer.appendChild(formCont);
    document.body.appendChild(modalContainer);
}

function render(){
    const plusButton = document.getElementById('pm-plus');
    plusButton.onclick = addSession;
}
render();
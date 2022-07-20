//IOS fix
window.onresize = function() {
    document.body.height = window.innerHeight;
}
window.onresize();
//
let sessions = [];
let todaysSessions = [];
let passedSessions = [];

let addSessionDaysOfWeek = [];
//
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

function addSessionChooseDays(ev){
    let wdbutton = ev.target;
    let num = wdbutton.dataset.dayOfWeek;
    if(!addSessionDaysOfWeek.includes(num)){
        addSessionDaysOfWeek.push(num);
        wdbutton.style.backgroundColor = 'rgb(78, 171, 211)';
    }
    else{
        addSessionDaysOfWeek = addSessionDaysOfWeek.filter((dayOfWeek)=>{
            return dayOfWeek !== num;
        });
        wdbutton.style.backgroundColor = 'white';
    }
}

function addWeekDayButton(num, shortName){
    const wdbutton = document.createElement('button');
    let currentDay = new Date().getDay();

    wdbutton.textContent = shortName;
    wdbutton.dataset.dayOfWeek = num;
    
    wdbutton.classList.add('add-weekday-btn');
    
    if(currentDay === num){
        addSessionDaysOfWeek.push(num);
        wdbutton.style.backgroundColor = 'rgb(78, 171, 211)';
    }
    dayOfWeekContainer.appendChild(wdbutton);

    wdbutton.onclick = addSessionChooseDays;
}

const modalConfigsCont = document.createElement('div');
const dayOfWeekContainer = document.createElement('div');

function addSession(){
    const modalContainer = document.createElement('div');
    const formCont = document.createElement('div');

    const modalHeader = document.createElement('div');
    const modal = document.createElement('div');
    const modalApply = document.createElement('div');

    const confPmNumCont = document.createElement('div');
    const confPmNumContDesc = document.createElement('div');
    const confPmNumContInput = document.createElement('input');
    
    const checkboxRepeatingCont = document.createElement('div');
    const checkboxRepeatingDesc = document.createElement('div');
    const checkboxRepeatingInput = document.createElement('input');

    const cancelButton = document.createElement('button');
    const applyButton = document.createElement('button');
    
    modalHeader.textContent = 'Add session';

    confPmNumContDesc.textContent = 'Num of Pomodoros:';
    confPmNumContInput.type = 'number';
    confPmNumContInput.id = 'input-pm-num';
    confPmNumContInput.min = 3;
    confPmNumContInput.max = 45;
    confPmNumContInput.value = 3;
    confPmNumContInput.oninput = function(){
        if(confPmNumContInput.value < confPmNumContInput.min){
            confPmNumContInput.value = confPmNumContInput.min;
        }
        else if(confPmNumContInput.value > confPmNumContInput.max){
            confPmNumContInput.value = confPmNumContInput.max;
        }
    }

    modalContainer.classList.add('modal-cont');
    formCont.classList.add('form-container');
    modal.classList.add('modal');
    modalHeader.classList.add('modal-head');
    modalConfigsCont.classList.add('modal-configs');
    confPmNumCont.classList.add('conf-pm-num');
    dayOfWeekContainer.classList.add('conf-dow-c');
    checkboxRepeatingCont.classList.add('conf-checkbox-cont');
    cancelButton.classList.add('modal-cancel-button');
    applyButton.classList.add('modal-apply-button');

    confPmNumCont.appendChild(confPmNumContDesc);
    confPmNumCont.appendChild(confPmNumContInput);

    modalConfigsCont.appendChild(confPmNumCont);

    addRangeInput('Time per Pomodoro', 'timeperpm', 10, 60, 25);
    addRangeInput('Short break', 'shortbreak', 1, 45, 5);
    addRangeInput('Long break', 'longbreak', 1, 45, 5);

    checkboxRepeatingDesc.textContent = 'Repeating';
    checkboxRepeatingInput.type = 'checkbox';
    checkboxRepeatingInput.id = 'conf-repeating';

    addWeekDayButton(0, 'Sun');
    addWeekDayButton(1, 'Mon');
    addWeekDayButton(2, 'Tue');
    addWeekDayButton(3, 'Wed');
    addWeekDayButton(4, 'Thu');
    addWeekDayButton(5, 'Fri');
    addWeekDayButton(6, 'Sat');

    cancelButton.textContent = 'Cancel';
    cancelButton.onclick = function(){
        dayOfWeekContainer.innerHTML = '';
        modalConfigsCont.innerHTML = '';
        document.body.removeChild(modalContainer);
    };
    applyButton.textContent = 'Add';
    applyButton.onclick = function(){
        let numOfPomodorosIn = document.getElementById('input-pm-num').value;
        let timePerPomodoroIn = document.getElementById('range-timeperpm').value;
        let shortbreakIn = document.getElementById('range-shortbreak').value;
        let longbreakIn = document.getElementById('range-longbreak').value;
        let isRepeatingIn = document.getElementById('conf-repeating').checked;
        sessions.push({
            numOfPomodoros: numOfPomodorosIn,
            timePerPomodoro: timePerPomodoroIn,
            shortBreakTime: shortbreakIn,
            longBreakTime: longbreakIn,

            isRepeating: isRepeatingIn,

            daysOfWeek: addSessionDaysOfWeek,
            
            finishedPomodoros: 0,

            isPaused: false,
            isBreak: false,
            pauseTime: '',

            startTime: '',
            finishTime: '',
            
            isFinished: '',
            isExpired: ''
        });

        dayOfWeekContainer.innerHTML = '';
        modalConfigsCont.innerHTML = '';
        document.body.removeChild(modalContainer);
    }

    checkboxRepeatingCont.appendChild(checkboxRepeatingDesc);
    checkboxRepeatingCont.appendChild(checkboxRepeatingInput);

    modalApply.appendChild(cancelButton);
    modalApply.appendChild(applyButton);
    modalConfigsCont.appendChild(checkboxRepeatingCont);
    modalConfigsCont.appendChild(dayOfWeekContainer);
    modal.appendChild(modalHeader);
    modal.appendChild(modalConfigsCont);

    formCont.appendChild(modal);
    formCont.appendChild(modalApply);

    modalContainer.appendChild(formCont);
    document.body.appendChild(modalContainer);
}

function render(){
    const plusButton = document.getElementById('pm-plus');
    plusButton.onclick = addSession;
}
render();
//IOS fix
window.onresize = function() {
    document.body.height = window.innerHeight;
}
window.onresize();
//
let sessions = [];
let currentSession;
let todaysSessions= [];
let passedSessions = [];

let addSessionDaysOfWeek = [];
//
function addRangeInput(title, shortTitle ,min, max, value){
    const rangeCont = document.createElement('div');
    const rangeTitle = document.createElement('div');
    const rangeInput = document.createElement('input');
    const rangeOutput = document.createElement('div');

    rangeTitle.textContent = title;
    rangeInput.type = 'range';
    rangeInput.id = 'range-' + shortTitle;
    rangeInput.min = min;
    rangeInput.max = max;
    rangeInput.value = value;

    rangeOutput.textContent = rangeInput.value;
    
    rangeInput.oninput = function(){
        rangeOutput.textContent = rangeInput.value;
    }
    
    rangeCont.classList.add('conf-pm');
    rangeOutput.classList.add('conf-pm-range-output');

    rangeCont.appendChild(rangeTitle);
    rangeCont.appendChild(rangeInput);
    rangeCont.appendChild(rangeOutput);

    modalConfigsCont.appendChild(rangeCont);
}

function addSessionChooseDays(ev){
    let wdbutton = ev.target;
    let num = Number(wdbutton.dataset.dayOfWeek);
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
    console.log(addSessionDaysOfWeek);
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
    const confPmNumContAlert = document.createElement('div');
    
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
    confPmNumContAlert.textContent = 'Enter number between 3 and 45.';

    modalContainer.classList.add('modal-cont');
    formCont.classList.add('form-container');
    modal.classList.add('modal');
    modalHeader.classList.add('modal-head');
    modalConfigsCont.classList.add('modal-configs');
    confPmNumCont.classList.add('conf-pm-num');
    confPmNumContAlert.classList.add('conf-pm-num-alert');
    dayOfWeekContainer.classList.add('conf-dow-c');
    checkboxRepeatingCont.classList.add('conf-checkbox-cont');
    cancelButton.classList.add('modal-cancel-button');
    applyButton.classList.add('modal-apply-button');

    confPmNumCont.appendChild(confPmNumContDesc);
    confPmNumCont.appendChild(confPmNumContInput);
    confPmNumCont.appendChild(confPmNumContAlert);

    modalConfigsCont.appendChild(confPmNumCont);

    addRangeInput('Time per Pomodoro', 'timeperpm', 10, 60, 25);
    addRangeInput('Short break', 'shortbreak', 1, 45, 5);
    addRangeInput('Long break', 'longbreak', 1, 45, 5);

    checkboxRepeatingDesc.textContent = 'Repeating';
    checkboxRepeatingInput.type = 'checkbox';
    checkboxRepeatingInput.id = 'conf-repeating';

    addSessionDaysOfWeek = [];
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
        let numOfPomodorosIn = document.getElementById('input-pm-num');
        let timePerPomodoroIn = document.getElementById('range-timeperpm').value;
        let shortbreakIn = document.getElementById('range-shortbreak').value;
        let longbreakIn = document.getElementById('range-longbreak').value;
        let isRepeatingIn = document.getElementById('conf-repeating').checked;

        if(numOfPomodorosIn.value < 3 || numOfPomodorosIn.value > 45){
            numOfPomodorosIn.style.borderColor = 'red';
            numOfPomodorosIn.style.borderWidth = '2px';
            confPmNumContAlert.style = 'display: block';
        }
        else{
            addSessionDaysOfWeek.forEach((dayOfWeek)=>{
                sessions.push({
                    sessionId: new Date().getTime() + '-' + dayOfWeek,
                    numOfPomodoros: numOfPomodorosIn.value,
                    timePerPomodoro: timePerPomodoroIn,
                    shortBreakTime: shortbreakIn,
                    longBreakTime: longbreakIn,
        
                    isRepeating: isRepeatingIn,
        
                    dayOfWeek: dayOfWeek,
                    
                    finishedPomodoros: 0,
        
                    isPaused: false,
                    isBreak: false,
                    pauseTime: '',
    
                    finishTime: '',
                    
                    isFinished: false,
                    isDelayed: false
                });
            });
            dayOfWeekContainer.innerHTML = '';
            modalConfigsCont.innerHTML = '';
            document.body.removeChild(modalContainer);
        }
        main();
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

function main(){
    const currentDay = new Date().getDay();

    const plusButton = document.getElementById('pm-plus');
    plusButton.onclick = addSession;

    const currentContainer = document.getElementById('todays-sessions-cont');
    const todaysContainer = document.getElementById('todays-cont');
    const passedContainer = document.getElementById('passed-cont');
    const delayedContainer = document.getElementById('delayed-cont');

    // sessions = sessions.filter((session)=>{
    //     session.daysOfWeek.forEach((dayOfWeek) => {
    //         console.log(typeof dayOfWeek);
    //         console.log(typeof currentDay);
    //         console.log(dayOfWeek === currentDay);
    //         console.log(session.isRepeating);
    //         if(dayOfWeek === currentDay && session.isRepeating === true){
    //             todaysSessions.push(session);
    //             return true;
    //         }
    //         else if(dayOfWeek === currentDay && session.isRepeating === false){
    //             if(session.daysOfWeek.length === 1){
    //                 todaysSessions.push(session);
    //                 return false;
    //             }
    //             else{
    //                 let nonRepeatingSession = session;
    //                 session.daysOfWeek = session.daysOfWeek.filter((dayOfWeek)=>{
    //                     console.log('0');
    //                     return dayOfWeek !== currentDay;
    //                 });
    //                 nonRepeatingSession.daysOfWeek = nonRepeatingSession.daysOfWeek.filter((dayOfWeek)=>{
    //                     console.log(dayOfWeek + ' ' + currentDay);
    //                     return dayOfWeek === currentDay;
    //                 });
    //                 console.log(nonRepeatingSession);
    //                 todaysSessions.push(nonRepeatingSession);
    //                 return true;
    //             }
    //         }
    //         else{
    //             return true;
    //         }
    //     });
    // });

    sessions = sessions.filter((session)=>{
        if(session.dayOfWeek === currentDay){
            todaysSessions.push(session);
            console.log(session.isRepeating);
            return session.isRepeating;
        }
        else return true;
    });

    let currentSessionCont = document.createElement('div');
    currentContainer.innerHTML = '';
    if(todaysSessions.length === 0){
        currentSessionCont.textContent = 'No sessions to start. Please, add new session.'
        // currentSessionCont.classList
        currentSessionCont.style = 'padding: 2em;'
    }
    else{
        currentSession = todaysSessions.pop();
        currentSessionCont.textContent = 'Wait for update';
    }
    currentContainer.appendChild(currentSessionCont);

    // passedSessions

}
main();
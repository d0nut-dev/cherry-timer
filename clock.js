// Clock
// ac
setInterval(()=>{
    const secondsHand = document.querySelector('.acl-seconds');
    const minutesHand = document.querySelector('.acl-minutes');
    const hoursHand = document.querySelector('.acl-hours');

    const time = new Date();
    const sec = time.getSeconds();
    const min = time.getMinutes();
    const hour = time.getHours();

    const degS = ((sec/60)*360);
    const degM = ((min/60)*360) + ((sec/60)*6);
    const degH = ((hour/12)*360) + ((min/60)*30);

    secondsHand.style.transform = `rotate(${degS}deg)`;
    minutesHand.style.transform = `rotate(${degM}deg)`;
    hoursHand.style.transform = `rotate(${degH}deg)`;
}, 1000);

// dc
setInterval(()=>{
    const dclContainer = document.querySelector('.dcl-time');

    const time = new Date().toLocaleTimeString();
    
    dclContainer.textContent = time;
}, 1000);

// timer
let numOfPomodoros = 3;
let timePerPomodoro = 1;

let miniBreakTime = 1;
let bigBreakTime = 1;

const timerContainer = document.querySelector('.cl-timer');

// timerContainer.textContent = timePerPomodoro + ':00';

function timeLeft(finishTime){
    const total = finishTime - Date.parse(new Date());
    const sec = Math.floor((total/1000)%60);
    const min = Math.floor((total/1000/60)%60);
    return{
        total,
        sec,
        min
    };
}

function leadingZero(un){
    return un < 10? '0' + un : un;
}

let finishedPomodoros = 0;
let isBreak = false;
let breakTime;
let firstRun = true;
let finishTime;

function pomodoroTimer(numOfPomodoros, timePerPomodoro, miniBreakTime, bigBreakTime){
    if(!isBreak){
        if(firstRun){
            let currentTime = new Date().getTime();
            finishTime = new Date(currentTime + timePerPomodoro*60*1000).getTime();
            firstRun = false;
        }

        let remainTime = timeLeft(finishTime);

        if(remainTime.total <= 0 && finishedPomodoros !== numOfPomodoros){
            finishedPomodoros++;
            isBreak = true;
            firstRun = true;
        }
        else if(remainTime.total <=0 && finishedPomodoros === numOfPomodoros){
            timerContainer.style.color = 'green';
            timerContainer.style.fontSize = '12px';
            timerContainer.textContent = `Congrats! You have finished ${finishedPomodoros} pomodoros!`;
        }
        else{
            timerContainer.style.color = 'lightcoral';
            timerContainer.textContent = leadingZero(remainTime.min) + ':' + leadingZero(remainTime.sec);
        }

    }
    else if (isBreak){
        if(finishedPomodoros === Math.floor(numOfPomodoros/2)){
            breakTime = miniBreakTime;
        }
        else if(finishedPomodoros === Math.floor(numOfPomodoros/2)){
            breakTime = bigBreakTime;
        }
        if(firstRun){
            let currentTime = new Date().getTime();
            finishTime = new Date(currentTime + breakTime*60*1000).getTime();
            firstRun = false;
        }

        let remainTime = timeLeft(finishTime);

        if(remainTime.total <=0){
            isBreak = false;
            firstRun = true;
        }
        else{
            timerContainer.style.color = 'green';
            timerContainer.textContent = leadingZero(remainTime.min) + ':' + leadingZero(remainTime.sec);
        }
    }
}

// pomodoroTimer(numOfPomodoros, timePerPomodoro, miniBreakTime, bigBreakTime);

const startButton = document.getElementById('timer-start');

var timerCheckFlag = false;
startButton.onclick = function(){
    pomodoroTimer(numOfPomodoros, timePerPomodoro, miniBreakTime, bigBreakTime);
    setInterval(pomodoroTimer, 1000, numOfPomodoros, timePerPomodoro, miniBreakTime, bigBreakTime);
}
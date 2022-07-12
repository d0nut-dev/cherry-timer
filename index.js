// Clock
// ac
let analogClock = setInterval(()=>{
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
let digitalClock = setInterval(()=>{
    const dclContainer = document.querySelector('.dcl-time');

    const time = new Date().toLocaleTimeString();
    
    dclContainer.textContent = time;
}, 1000);

// timer
let numOfPomodoros = 3;
let timePerPomodoro = 25;

let miniBreakTime = 5;
let bigBreakTime = 15;

const timerContainer = document.querySelector('.cl-timer');
timerContainer.textContent = timePerPomodoro + ':00';
//
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
//
let finishedPomodoros = 0;

let isBreak = false;
let pomodoroProcess = setInterval(()=>{
    if(!isBreak){
        let currentTime = new Date().getTime();
        let finishTime = new Date(currentTime + timePerPomodoro*60*1000).getTime();

        let remainTime = timeLeft(finishTime);
        if(remainTime <= 0 && finishedPomodoros !== numOfPomodoros){

        }
    }
    else if (isBreak){
        if(finishedPomodoros === Math.floor(numOfPomodoros/2)){
            let breakTime = miniBreakTime;
        }
        else if(finishedPomodoros === Math.floor(numOfPomodoros/2)){
            let breakTime = bigBreakTime;
        }

        let currentTime = new Date().getTime();
        let finishTime = new Date(currentTime + breakTime*60*1000).getTime();

        let remainTime = timeLeft(finishTime);

        timerContainer.style.color = 'green';
        timerContainer.textContent = remainTime.min + ':' + remainTime.sec;
    }
}, 1000);





// let remTime = timeLeft(finishTime);
//     timerContainer.textContent = leadingZero(remTime.min) + ':' + leadingZero(remTime.sec);
//     timerContainer.style.color = 'lightcoral';
    
//     if(remTime.total <= 0 && finishedPomodoros !== numOfPomodoros){
//         finishedPomodoros++;
//         console.log(finishedPomodoros/2);
//         if(finishedPomodoros === numOfPomodoros / 2){
//             var breakTime = bigBrakeTime;
//         }
//         else {
//             var breakTime = miniBreakTime;
//         }

//         currentTime = new Date().getTime();
//         finishTime = new Date(currentTime + breakTime*60*1000).getTime();
    
//         let breakTimeInterval = setInterval(()=>{
//             let remBreakTime = timeLeft(finishTime);
//             timerContainer.textContent = leadingZero(remBreakTime.min) + ':' + leadingZero(remBreakTime.sec);
//             timerContainer.style.color = 'green';
//             console.log(remBreakTime.total);
//             if(remBreakTime.total <= 0){
//                 console.log('OK')
//                 currentTime = new Date().getTime();
//                 finishTime = new Date(currentTime + timePerPomodoro*60*1000).getTime();

//                 clearInterval(breakTimeInterval);
//             }
//         }, 1000);
//     }
//     else if(remTime <= 0 && finishedPomodoros === numOfPomodoros)
//     {   
//         timerContainer.textContent+= 'Finish!';
//         timerContainer.style.color = 'green';
//         clearInterval(pomodoroProcess);
//     }
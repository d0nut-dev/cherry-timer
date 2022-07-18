//IOS fix
window.onresize = function() {
    document.body.height = window.innerHeight;
}
window.onresize();





// Model

// Controller

// View
function addSession(){
    const modalContainer = document.createElement('div');
    const modal = document.createElement('form');

    const modalBody = document.createElement('div');
    const modalButtons = document.createElement('div');

    const modalHeader = document.createElement('div');
    const modalConfigsCont = document.createElement('div');
    
    const confPmNumCont = document.createElement('div');
    const confPmNumContDesc = document.createElement('div');
    const confPmNumContInput = document.createElement('input');

    const confTimePerPm = document.createElement('div');
    const confTimePerPmDesc = document.createElement('div');
    const confTimePerPmInput = document.createElement('input');

    const confMiniBreak = document.createElement('div');
    const confMiniBreakDesc = document.createElement('div');
    const confMiniBreakInput = document.createElement('input');

    const confBigBreak = document.createElement('div');
    const confBigBreakDesc = document.createElement('div');
    const confBigBreakInput = document.createElement('input');
    
    modalHeader.textContent = 'Add session';

    confPmNumContDesc.textContent = 'Num of Pomodoros:';
    confPmNumContInput.type = 'number';
    confPmNumContInput.id = 'input-pm-num';
    confPmNumContInput.min = 3;
    confPmNumContInput.max = 45;

    confTimePerPmDesc.textContent = 'Time per Pomodoro';
    confTimePerPmInput.type = 'range';
    confTimePerPmInput.min = 10;
    confTimePerPmInput.max = 60;
    confTimePerPmInput.value = 25;

    confMiniBreakDesc.textContent = 'Short break';
    confMiniBreakInput.type = 'range';
    confMiniBreakInput.min = 1;
    confMiniBreakInput.max = 45;
    confMiniBreakInput.value = 5;

    confBigBreakDesc.textContent = 'Big break';
    confBigBreakInput.type = 'range';
    confBigBreakInput.min = 1;
    confBigBreakInput.max = 45;
    confBigBreakInput.value = 5;

    
    modalContainer.classList.add('modal-cont');
    modal.classList.add('modal');
    modalHeader.classList.add('modal-head');
    modalConfigsCont.classList.add('modal-configs');
    confPmNumCont.classList.add('conf-pm-num');
    confTimePerPm.classList.add('conf-pm');
    confMiniBreak.classList.add('conf-pm');
    confBigBreak.classList.add('conf-pm');

    confPmNumCont.appendChild(confPmNumContDesc);
    confPmNumCont.appendChild(confPmNumContInput);

    confTimePerPm.appendChild(confTimePerPmDesc);
    confTimePerPm.appendChild(confTimePerPmInput);

    confMiniBreak.appendChild(confMiniBreakDesc);
    confMiniBreak.appendChild(confMiniBreakInput);

    confBigBreak.appendChild(confBigBreakDesc);
    confBigBreak.appendChild(confBigBreakInput);
    
    modalConfigsCont.appendChild(confPmNumCont);
    modalConfigsCont.appendChild(confTimePerPm);
    modalConfigsCont.appendChild(confMiniBreak);
    modalConfigsCont.appendChild(confBigBreak);

    modalBody.appendChild(modalHeader);
    modalBody.appendChild(modalConfigsCont);

    modal.appendChild(modalBody);
    modal.appendChild(modalButtons);
    modalContainer.appendChild(modal);
    document.body.appendChild(modalContainer);
}

function render(){
    const plusButton = document.getElementById('pm-plus');
    plusButton.onclick = addSession;
}
render();
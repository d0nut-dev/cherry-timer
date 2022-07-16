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
    
    modalHeader.textContent = 'Add session';

    confPmNumContDesc.textContent = 'Num of Pomodoros: ';
    confPmNumContInput.type = 'number';
    confPmNumContInput.id = 'input-pm-num';
    confPmNumContInput.min = 3;
    confPmNumContInput.max = 45;

    confTimePerPmDesc.textContent = 'Time per Pomodoro';
    confTimePerPmInput.type = 'range';
    confTimePerPmInput.min = '10';
    confTimePerPmInput.max = '60';
    confTimePerPmInput.value = '25';
    
    modalContainer.classList.add('modal-cont');
    modal.classList.add('modal');
    modalHeader.classList.add('modal-head');
    modalConfigsCont.classList.add('modal-configs');
    confPmNumCont.classList.add('conf-pm');
    confTimePerPm.classList.add('conf-pm');

    confTimePerPm.appendChild(confTimePerPmDesc);
    confTimePerPm.appendChild(confTimePerPmInput);

    confPmNumCont.appendChild(confPmNumContDesc);
    confPmNumCont.appendChild(confPmNumContInput);
    
    modalConfigsCont.appendChild(confPmNumCont);
    modalConfigsCont.appendChild(confTimePerPm);

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
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
    const modal = document.createElement('div');
    
    const modalHeader = document.createElement('div');
    modalHeader.textContent = 'Add session';
    
    modalContainer.classList.add('modal-cont');
    modal.classList.add('modal');
    modalHeader.classList.add('modal-head');

    modal.appendChild(modalHeader);
    modalContainer.appendChild(modal);
    document.body.appendChild(modalContainer);
}

function render(){
    const plusButton = document.getElementById('pm-plus');
    plusButton.onclick = addSession;
}
render();
const roomIdElm = document.getElementById('room-id');
const userNameElm = document.getElementById('user-name');

function onSubmit(e) {
  e.preventDefault();
  location.href = `/room/${roomIdElm.value}?userName=${userNameElm.value}`;
}

window.onSubmit = onSubmit;

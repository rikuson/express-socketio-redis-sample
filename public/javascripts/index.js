const roomIdElm = document.getElementById('room-id');

function onSubmit(e) {
  e.preventDefault();
  const roomId = roomIdElm.value;
  location.href = `/room/${roomId}`;
}

window.onSubmit = onSubmit;


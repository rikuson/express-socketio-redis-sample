import { io } from 'https://cdn.socket.io/4.5.1/socket.io.esm.min.js';

const socket = io({
  query: { roomId: ROOM_ID },
});
socket.on('connect', () => {
  console.log('socket is connected');
});
socket.on('create-room', (room) => {
  console.log(`room ${room} was created`);
});
socket.on('join-room', (room, id) => {
  console.log(`socket ${id} has joined room ${room}`);
});
socket.on('message', (message) => {
  console.log(`subscribe: ${message}`);
  subscribing.value = message;
});

const publishing = document.getElementById('publishing');
const subscribing = document.getElementById('subscribing');

function onSubmit(e) {
  event.preventDefault();
  const val = publishing.value;
  console.log(`publish: ${val}`);
  socket.emit('message', val);
  publishing.value = '';
}

window.onSubmit = onSubmit;

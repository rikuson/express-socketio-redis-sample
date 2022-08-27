import { io } from 'https://cdn.socket.io/4.5.1/socket.io.esm.min.js';

const publishing = document.getElementById('publishing');
const subscribing = document.getElementById('subscribing');

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
socket.on('message', (msg) => {
  console.log(`subscribe: ${msg}`);
  addMessage(msg);
});

function onSubmit(e) {
  event.preventDefault();
  const val = publishing.value;
  console.log(`publish: ${val}`);
  socket.emit('message', val);
  publishing.value = '';
}

function addMessage(msg) {
  const div = document.createElement('div');
  div.className = 'p-2 border-b';
  const i = document.createElement('i');
  i.className = 'fa-solid fa-up-long mr-3 text-gray-400';
  div.append(i, msg);
  subscribing.append(div);
}

window.onSubmit = onSubmit;

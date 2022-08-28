import { io } from 'https://cdn.socket.io/4.5.1/socket.io.esm.min.js';

const publishing = document.getElementById('publishing');
const subscribing = document.getElementById('subscribing');

const socket = io({
  query: { roomId: ROOM_ID },
});
socket.on('connect', () => {
  log('down', 'connect', 'socket is connected');
});
socket.on('create-room', (room) => {
  log('down', 'create-room', `room ${room} was created`);
});
socket.on('join-room', (room, id) => {
  log('down', 'join-room', `socket ${id} has joined room ${room}`);
});
socket.on('message', (msg) => {
  log('down', 'message', msg);
});

function onSubmit(e) {
  event.preventDefault();
  const val = publishing.value;
  socket.emit('message', val);
  log('up', 'message', val);
  publishing.value = '';
}

function log(type, evt, msg) {
  const div = document.createElement('div');
  div.className = 'p-2 border-b';
  const i = document.createElement('i');
  i.className = `fa-solid fa-${type}-long mr-3 text-gray-400`;
  div.append(i, `${evt}: ${msg}`);
  subscribing.append(div);
}

window.onSubmit = onSubmit;

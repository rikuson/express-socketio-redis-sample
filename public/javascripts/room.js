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
  socket.emit('message', publishing.value);
  log('up', 'message', publishing.value);
  publishing.value = '';
}

function log(type, evt, msg) {
  const div = document.createElement('div');
  div.className = 'p-2 border-b overflow-hidden';
  const i = document.createElement('i');
  i.className = `fa-solid fa-${type}-long mr-3 text-gray-400`;
  const time = document.createElement('time');
  time.innerText = timeString(new Date);
  time.className = 'text-gray-400 float-right';
  div.append(i, `${evt}: ${msg}`, time);
  subscribing.append(div);
}

function timeString(date) {
  const ms = ('00' + date.getMilliseconds()).slice(-3);
  return `${date.toLocaleString('ja-JP')}.${ms}`;
}

window.onSubmit = onSubmit;

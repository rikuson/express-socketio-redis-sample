import { io } from 'https://cdn.socket.io/4.5.1/socket.io.esm.min.js';

const publishing = document.getElementById('publishing');
const subscribing = document.getElementById('subscribing');

const socket = io({
  query: { roomId: ROOM_ID },
});
log('up', `Try to connect socket with query: { roomId: ${ROOM_ID} }`);

socket.on('connect', () => {
  log('down', 'Socket is connected', 'connect');
});
socket.on('create-room', (room) => {
  log('down', `Room ${room} was created`, 'create-room');
});
socket.on('join-room', (room, id) => {
  log('down', `Socket ${id} has joined room ${room}`, 'join-room');
});
socket.on('message', (msg) => {
  log('down', msg, 'message');
});

function onSubmit(e) {
  event.preventDefault();
  socket.emit('message', publishing.value);
  log('up', publishing.value, 'message');
  publishing.value = '';
}

function log(type, msg, evt) {
  const div = document.createElement('div');
  div.className = 'p-2 border-b overflow-hidden';
  const i = document.createElement('i');
  i.className = `fa-solid fa-${type}-long mr-3 text-gray-400`;
  const time = document.createElement('time');
  time.innerText = timeString(new Date);
  time.className = 'text-gray-400 float-right';
  const span = document.createElement('span');
  span.className = 'bg-gray-600 text-white rounded px-2 py-1 mr-2 text-sm';
  span.innerText = evt;
  div.append(i, evt ? span : '', msg, time);
  subscribing.append(div);
}

function timeString(date) {
  const ms = ('00' + date.getMilliseconds()).slice(-3);
  return `${date.toLocaleString('ja-JP')}.${ms}`;
}

window.onSubmit = onSubmit;

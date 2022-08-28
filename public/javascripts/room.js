import { io } from 'https://cdn.socket.io/4.5.1/socket.io.esm.min.js';

const publishing = document.getElementById('publishing');
const subscribing = document.getElementById('subscribing');

const query = {
  roomId: ROOM_ID,
  userName: USER_NAME,
};
const socket = io({ query });
log({ type: 'up', msg: 'Try to connect socket', obj: query });

socket.on('connect', () => {
  log({ type:  'down', msg: 'Socket is connected', evt: 'connect' });
});
socket.on('create-room', (obj) => {
  const { room } =  obj;
  log({ type: 'down', msg: `Room ${room} was created`, obj, evt: 'create-room' });
});
socket.on('join-room', (obj) => {
  const { id, room } = obj;
  log({ type: 'down', msg: `Socket ${id} has joined room ${room}`, obj, evt: 'join-room' });
});
socket.on('message', (obj) => {
  const { userName, message } = obj;
  log({ type: 'down', msg: `${userName}'s message "${message}"`, obj, evt: 'message' });
});

function onSubmit(e) {
  event.preventDefault();
  const message = { message: publishing.value }
  socket.emit('message', message);
  log({ type: 'up', msg: 'Send message', obj: message, evt: 'message' });
  publishing.value = '';
}

function log({ type, msg, obj, evt }) {
  const div = document.createElement('div');
  div.className = 'p-2 border-b overflow-hidden leading-loose';
  const i = document.createElement('i');
  i.className = `fa-solid fa-${type}-long mr-2 text-${type === 'up' ? 'red' : 'emerald'}-400`;
  const time = document.createElement('time');
  time.innerText = timeString(new Date);
  time.className = 'text-gray-400 float-right text-sm leading-loose';
  const span = document.createElement('span');
  span.className = 'bg-gray-600 text-white rounded px-2 py-1 mr-2 text-sm';
  span.innerText = evt;
  const code = document.createElement('code');
  code.className = 'text-gray-400 text-sm ml-2';
  code.innerText = JSON.stringify(obj);
  div.append(i, evt ? span : '', msg, obj ? code : '', time);
  subscribing.append(div);
}

function timeString(date) {
  const ms = ('00' + date.getMilliseconds()).slice(-3);
  return `${date.toLocaleString('ja-JP')}.${ms}`;
}

window.onSubmit = onSubmit;

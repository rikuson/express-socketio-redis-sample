import { io } from 'https://cdn.socket.io/4.5.1/socket.io.esm.min.js';

const publishing = document.getElementById('publishing');
const subscribing = document.getElementById('subscribing');
const darkmodeSwitch = document.getElementById('darkmode-switch');

const query = {
  roomId: ROOM_ID,
  userName: USER_NAME,
};
const socket = io({ query });
log({ type: 'up', msg: 'Try to connect socket', data: query });

socket.on('connect', () => {
  log({ type:  'down', msg: 'Socket is connected', evt: 'connect' });
});
socket.on('create-room', (data) => {
  const { room } =  data;
  log({ type: 'down', msg: `Room ${room} was created`, data, evt: 'create-room' });
});
socket.on('join-room', (data) => {
  const { id, room, darkmode, users, rooms } = data;
  log({ type: 'down', msg: `Socket ${id} has joined room ${room}`, data, evt: 'join-room' });
  darkmodeSwitch.checked = darkmode;
  changeDarkmode(darkmode);
});
socket.on('message', (data) => {
  const { userName, message } = data;
  log({ type: 'down', msg: `Receive ${userName}'s message "${message}"`, data, evt: 'message' });
});
socket.on('darkmode', (data) => {
  const { darkmode } = data;
  log({ type: 'down', msg: `Change dark mode "${darkmode}"`, data, evt: 'darkmode' });
  darkmodeSwitch.checked = darkmode;
  changeDarkmode(darkmode);
});

function onSubmitMessage(e) {
  event.preventDefault();
  const data = { message: publishing.value }
  socket.emit('message', data);
  log({ type: 'up', msg: 'Send message', data, evt: 'message' });
  publishing.value = '';
}

function onToggleDarkmodeSwitch(e) {
  changeDarkmode(e.target.checked);
  const data = { darkmode: e.target.checked };
  log({ type: 'up', msg: 'Change darkmode', data, evt: 'darkmode' });
  socket.emit('darkmode', data);
}

function changeDarkmode(darkmode) {
  if (darkmode) {
    document.body.classList.add('dark')
  } else {
    document.body.classList.remove('dark')
  }
}

function log({ type, msg, data, evt }) {
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
  code.className = 'text-gray-400 text-sm ml-2 break-words italic';
  code.innerText = JSON.stringify(data);
  div.append(i, evt ? span : '', msg, data ? code : '', time);
  subscribing.append(div);
}

function timeString(date) {
  const ms = ('00' + date.getMilliseconds()).slice(-3);
  return `${date.toLocaleString('ja-JP')}.${ms}`;
}

window.onSubmitMessage = onSubmitMessage;
window.onClickMenu = openSidebar;
window.onCloseSidebar = closeSidebar;
window.onToggleDarkmodeSwitch = onToggleDarkmodeSwitch;

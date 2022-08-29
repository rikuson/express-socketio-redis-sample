import { io } from 'https://cdn.socket.io/4.5.1/socket.io.esm.min.js';

const publishing = document.getElementById('publishing');
const subscribing = document.getElementById('subscribing');
const menu = document.getElementById('menu');
const currentRoom = document.getElementById('current-room');
const roomList = document.getElementById('room-list');

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
  const { id, room, users, rooms } = obj;
  log({ type: 'down', msg: `Socket ${id} has joined room ${room}`, obj, evt: 'join-room' });

  currentRoom.innerHTML = users.map((user) => `
    <li class="p-3${user.id === socket.id ? ' font-bold' : ''}">
      <i class="fa-solid fa-user mr-2"></i>
      ${user.name}${user.id === socket.id ? ' (me)' : ''}
    </li>
  `).join('');

  roomList.innerHTML = rooms
    .filter((roomId) => roomId !== ROOM_ID && !users.some((user) => user.id === roomId))
    .map((roomId) => `
      <div class="border-b p-3">
        <a class="mr-3 hover:text-gray-500" href="/room/${roomId}?userName=${USER_NAME}">
          <i class="fa-solid fa-right-to-bracket"></i>
        </a>
        Room ${roomId}
      </div>
    `).join('');
});
socket.on('message', (obj) => {
  const { userName, message } = obj;
  log({ type: 'down', msg: `Receive ${userName}'s message "${message}"`, obj, evt: 'message' });
});

function submitMessage(e) {
  event.preventDefault();
  const message = { message: publishing.value }
  socket.emit('message', message);
  log({ type: 'up', msg: 'Send message', obj: message, evt: 'message' });
  publishing.value = '';
}

function openSidebar(e) {
  menu.style.right = '0px';
}

function closeSidebar(e) {
  menu.style.right = '-385px';
}

function toggleDarkmode(e) {
  if (e.target.checked) {
    document.body.classList.add('dark')
  } else {
    document.body.classList.remove('dark')
  }
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
  code.className = 'text-gray-400 text-sm ml-2 break-words italic';
  code.innerText = JSON.stringify(obj);
  div.append(i, evt ? span : '', msg, obj ? code : '', time);
  subscribing.append(div);
}

function timeString(date) {
  const ms = ('00' + date.getMilliseconds()).slice(-3);
  return `${date.toLocaleString('ja-JP')}.${ms}`;
}

window.onSubmitMessage = submitMessage;
window.onClickMenu = openSidebar;
window.onCloseSidebar = closeSidebar;
window.onToggleDarkmodeSwitch = toggleDarkmode;

import { io } from 'https://cdn.socket.io/4.5.1/socket.io.esm.min.js';
import LogTalk from './log-talk.js';

const logger = new LogTalk();
const publishing = document.getElementById('publishing');
const subscribing = document.getElementById('subscribing');
const darkmodeSwitch = document.getElementById('darkmode-switch');

const query = {
  roomId: ROOM_ID,
  userName: USER_NAME,
};
const socket = io({ query });
logger.info('Try to connect socket', query);

socket.on('connect', () => {
  logger.info('Socket is connected');
});
socket.on('create-room', (data) => {
  const { roomId } =  data;
  logger.info(`Room ${roomId} was created`);
});
socket.on('delete-room', (data) => {
  const { roomId } =  data;
  logger.info(`Room ${roomId} was deleted`);
});
socket.on('join-room', (data) => {
  const { id, roomId, darkmode, users, rooms } = data;
  logger.info(`Socket ${id} has joined room ${roomId}`);
  darkmodeSwitch.checked = darkmode;
  changeDarkmode(darkmode);
});
socket.on('message', (data) => {
  const { userName, message } = data;
  logger.info(`Receive ${userName}'s message "${message}"`);
  renderMessage(userName, message);
});
socket.on('darkmode', (data) => {
  const { darkmode } = data;
  logger.info(`Change dark mode "${darkmode}"`);
  darkmodeSwitch.checked = darkmode;
  changeDarkmode(darkmode);
});

function onSubmitMessage(e) {
  event.preventDefault();
  const data = { message: publishing.value }
  socket.emit('message', data);
  logger.info('Send message', 'message');
  publishing.value = '';
}

function onToggleDarkmodeSwitch(e) {
  changeDarkmode(e.target.checked);
  const data = { darkmode: e.target.checked };
  logger.info('Change darkmode', 'darkmode');
  socket.emit('darkmode', data);
}

function changeDarkmode(darkmode) {
  if (darkmode) {
    document.body.classList.add('dark')
  } else {
    document.body.classList.remove('dark')
  }
}

function renderMessage(userName, message) {
  const div = document.createElement('div');
  div.className = 'p-2 border-b overflow-hidden leading-loose';
  div.append(`${userName}: ${message}`);
  subscribing.append(div);
}

function timeString(date) {
  const ms = ('00' + date.getMilliseconds()).slice(-3);
  return `${date.toLocaleString('ja-JP')}.${ms}`;
}

window.onSubmitMessage = onSubmitMessage;
window.onToggleDarkmodeSwitch = onToggleDarkmodeSwitch;

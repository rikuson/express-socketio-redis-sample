module.exports = ((redis) => {
  const { SessionStore, Session } = require('./session-store.js')(redis);

  class RoomSessionStore extends SessionStore {
    static get PREFIX() {
      return 'room';
    }
  }

  class RoomSession extends Session {
    static get DEFAULT_STATE() {
      return { darkmode: true };
    };
  }

  return RoomSessionStore;
});

module.exports = ((redis) => {
  class SessionStore {
    static getKey(id) {
      return `${this.PREFIX}:${id}`;
    }

    static async find(id) {
      const key = this.getKey(id);
      const session = new Session(redis, key);
      const value = await redis.get(key);
      if (!value) {
        return false;
      }
      await session.setState(JSON.parse(value));
      return session;
    }

    static async create(id) {
      const session = new Session(redis, this.getKey(id));
      await session.setState({});
      return session;
    }

    static delete(id) {
      return redis.del(this.getKey(id));
    }
  }

  class Session {
    constructor(redis, key) {
      this.key = key;
      this.redis = redis;
      this.state = this.defaultState;
    }

    setState(state) {
      this.state = {
        ...this.state,
        ...state,
      };
      return this.redis.set(this.key, JSON.stringify(this.state));
    }
  }
  
  return { SessionStore, Session };
});

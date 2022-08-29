class SessionStore {
  constructor(redis) {
    this.redis = redis;
  }

  async find(prefix, id) {
    const key = `${prefix}:${id}`;
    const session = new Session(this.redis, key);
    const value = await this.redis.get(key);
    if (!value) {
      return false;
    }
    await session.setState(JSON.parse(value));
    return session;
  }

  create(prefix, id) {
    const key = `${prefix}:${id}`;
    return new Session(this.redis, key);
  }
}

class Session {
  constructor(redis, key) {
    this.key = key;
    this.redis = redis;
    this.state = {};
  }

  setState(state) {
    this.state = {
      ...this.state,
      ...state,
    };
    this.redis.set(this.key, JSON.stringify(this.state));
  }
}

module.exports = SessionStore;

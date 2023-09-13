const r = require('ioredis');

class Redis {
    static redis =  new r(process.env.REDIS_CONNECTION_STRING);

    static async hset(tableName, k, dataFN, FNArgs){
        const ttl = process.env.REDIS_TTL;
        const key = `${k}`; 
        // await this.redis.call('del',key)
        const cached = await this.redis.call('hget', tableName, key);
        if(cached){
          return JSON.parse(cached);
        } 
        const data = await dataFN(...FNArgs);
        await this.redis.call('hset', tableName, key, JSON.stringify(data));
        await this.redis.call('expire', hash, ttl);

        return data;
    }

    static async set(hash, field, data){
        
        const ttl = process.env.REDIS_TTL; 
        await this.redis.call('hset', hash, field, JSON.stringify(data));
        await this.redis.call('expire', hash, ttl);

        return data;
    }


    static async get(hash, field){
        //  await this.redis.call('del', hash)
        // await this.redis.call('flushall')
        const res = await this.redis.call('hget', hash, field);
        if(res)
            return JSON.parse(res);
        return null;
    }

    static async del(tableName){
        return this.redis.call('del',tableName);
    }
    static async hdel(tableName, key){
        return this.redis.call('hdel',tableName, key);
    }
    static async call(action,args){
        return this.redis.call(action, ...args);
    }
    static async jsonSet(tableName, key, data){
        const prop = `${key.replace}`
        return this.redis.call('JSON.SET', `${tableName}:${key}`, '.', `${data}`);
    }
    static async jsonGet(tableName, key){
        return this.redis.call('JSON.GET', `${tableName}:${key}`)
    }
}
module.exports = Redis;
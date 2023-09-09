const redis = require('redis')
const { promisify } = require('util')
const { REDIS_URL } = require('../util/config')

let getAsync
let setAsync

if (!REDIS_URL) {
  const redisIsDisabled = () => {
    console.log('No REDIS_URL set, Redis is disabled')
    return null
  }
  getAsync = redisIsDisabled
  setAsync = redisIsDisabled
} else {
  const client = redis.createClient({
    url: REDIS_URL
  }
  )

  client.ping((err, reply) => {
    if (err) {
      console.error('Error pinging Redis:', err);
    } else {
      if (reply === 'PONG') {
        console.log('Connected to Redis');
      } else {
        console.error('Failed to connect to Redis');
      }
    }
  });

  getAsync = promisify(client.get).bind(client)
  setAsync = promisify(client.set).bind(client)


  setAsync('key', 0)
  
}

module.exports = {
  getAsync,
  setAsync,
}
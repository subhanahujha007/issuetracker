import { Redis } from '@upstash/redis'

export const redisdb =()=> new Redis({
  url: process.env.NEXTURL,
  token: process.env.TOKEN,
})


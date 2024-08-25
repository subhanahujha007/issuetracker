import Redis from "ioredis"

 const getredisurl =()=> {
    if(process.env.NEXTURL){
        return process.env.NEXTURL
    }
else throw new Error("redis not configured")
 }
export const redis =new Redis(getredisurl())

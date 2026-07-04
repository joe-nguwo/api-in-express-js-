import { createClient } from "redis";

let redisConnect = null

try {
    redisConnect = createClient({
    url: "redis://localhost:6379",
  });
  await redisConnect.connect()
  console.log("redis connection established")
} catch (error) {
  console.log(`an error occured while connecting ${error}`);
}

export default redisConnect;

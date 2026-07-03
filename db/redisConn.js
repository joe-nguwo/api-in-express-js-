import { createClient } from "redis";

   const client = createClient({
    url: "redis://localhost:6379"
});

async function  redisConnect(){

    try {
          const conn =  await client.connect();
          console.log("connection succefully",conn)
        
    } catch (error) {
        console.log("error while connecting",error)
        
    }
 

}

export default redisConnect



  
    


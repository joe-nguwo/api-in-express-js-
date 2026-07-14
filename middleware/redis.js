import redisConnect from "../db/redisConn.js";

function CacheMiddleWare(ttl = 3600) {
   
    return async (req, res, next) => {

        if (req.method !== "GET") {
            return next();
        }

        const CacheKey = `cache:${req.originalUrl}`;

        try {

            const CachedData = await redisConnect.get(CacheKey);
            console.log("Cache checked");

            if (CachedData) {
                return res.status(200).json(JSON.parse(CachedData));
            }

            const originalJson = res.json.bind(res);

            res.json = (body) => {

                redisConnect
                    .setEx(CacheKey, ttl, JSON.stringify(body))
                    .catch(err => console.error(err));

                return originalJson(body);
               
            };

            next();

        } catch (error) {
            console.error(error);
            next();
        }
    };
}

export default CacheMiddleWare;
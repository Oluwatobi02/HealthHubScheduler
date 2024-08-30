import redis
r = redis.StrictRedis(host='healthhubscheduler-redis-1', port=6379, decode_responses=True)
import pymongo

def get_db():
    client = pymongo.MongoClient("mongodb://mongo-auth:27017")
    db_name =  "project"
    db = client[db_name]
    return db

from ..database import get_db
from datetime import datetime




db = get_db()



def create_message():
    now = str(datetime.now())
    msg = "Hello World, I've borned at: "+now
    db.helloWorld.insert_one({"message":msg})

def get_message():

    return db.helloWorld.find().limit(1).sort([('$natural',-1)])


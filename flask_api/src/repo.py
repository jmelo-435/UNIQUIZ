
from ..database import get_db
from datetime import datetime
import requests

db = get_db()

def create_message():
    now = str(datetime.now())
    msg = "Hello World, I've borned at: "+now
    db.helloWorld.insert_one({"message":msg})

def get_message():

    return db.helloWorld.find().limit(1).sort([('$natural',-1)])

def get_questions_from_db(num_of_questions):
    questions = list(db.questions.aggregate([
        { "$sample": { "size": int(num_of_questions) } },
        {"$unset":"_id"}
]))

    return questions

def create_question_on_db(question):
    db.questions.insert_one({"title":question["title"],
    "option1":question["option1"],
    "option2":question["option2"],
    "option3":question["option3"],
    "option4":question["option4"],
    "option5":question["option5"],
    "answer":question["answer"]})
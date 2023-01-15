from flask import jsonify,request
from .repo import create_message, get_message,create_question_on_db,get_questions_from_db


def test():
    return jsonify({"msg": "Auth API connected.", "sucess": True, "code": 200}), 200

def db_test():
    msg = list(get_message())[0]['message']
    return jsonify({"msg": "MongoDb connected.", "sucess": True, "code": 200, "payload": msg}), 200

def db_test_create():
    create_message()
    return jsonify({"sucess": True, "code": 200, "msg": "Mensagem Criada!"}), 200

def get_questions(number_of_questions):
    questions = get_questions_from_db(num_of_questions=number_of_questions)
    return jsonify({"sucess": True, "code": 200, "questions": questions}), 200

def create_question():
    question = request.json
    create_question_on_db(question)
    return jsonify({"sucess": True, "code": 200, "msg": "Pergunta criada!"}), 200
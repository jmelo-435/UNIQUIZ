from flask import jsonify
from .repo import create_message, get_message


def test():
    return jsonify({"msg": "Auth API connected.", "sucess": True, "code": 200}), 200


def db_test():
    msg = list(get_message())[0]['message']
    return jsonify({"msg": "MongoDb connected.", "sucess": True, "code": 200, "payload": msg}), 200


def db_test_create():
    create_message()
    return jsonify({"sucess": True, "code": 200, "msg": "Mensagem Criada!"}), 200

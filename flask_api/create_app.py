from flask import Flask
from .src.endpoints import test,db_test,db_test_create,get_questions,create_question

def create_app():
    application = Flask(__name__)
    application.debug = True
    application.add_url_rule('/api', 'test', test, methods=['OPTIONS','GET'])
    application.add_url_rule('/api/db_test', 'db_test', db_test, methods=['OPTIONS','GET'])
    application.add_url_rule('/api/db_test/create', 'db_test_create', db_test_create, methods=['OPTIONS','POST'])
    application.add_url_rule('/api/get_questions/<number_of_questions>', 'get_questions', get_questions, methods=['OPTIONS','GET'])
    application.add_url_rule('/api/question/create', 'create_question', create_question, methods=['OPTIONS','POST'])

       
    return application
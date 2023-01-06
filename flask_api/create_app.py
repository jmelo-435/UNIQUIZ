from flask import Flask
from .src.endpoints import test,db_test,db_test_create

def create_app():
    application = Flask(__name__)
    application.debug = True
    application.add_url_rule('/api', 'test', test, methods=['OPTIONS','GET'])
    application.add_url_rule('/api/db_test', 'db_test', db_test, methods=['OPTIONS','GET'])
    application.add_url_rule('/api/db_test/create', 'db_test_create', db_test_create, methods=['OPTIONS','POST'])
       
    return application
FROM python:3.7-slim

ENV CONTAINER_HOME=/var/www
COPY . $CONTAINER_HOME
WORKDIR $CONTAINER_HOME
EXPOSE 5001
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
ENV FLASK_APP=create_app.py
CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0", "--port=5001"]
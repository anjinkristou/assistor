FROM python:3.7

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

ENV FLASK_APP run.py

COPY . .

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]
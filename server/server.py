from flask import Flask
from api import api
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

@app.route('/query/<D>/<A>/<date>')
def query(D, A, date):
    return api.query(D, A, date)

if __name__ == "__main__":
    app.run()

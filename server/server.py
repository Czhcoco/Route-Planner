from flask import Flask
from api import api
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"
# def index():
#     response = flask.Response()
#     response.headers["Access-Control-Allow-Origin"] = "*"
#     return response

@app.route('/query/<D>/<A>/<date>')
def query(D, A, date):
    return api.query(D, A, date)

if __name__ == "__main__":
    app.run()

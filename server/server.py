# -*- coding: UTF-8 -*-
from flask import Flask, render_template
from api import api
app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')


@app.route('/query/<D>/<A>/<date>')
def query(D, A, date):
    return api.query(D, A, date)

if __name__ == "__main__":
    app.run()

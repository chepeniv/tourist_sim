#!/usr/bin/python3

from flask import Flask, abort, render_template
# from flask_cors import CORS, cross_origin // for backend


app = Flask(__name__)

@app.route('/', strict_slashes=False)
def landing_page():
    render_template('welcome.html')

if __name__ = '__main__'
    app.run(host='0.0.0.0', port='5000')


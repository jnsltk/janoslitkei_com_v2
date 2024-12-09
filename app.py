from flask import Flask, render_template
from flask_htmx import HTMX


app = Flask(__name__)
htmx = HTMX(app)


@app.route('/')
def home():  # put application's code here
    return render_template('index.html')


if __name__ == '__main__':
    app.run()

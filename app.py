from flask import Flask, render_template
from flask_htmx import HTMX


app = Flask(__name__)
htmx = HTMX(app)


@app.route('/')
def home():
    if htmx:
        return render_template('partials/partial_home.html')
    return render_template('index.html')

@app.route('/skills')
def skills():
    if htmx:
        return render_template('partials/partial_skills.html')
    return render_template('skills.html')


if __name__ == '__main__':
    app.run()

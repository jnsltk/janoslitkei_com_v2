from flask import Flask, render_template
from flask_htmx import HTMX


app = Flask(__name__)
htmx = HTMX(app)


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/skills/languages')
def languages():
    if htmx:
        return render_template('partials/skills/languages.html')
    return render_template('404.html')

@app.route('/skills/frameworks_tools')
def frameworks_tools():
    if htmx:
        return render_template('partials/skills/frameworks_tools.html')
    return render_template('404.html')


# Anything else is a 404
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

if __name__ == '__main__':
    app.run()

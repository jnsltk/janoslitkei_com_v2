import json
import os.path

from flask import Flask, render_template, request
from flask_htmx import HTMX

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__)
htmx = HTMX(app)


@app.route('/')
def home():
    try:
        projects = load_projects('university')
    except Exception as e:
        print(e)
        # will be 500 page
        return render_template('404.html'), 500
    return render_template('index.html', projects=projects)


@app.route('/projects')
def show_projects():
    if htmx:
        project_type = request.args.get('type')

        try:
            projects = load_projects(project_type)
        except Exception as e:
            print(e)
            # will be 500 page
            return render_template('404.html'), 500

        return render_template('partials/projects.html', projects=projects)
    return render_template('404.html'), 404


# Anything else is a 404
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404


def load_projects(category: str) -> []:
    json_content_path = os.path.join(ROOT_DIR, 'content', 'projects', 'projects.json')

    with open(json_content_path, 'r') as file:
        content = json.load(file)
    return content[category]


if __name__ == '__main__':
    app.run()

# app/home/views.py

from flask import render_template, current_app

from . import home


@home.route('/')
def homepage():
    """
    Render the homepage template on the / route
    """
    return render_template('home/index.html', title="Bikeshare", api_key=current_app.config['MAPS_API_KEY'])

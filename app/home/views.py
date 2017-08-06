# app/home/views.py

from flask import render_template, current_app

from . import home


@home.route('/')
def homepage():
    """
    Render the homepage template on the / route
    """
    return render_template('home/map.html', title="Bikeshare", api_key=current_app.config['MAPS_API_KEY'])


@home.route('/charts')
def homepage():
    """
    Render the homepage template on the /charts route
    """
    return render_template('home/charts.html', title="Bikeshare", api_key=current_app.config['MAPS_API_KEY'])

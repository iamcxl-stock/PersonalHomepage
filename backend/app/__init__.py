import os
import sys
currentUrl = os.path.dirname(__file__)
parentUrl = os.path.abspath(os.path.join(currentUrl, os.pardir))
sys.path.append(parentUrl)
sys.path.append(currentUrl)
from flask import Flask
from config import config
from flask_cors import CORS



def create_app(config_name):
    app = Flask(__name__, static_folder="../../dist/static", template_folder="../../dist")
    CORS(app, supports_credentials=True)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)


    from .api.main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    from .api.search import search as search_blueprint
    app.register_blueprint(search_blueprint, url_prefix='/search')

    from .api.login import login as login_blueprint
    app.register_blueprint(login_blueprint, url_prefix='/login')

    from .api.weather import weather as weather_blueprint
    app.register_blueprint(weather_blueprint, url_prefix='/weather')
    
    from .api.bookmarks import bookmarks as bookmarks_blueprint
    app.register_blueprint(bookmarks_blueprint, url_prefix='/bookmarks')

    from .api.console import console as console_blueprint
    app.register_blueprint(console_blueprint, url_prefix='/console')

    from .api.script import script as script_blueprint
    app.register_blueprint(script_blueprint, url_prefix='/script')

    from .api.privilege import privilege as privilege_blueprint
    app.register_blueprint(privilege_blueprint, url_prefix='/privilege')

    return app

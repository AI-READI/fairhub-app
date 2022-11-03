from flask_restx import Api

from .cats import api as cats
from .root import api as root

api = Api(
    title="Flask RestX Demo",
    version="1.0",
    description="A demo of Flask RestX deployed on Azure App Service",
)


api.add_namespace(cats)
api.add_namespace(root)

# Another way of doing it:
# api.add_namespace(ns2, path='/prefix/of/ns2')

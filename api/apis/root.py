from flask_restx import Namespace, Resource

api = Namespace("/", description="Root level operations")


@api.route("/")
class Index(Resource):
    def get(self):
        return "Hello!"


@api.route("/hello")
class Hello(Resource):
    def get(self):
        return "Hello World!"

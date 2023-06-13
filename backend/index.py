from dataclasses import dataclass
from flask import Flask, jsonify, request, render_template, redirect, flash
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from datetime import date
from datetime import datetime
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.secret_key = 'my_secret_key'

db = SQLAlchemy(app)


@dataclass
class User(db.Model):
    id: int
    username : str
    email: str
    firstname: str
    lastname:str
    fechaNac: date
    pais:str

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(80), unique = True, nullable = False) 
    email = db.Column(db.String(120), unique=True, nullable=False)
    firstname = db.Column(db.String(80), nullable = False)
    lastname = db.Column(db.String(80), nullable = False)
    fechaNac = db.Column(db.Date, nullable = False)
    pais = db.Column(db.String(80), nullable = False)

    def __repr__(self):
        return f'<User {self.username}>'


@dataclass
class Autor(db.Model):
    id: int
    firstname: str
    lastname: str
    fechaNac: date

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    firstname = db.Column(db.String(80), nullable = False)
    lastname = db.Column(db.String(80), nullable = False)
    fechaNac = db.Column(db.Date, nullable = False)

    mangas = db.relationship('Manga' , backref = 'autor' , lazy = True)
    
    def __repr__(self):
        return f'<Autor {self.id}>'


@dataclass
class Manga(db.Model):
    nombre:str
    edicion:int
    cant_stock : int
    genero : str
    autor_id : int

    nombre = db.Column(db.String(100) , primary_key = True)
    edicion = db.Column(db.Integer , primary_key = True)
    cant_stock = db.Column(db.Integer , nullable = False)
    genero = db.Column(db.String(100) , nullable = False)
    autor_id = db.Column(db.Integer , db.ForeignKey('autor.id'))

    def __repr__(self):
        return f'<Manga {self.nombre} , {self.edicion}>'




with app.app_context():
    db.create_all()





@app.route('/users', methods = ['GET' , 'POST'])
def route_users():
    if request.method == 'GET':
        users = User.query.all()
        return jsonify(users)
    
    elif request.method == 'POST':
        data = request.get_json()
        fecha_nac_string = data['fechaNac']
        fecha_nac = datetime.strptime(fecha_nac_string , '%Y-%m-%d').date()
        new_user = User(username = data['username'] , email = data['email'] , firstname = data['firstname'] ,  lastname = data['lastname'] , fechaNac = fecha_nac , pais = data['pais'] )
        db.session.add(new_user)
        db.session.commit()
        return 'SUCCESS'


@app.route('/users/<users_id>', methods=['GET', 'PUT', 'DELETE'])
def route_user_id(users_id):
    if request.method == 'GET':
        user = User.query.get_or_404(users_id)
        return jsonify(user)
    
    elif request.method == 'PUT':
        data = request.get_json()
        current_user = User.query.get_or_404(users_id)
        fecha_nac_string = data['fechaNac']
        fecha_nac = datetime.strptime(fecha_nac_string, '%Y-%m-%d').date()
        current_user.username = data['username']
        current_user.email = data['email']
        current_user.firstname = data['firstname']
        current_user.lastname = data['lastname']
        current_user.fechaNac = fecha_nac
        current_user.pais = data['pais']
        db.session.commit()
        return 'SUCCESS'
    
    elif request.method == 'DELETE':
        user = User.query.get_or_404(users_id)
        db.session.delete(user)
        db.session.commit()
        return 'SUCCESS'
    

if __name__ == '__main__':
    app.run(debug=True, port=5001)





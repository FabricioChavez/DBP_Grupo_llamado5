from market import db
from dataclasses import dataclass
from datetime import date
from flask_sqlalchemy import SQLAlchemy


@dataclass
class User(db.Model):
    id: int
    username: str
    email: str
    firstname: str
    lastname: str
    fechaNac: date
    pais: str

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    firstname = db.Column(db.String(80), nullable=False)
    lastname = db.Column(db.String(80), nullable=False)
    fechaNac = db.Column(db.Date, nullable=False)
    pais = db.Column(db.String(80), nullable=False)
    comentarios_u = db.relationship('Comentario', backref='comentario_user', lazy=True)

    def __repr__(self):
        return f'<User {self.username}>'


@dataclass
class Autor(db.Model):
    id: int
    firstname: str
    lastname: str
    fechaNac: date

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    firstname = db.Column(db.String(80), nullable=False)
    lastname = db.Column(db.String(80), nullable=False)
    fechaNac = db.Column(db.Date, nullable=False)

    mangas = db.relationship('Manga', backref='autor', lazy=True)
    compras_manga = db.relationship('Compra', backref='compra_user', lazy=True)

    def __repr__(self):
        return f'<Autor {self.id}>'


@dataclass
class Manga(db.Model):
    nombre: str
    edicion: int
    cant_stock: int
    genero: str
    autor_id: int

    nombre = db.Column(db.String(100), primary_key=True)
    edicion = db.Column(db.Integer, primary_key=True)
    cant_stock = db.Column(db.Integer, nullable=False)
    genero = db.Column(db.String(100), nullable=False)
    autor_id = db.Column(db.Integer, db.ForeignKey('autor.id'))
    comentarios_m = db.relationship('Comentario', backref='comentario_manga', lazy=True)
    compras_manga = db.relationship('Compra', backref='compra_manga', lazy=True)

    def __repr__(self):
        return f'<Manga {self.nombre}, {self.edicion}>'


@dataclass
class Comentario(db.Model):
    id: int
    contenido: str
    user_id: int
    manga_nombre: str
    manga_edicion: int
    id = db.Column(db.Integer, primary_key=True)
    contenido = db.Column(db.String(1000))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    manga_nombre = db.Column(db.String(100), db.ForeignKey('manga.nombre'))
    manga_edicion = db.Column(db.Integer, db.ForeignKey('manga.edicion'))

    def __repr__(self):
        return f'<Comentario {self.contenido}>'


@dataclass
class Compra:
    id_user = db.Column(db.Integer, db.ForeignKey('User.id'), primary_key=True)
    manga_nombre = db.Column(db.String(100), db.ForeignKey('Manga.nombre'), primary_key=True)
    manga_edicion = db.Column(db.Integer, db.ForeignKey('Manga.edicion'), primary_key=True)
    fecha = db.Column(db.Date)
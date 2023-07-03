import datetime
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
    fechaNac: str
    pais: str
    password: str
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    firstname = db.Column(db.String(80), nullable=False)
    lastname = db.Column(db.String(80), nullable=False)
    fechaNac = db.Column(db.String(10), nullable=False)
    pais = db.Column(db.String(80), nullable=False)
    password = db.Column(db.String(80), nullable=False)
    wallet = db.Column(db.Float)
    comentarios = db.relationship('Comentario', backref='user_a', lazy=True)
    compras_user = db.relationship('Compra', backref='user_b', lazy=True)
    profile_picture = db.relationship('User_pfp', backref='user_image', lazy=True)

    def __init__(self, username, email, firstname, lastname, fechaNac, pais, password , wallet):
        self.username = username
        self.email = email
        self.firstname = firstname
        self.lastname = lastname
        self.fechaNac = fechaNac
        self.pais = pais
        self.password = password
        self.wallet= wallet

    def __repr__(self):
        return f'<User {self.username}>'


class User_pfp(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))
    size = db.Column(db.Integer)
    data = db.Column(db.LargeBinary)
    user_id= db.Column(db.Integer, db.ForeignKey('user.id', ondelete="CASCADE") , nullable= False)

    def __repr__(self):
        return f"Image('{self.name}', '{self.size}', '{self.uploaded_at}')"




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

    def __repr__(self):
        return f'<Autor {self.id}>'


@dataclass
class Manga(db.Model):
    id: int
    nombre: str
    edicion: int
    cant_stock: int
    genero: str
    autor_id: int
    precio: float
    link: str

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    edicion = db.Column(db.Integer, nullable=False)
    cant_stock = db.Column(db.Integer, nullable=False)
    genero = db.Column(db.String(100), nullable=False)
    precio = db.Column(db.Float, nullable=False)
    link = db.Column(db.String(500), nullable=False, unique=True)
    autor_id = db.Column(db.Integer, db.ForeignKey('autor.id'))

    __table_args__ = (db.UniqueConstraint('nombre', 'edicion', name='identificadorManga'),)

    comentarios_m = db.relationship('Comentario', backref='manga', lazy=True,
                                    primaryjoin="and_(Manga.nombre == Comentario.manga_nombre, Manga.edicion == Comentario.manga_edicion)",
                                    foreign_keys="[Comentario.manga_nombre, Comentario.manga_edicion]")
    compras_manga = db.relationship('Compra', backref='manga', lazy=True,
                                    primaryjoin="and_(Manga.nombre == Compra.manga_nombre, Manga.edicion == Compra.manga_edicion)",
                                    foreign_keys="[Compra.manga_nombre, Compra.manga_edicion]")

    def __repr__(self):
        return f'<Manga {self.id},{self.nombre}, {self.edicion}>'


@dataclass
class Comentario(db.Model):
    id: int
    contenido: str
    user_id: int
    manga_nombre: str
    manga_edicion: int
    id = db.Column(db.Integer, primary_key=True)
    contenido = db.Column(db.String(1000), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    manga_nombre = db.Column(db.String(100), db.ForeignKey('manga.nombre', ondelete="CASCADE"), nullable=False)
    manga_edicion = db.Column(db.Integer, db.ForeignKey('manga.edicion', ondelete="CASCADE"), nullable=False)

    def __repr__(self):
        return f'<Comentario {self.contenido}>'


@dataclass
class Compra(db.Model):
    id: int
    id_user: int
    manga_nombre: str
    manga_edicion: int
    fecha: date

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_user = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    manga_nombre = db.Column(db.String(100), db.ForeignKey('manga.nombre', ondelete="CASCADE"), nullable=False)
    manga_edicion = db.Column(db.Integer, db.ForeignKey('manga.edicion', ondelete="CASCADE"), nullable=False)
    fecha = db.Column(db.Date, nullable=False)

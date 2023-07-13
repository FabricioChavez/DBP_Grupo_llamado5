from dataclasses import dataclass
from sqlalchemy import Column, Integer, String, ForeignKey, UniqueConstraint , Date  , Float , and_
from sqlalchemy.orm import relationship
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask import jsonify,request
import base64
from datetime import datetime
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:tarron35@localhost:5432/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


@dataclass
class User(db.Model):
    __tablename__ = 'user'

    id: int
    username: str
    email: str
    firstname: str
    lastname: str
    fechaNac: str
    pais: str
    password: str
    wallet: float

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(80), unique=True, nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    firstname = Column(String(80), nullable=False)
    lastname = Column(String(80), nullable=False)
    fechaNac = Column(String(10), nullable=False)
    pais = Column(String(80), nullable=False)
    password = Column(String(80), nullable=False)
    wallet = Column(Float)
    comentarios = relationship('Comentario', backref='user_a', lazy=True)
    compras_user = relationship('Compra', backref='user_b', lazy=True)
    profile_picture = relationship('User_pfp', backref='user_image', lazy=True)

    def __init__(self, username, email, firstname, lastname, fechaNac, pais, password, wallet):
        self.username = username
        self.email = email
        self.firstname = firstname
        self.lastname = lastname
        self.fechaNac = fechaNac
        self.pais = pais
        self.password = password
        self.wallet = wallet

    def __repr__(self):
        return f'<User {self.username}>'


@dataclass
class User_pfp(db.Model):
    __tablename__ = 'user_pfp'

    id = Column(Integer, primary_key=True)
    name = Column(String(128))
    size = Column(Integer)
    data = Column(db.LargeBinary)
    user_id = Column(Integer, ForeignKey('user.id', ondelete="CASCADE"), nullable=False, unique=True)

    def __repr__(self):
        return f"Image('{self.name}', '{self.size}', '{self.uploaded_at}')"


@dataclass
class Manga(db.Model):
    __tablename__ = 'manga'

    id: int
    nombre: str
    edicion: int
    cant_stock: int
    genero: str
    precio: float
    link: str

    id = Column(Integer, primary_key=True)
    nombre = Column(String(100), nullable=False)
    edicion = Column(Integer, nullable=False)
    cant_stock = Column(Integer, nullable=False)
    genero = Column(String(100), nullable=False)
    precio = Column(Float, nullable=False)
    link = Column(String(500), nullable=False, unique=True)
   
    __table_args__ = (UniqueConstraint('nombre', 'edicion', name='identificadorManga'),)

    comentarios_m = relationship('Comentario', backref='manga', lazy=True)
    compras_manga = relationship('Compra', backref='manga', lazy=True)

    def __repr__(self):
        return f'<Manga {self.id}, {self.nombre}, {self.edicion}>'


@dataclass
class Comentario(db.Model):
    __tablename__ = 'comentario'

    id: int
    contenido: str
    user_id: int
    manga_id: int

    id = Column(Integer, primary_key=True)
    contenido = Column(String(1000), nullable=False)
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    manga_id = Column(Integer, ForeignKey('manga.id'), nullable=False)

    def __repr__(self):
        return f'<Comentario {self.contenido}>'


@dataclass
class Compra(db.Model):
    __tablename__ = 'compra'

    id: int
    id_user: int
    manga_id: int
    fecha: Date

    id = Column(Integer, primary_key=True, autoincrement=True)
    id_user = Column(Integer, ForeignKey('user.id'), nullable=False)
    manga_id = Column(Integer, ForeignKey('manga.id'), nullable=False)
    fecha = Column(Date, nullable=False)

    def __repr__(self):
        return f'<Compra {self.id}, {self.manga_nombre}, {self.manga_edicion}>'


userCache = {}

with app.app_context():
    db.create_all()



@app.route('/upload/<user_id>', methods=['POST' , 'PUT'])
def upload(user_id):
    if request.method == 'POST':
        file = request.files['image']

 
        file_data = file.read()
        file_name = file.filename
        file_size = len(file_data)

       
        user_pfp = User_pfp(
            name=file_name,
            size=file_size,
            data=file_data,
            user_id=user_id
        )
       
        db.session.add(user_pfp)
        db.session.commit()

        return 'SUCCESS'
    elif request.method == 'PUT':

        file = request.files['image']
        file_data = file.read()
        file_name = file.filename
        file_size = len(file_data)


        user_pfp = User_pfp.query.filter_by(user_id=user_id).first()
        if user_pfp is not None:
        
            user_pfp.name = file_name
            user_pfp.size = file_size
            user_pfp.data = file_data

         
            db.session.commit()
            return 'SUCCESS'
        else:
           
            return 'ERROR: No existe imagen de perfil para este usuario'




@app.route('/image/<user_id>', methods=['GET'])
def get_image_data(user_id):
    image_data = User_pfp.query.filter_by(user_id=user_id).first()
    if image_data:
        image_data_dict = {
            'id': image_data.id,
            'name': image_data.name,
            'size': image_data.size,
            'data': base64.b64encode(image_data.data).decode('utf-8'),
            'user_id': image_data.user_id
        }
        return jsonify(image_data_dict)
    else:
        return jsonify(error='Image not found'), 404


@app.route('/signup', methods=['POST'])
def signup():
    username = request.json.get("username")
    email = request.json.get("email")
    firstname = request.json.get("firstname")
    lastname = request.json.get("lastname")
    fechaNac = request.json.get("fechaNac")
    pais = request.json.get("pais")
    password = request.json.get("password")
    wallet = request.json.get("wallet")

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "El correo electrónico ya está en uso"}), 409

    new_user = User(username=username, email=email, firstname=firstname, lastname=lastname, fechaNac=fechaNac,
                    pais=pais, password=password , wallet=wallet)
    
    db.session.add(new_user)

    db.session.commit()

    return jsonify({
        "id": new_user.id,
        "username": new_user.username,
        "email": new_user.email,
        "firstname": new_user.firstname,
        "lastname": new_user.lastname,
        "fechaNac": new_user.fechaNac,
        "pais": new_user.pais,
        "password": new_user.password
    })


@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    global userCache

    if (email in userCache.keys()):
        user = {
            "id": userCache[email]["id"],
            "username": userCache[email]["username"],
            "email": userCache[email]["email"],
            "firstname": userCache[email]["firstname"],
            "lastname": userCache[email]["lastname"],
            "fechaNac": userCache[email]["fechaNac"],
            "pais": userCache[email]["pais"],
            "password": userCache[email]["password"],
            "wallet": userCache[email]["wallet"]
        }

        if user is None:
            return jsonify({"error": "Unauthorized Access"}), 401

        if not (password == user["password"]):
            return jsonify({"error": "Unauthorized"}), 401

        print(userCache)
        return jsonify({
            "id": user["id"],
            "username": user["username"],
            "email": user["email"],
            "firstname": user["firstname"],
            "lastname": user["lastname"],
            "fechaNac": user["fechaNac"],
            "pais": user["pais"],
            "wallet": user["wallet"]
        })


    else:
        user = User.query.filter_by(email=email).first()

        if user is None:
            return jsonify({"error": "Unauthorized Access"}), 401

        if not (password == user.password):
            return jsonify({"error": "Unauthorized"}), 401

        userCache.update({
            email: {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "firstname": user.firstname,
                "lastname": user.lastname,
                "fechaNac": user.fechaNac,
                "pais": user.pais,
                "password": user.password,
                "wallet": user.wallet
            }
        })
        print(userCache)
        return jsonify({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "firstname": user.firstname,
            "lastname": user.lastname,
            "fechaNac": user.fechaNac,
            "pais": user.pais,
            "wallet": user.wallet
        })


@app.route('/users', methods=['GET', 'POST'])
def route_users():
    if request.method == 'GET':
        users = User.query.all()
        return jsonify(users)

    elif request.method == 'POST':
        data = request.get_json()
        fecha_nac_string = data['fechaNac']
        fecha_nac = datetime.strptime(fecha_nac_string, '%Y-%m-%d').date()
        new_user = User(username=data['username'], email=data['email'], firstname=data['firstname'],
                        lastname=data['lastname'], fechaNac=fecha_nac, pais=data['pais'], password=data['password'])
        db.session.add(new_user)
        db.session.commit()
        return 'SUCCESS'


@app.route('/users/<users_id>', methods=['GET', 'PUT', 'DELETE'])
def route_user_id(users_id):
    global userCache

    if request.method == 'GET':
        user = User.query.get_or_404(users_id)
        return jsonify(user)

    elif request.method == 'PUT':
        data = request.get_json()
        current_user = User.query.get_or_404(users_id)
        fecha_nac_string = data['fechaNac']
        fecha_nac = datetime.strptime(fecha_nac_string, '%Y-%m-%d').date()

        if current_user.email in userCache.keys():
            del userCache[current_user.email]

        current_user.username = data['username']
        current_user.email = data['email']
        current_user.firstname = data['firstname']
        current_user.lastname = data['lastname']
        current_user.fechaNac = fecha_nac
        current_user.pais = data['pais']
        current_user.wallet = data['wallet']

        db.session.commit()
        user=User.query.get_or_404(users_id)
        return jsonify(user)

    elif request.method == 'DELETE':
        user = User.query.get_or_404(users_id)
        db.session.delete(user)
        db.session.commit()
        return 'SUCCESS'





@app.route('/manga', methods=['GET', 'POST'])
def route_manga():
    if request.method == 'GET':
        mangas = Manga.query.all()
        return jsonify(mangas)


    elif request.method == 'POST':
        data = request.get_json()
        new_manga = Manga(nombre=data['nombre'], edicion=data['edicion'], cant_stock=data['cant_stock'],
                          genero=data['genero'] , precio=data['precio'], link=data['link'])

        db.session.add(new_manga)
        db.session.commit()
        return 'SUCCESS'


@app.route('/manga/by/<genre>', methods=['GET'])
def route_manga_by_genre(genre):
    manga = Manga.query.filter_by(genero=genre).all()
    return jsonify(manga)


@app.route('/manga/byn/<name>', methods=['GET'])
def route_manga_by_name(name):
    manga = Manga.query.filter_by(nombre=name).all()
    return jsonify(manga)


@app.route('/manga/<manga_id>', methods=['GET', 'PUT', 'DELETE'])
def route_manga_id(manga_id):

    if request.method == 'GET':
        manga = Manga.query.get_or_404(manga_id)
        return jsonify(manga)

    elif request.method == 'PUT':
        data = request.get_json()
        current_manga = Manga.query.get_or_404(manga_id)
        current_manga.nombre = data['nombre']
        current_manga.edicion = data['edicion']
        current_manga.cant_stock = data['cant_stock']
        current_manga.genero = data['genero']
        current_manga.precio = data['precio']
        current_manga.link = data['link']
        db.session.commit()
        return 'SUCCESS'

    elif request.method == 'DELETE':
        manga = Manga.query.get_or_404(manga_id)
        db.session.delete(manga)
        db.session.commit()
        return 'SUCCESS'


@app.route('/comentario', methods=['GET', 'POST'])
def route_comentario():
    if request.method == 'GET':
        comentarios = Comentario.query.all()
        return jsonify(comentarios)
    elif request.method == 'POST':
        data = request.get_json()
        new_comentario = Comentario(contenido=data['contenido'], user_id=data['user_id'], manga_id = data['manga_id'])
        db.session.add(new_comentario)
        db.session.commit()
        return 'SUCCESS'



@app.route('/comentario/by/<manga_id>', methods=['GET'])
def route_comentario_name(manga_id):
    comentarios = Comentario.query.filter_by(manga_id = manga_id).all()
    return jsonify(comentarios)


@app.route('/comentario/<comentario_id>', methods=['GET', 'PUT', 'DELETE'])
def route_comentario_id(comentario_id):
    if request.method == 'GET':
        comentario = Comentario.query.get_or_404(comentario_id)
        return jsonify(comentario)
    elif request.method == 'PUT':
        data = request.get_json()
        current_comentario = Comentario.query.get_or_404(comentario_id)
        current_comentario.contenido = data['contenido']
        current_comentario.user_id = data['user_id']
        current_comentario.manga_id = data['manga_id']
        db.session.commit()
        return 'SUCCESS'
    elif request.method == 'DELETE':
        comentario = Comentario.query.get_or_404(comentario_id)
        db.session.delete(comentario)
        db.session.commit()
        return 'SUCCESS'


@app.route('/compra', methods=['GET', 'POST'])
def route_compra():
    if request.method == 'GET':
        compras = Compra.query.all()
        return jsonify(compras)
    elif request.method == 'POST':
        data = request.get_json()
        fecha_string = data['fecha']
        fecha = datetime.strptime(fecha_string, '%Y-%m-%d').date()
        id_usuario = data['id_user']
        manga_id = data['manga_id']
        user = User.query.filter_by(id = id_usuario).first()
        wallet_user = user.wallet
        manga = Manga.query.filter_by(id = manga_id).first()
        precio = manga.precio
        stock = manga.cant_stock
        if wallet_user >= precio and stock > 0:
            new_compra = Compra(id_user=data['id_user'], manga_id = data['manga_id'], fecha=fecha)
            db.session.add(new_compra)
            db.session.commit()
            return 'SUCCESS'

        else:
            return 'NO SE PUEDE COMPRAR'

@app.route('/compra/<compra_id>', methods=['GET', 'PUT', 'DELETE'])
def route_compra_id(compra_id):
    if request.method == 'GET':
        compra = Compra.query.get_or_404(compra_id)
        return jsonify(compra)
    elif request.method == 'PUT':
        data = request.get_json()
        current_compra = Compra.query.get_or_404(compra_id)
        current_compra.id_user = data['id_user']
        current_compra.manga_id = data['manga_id']
        current_compra.fecha = datetime.strptime(data['fecha'], '%Y-%m-%d').date()
        db.session.commit()
        return 'SUCCESS'
    elif request.method == 'DELETE':
        compra = Compra.query.get_or_404(compra_id)
        db.session.delete(compra)
        db.session.commit()
        return 'SUCCESS'

@app.route('/compraUser/<user_id>', methods= ["GET"])
def get_compras_by_user_id(user_id):
    if request.method == 'GET':
        compras = Compra.query.filter_by(id_user = user_id).all()
        return jsonify(compras)



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)






from flask import Flask, request
from flask_cors import CORS
from controllers.board import delete_board, get_board_by_id, update_board
from controllers.item import delete_item, get_item_by_id, get_items, post_items, update_item
from controllers.board import get_boards, post_boards
from controllers.category import delete_category, get_categories, get_category_by_id, post_categories, update_category
from controllers.user import get_user_by_id, get_users, post_user, update_user
from controllers.login import login


from database import db



app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)



@app.route('/ping', methods=['GET'])
def ping():
    return 'pong'

################################

# * User

@app.route('/users', methods=['GET', 'POST'])
def route_users():
    if request.method == 'GET':
        return get_users()
    if request.method == 'POST':
        user = request.get_json()
        return post_user(user)

@app.route('/users/<player_id>', methods=['GET', 'DELETE', 'PUT'])
def route_user(player_id):
    if request.method == 'GET':
        return get_user_by_id(player_id)
    
    if request.method == 'PUT':
        user = request.get_json()
        return update_user(player_id,user)
    
################################
    
# * Categories

@app.route('/categories', methods=['GET', 'POST'])
def route_categories():
    if request.method == 'GET':
        return get_categories(request)
    if request.method == 'POST':
        category = request.get_json()
        return post_categories(category)

@app.route('/categories/<category_id>', methods=['GET', 'DELETE', 'PUT'])
def route_category(category_id):
    if request.method == 'GET':
        return get_category_by_id(category_id)
    if request.method == 'DELETE':
        return delete_category(category_id)
    if request.method == 'PUT':
        category = request.get_json()
        return update_category(category_id,category)
    

################################
    
# * Board

@app.route('/boards', methods=['GET', 'POST'])
def route_boards():
    if request.method == 'GET':
        return get_boards(request)
    if request.method == 'POST':
        board = request.get_json()
        return post_boards(board)

@app.route('/boards/<board_id>', methods=['GET', 'DELETE', 'PUT'])
def route_board(board_id):
    if request.method == 'GET':
        return get_board_by_id(board_id)
    if request.method == 'DELETE':
        return delete_board(board_id)
    if request.method == 'PUT':
        board = request.get_json()
        return update_board(board_id,board)

################################
    
# * Item

@app.route('/items', methods=['GET', 'POST'])
def route_items():
    if request.method == 'GET':
        return get_items(request)
    if request.method == 'POST':
        item = request.get_json()
        return post_items(item)

@app.route('/items/<item_id>', methods=['GET', 'DELETE', 'PUT'])
def route_item(item_id):
    if request.method == 'GET':
        return get_item_by_id(item_id)
    if request.method == 'DELETE':
        return delete_item(item_id)
    if request.method == 'PUT':
        item = request.get_json()
        return update_item(item_id,item)
    
################################    
    
# * Login

@app.route('/login', methods=['POST'])
def route_login():
    login_credentials = request.get_json()
    return login(login_credentials)

def handler():
    with app.app_context():
        db.create_all()
CORS(app)

    
    
handler()



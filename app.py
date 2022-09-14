import configparser
import flask
from bson import ObjectId
from flask import Flask, render_template, request, jsonify, redirect, url_for
from pymongo import MongoClient
import json

version = "0.0.1"

app = Flask(__name__)

config = configparser.ConfigParser()
config.read('config.ini')
config.set('systemSettings', 'version', version)


client = MongoClient('mongodb://localhost:27017/')
db = client["inventory"]
product = db["product"]
location = db["location"]


@app.route('/')
def index():
    return render_template('index.html', config=config)


@app.route('/error/<string:e>')
def error(e):
    return render_template('error.html', error=e)


@app.route('/add-product', methods=['GET','POST'])
def addProductPage():
    return render_template('add-product.html')

@app.route('/ajax-add-product',methods=['GET', 'POST'])
def addProduct():
    if request.method == "POST":
        data = request.get_json()
        data = {"_id": data['prod_id'] ,
                "prod_name": data['prod_name'],
                "price": data['price'],
                "quantity": data['quantity']}
        results = addtoDB(product,data)
    return jsonify(results)

@app.route('/edit-product',methods=['GET', 'POST'])
def editProductPage():
    return render_template('edit-product.html')


@app.route('/location')
def locationPage():
    data = fetchData(location)
    return render_template('location.html',data=data)

@app.route('/ajax-add-location',methods=['GET', 'POST'])
def addLocation():
    if request.method == "POST":
        data = request.get_json()
        # print(data)
        data = {"location_name": data['loc_name']}
        results = addtoDB(location,data)
    return jsonify(results)

@app.route('/remove-location',methods=['GET', 'POST'])
def removeLocation():
    if request.method == "POST":
        data = request.get_json()
        id = data['loc_id']
        results = removeFromDB(location,id)
    return jsonify(results)


def removeFromDB(table, id):
    try:
        x = table.delete_one({"_id": id})
        results = {'Result': 'Success'}
    except:
        results = {'Result': 'Failed'}
    return results


def updateProductPage():
    return


def addtoDB(table,data):
    try:
        table.insert_one(data)
        results = {'Result': 'Success'}
    except:
        results = {'Result': 'Failed'}
    return results

def fetchData(table):
    data = table.find()
    return (todo for todo in data)

if __name__ == "__main__":
    app.run(host="127.0.0.1",debug=True)
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient, ASCENDING,DESCENDING
from datetime import datetime
from random_forest_model import train_model, main

app = Flask(__name__)
CORS(app)

# Load the dataset
df = pd.read_csv('./data/rice.csv')
df.columns = df.columns.str.strip().str.replace(' ', '_').str.lower()
#Mongopw-SNjT4kQuWF6iSvFx
'''client = MongoClient('mongodb+srv://divypandey104:SNjT4kQuWF6iSvFx@cluster0.sutzu.mongodb.net/')
db = client.moistureRecord
collection = db.readings

collection.create_index([('timestamp', ASCENDING)])'''

model, feature_names, accuracy = train_model()

from flask import Flask, request, jsonify
from random_forest_model import main, get_soil_moisture  # Import get_soil_moisture

app = Flask(__name__)

from flask import Flask, request, jsonify
from random_forest_model import main, get_soil_moisture  # Import the main function and get_soil_moisture

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, methods=["GET", "POST", "OPTIONS"])
@app.route('/predict_pest', methods=['POST'])
def predict_pest():
    print('request reched to backend')
    data = request.json
    crop = data.get('crop')
    region = data.get('region')
    
    # Check if soil_moisture is provided; if not, call get_soil_moisture()
    soil_moisture = data.get('soil_moisture')
    if soil_moisture is None:
        soil_moisture = get_soil_moisture()  # Call function to get soil moisture data

    # Call the main function from random_forest_model with the extracted data
    print('Calling prediction')
    pest_prediction, infestation_chance = main(crop_input=crop, region_input=region, soil_moisture=soil_moisture)
    print('response ',pest_prediction,infestation_chance)

    # Return the prediction results to the frontend
    return jsonify({
        "pest_prediction": pest_prediction,
        "infestation_chance": infestation_chance
    }), 200

if __name__ == "__main__":
    app.run(debug=True)




'''@app.route('/update', methods=['POST'])
def update():
    data = request.get_json()
    if 'soil_moisture' in data:
        data['timestamp'] = datetime.utcnow()
        collection.insert_one(data)

        # Remove old entries if there are more than 100
        if collection.count_documents({}) > 100:
            # Find the oldest documents exceeding 100
            old_documents = collection.find().sort('timestamp', ASCENDING).limit(collection.count_documents({}) - 50)
            old_ids = [doc['_id'] for doc in old_documents]
            collection.delete_many({'_id': {'$in': old_ids}})

        # Get the latest moisture data
        latest_moisture = collection.find_one(sort=[('timestamp', DESCENDING)])['soil_moisture']

        return jsonify({'message': 'Data received', 'latestMoisture': latest_moisture}), 200
    return jsonify({'error': 'Invalid data'}), 400


@app.route('/get_latest_moisture', methods=['GET'])
def get_latest_moisture():
    # Fetch the latest 7 moisture readings sorted by timestamp (most recent first)
    latest_moisture_readings = collection.find({}, {'_id': 0, 'soil_moisture': 1}).sort('timestamp', DESCENDING).limit(7)
    
    # Convert the cursor to a list of moisture values
    moisture_values = [doc['soil_moisture'] for doc in latest_moisture_readings]

    return jsonify({'moisture': moisture_values}), 200

if __name__ == '__main__':
    app.run(debug=True)'''

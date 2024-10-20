import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient, ASCENDING,DESCENDING
from datetime import datetime
from random_forest_model import train_model, predict_pest_infestation

app = Flask(__name__)
CORS(app)

# Load the dataset
df = pd.read_csv('./data/chengalpattu_pests.csv')
df.columns = df.columns.str.strip().str.replace(' ', '_').str.lower()

'''client = MongoClient('mongodb+srv://divypandey110044:ThzFcHUqT9Va3aLS@cluster0.x0qe7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client.moistureRecord
collection = db.readings

collection.create_index([('timestamp', ASCENDING)])'''

model, feature_names, accuracy = train_model()

@app.route('/predict_pest', methods=['POST'])
def predict_pest():
    data = request.json
    crop = data.get('crop')

    # Default values for moisture, temperature, and weather condition
    moisture = 76  # Default moisture value
    temperature = 33  # Default temperature value
    weather_condition = "Sunny"  # Default weather condition

    if crop:
        # Predict pest infestation using the crop input
        pest_prediction = predict_pest_infestation(model, feature_names, crop=crop)

        print({"prediction in api": pest_prediction})
        return jsonify({"prediction": pest_prediction}), 200
    else:
        return jsonify({"error": "Crop input is required"}), 400


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

    return jsonify({'moisture': moisture_values}), 200'''

if __name__ == '__main__':
    app.run(debug=True)

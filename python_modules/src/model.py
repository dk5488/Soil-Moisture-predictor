from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import pandas as pd

from src.data_loader import load_all_data, preprocess_data

def train_model(data_folder='data/'):
    # Load and preprocess all data from CSV files
    data = load_all_data(data_folder)
    X, y = preprocess_data(data)
    
    # Split data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42, stratify=y)
    
    # Initialize and train RandomForest model
    rf_model = RandomForestClassifier(n_estimators=200, max_depth=10, random_state=42)
    rf_model.fit(X_train, y_train)
    
    # Evaluate the model
    y_pred = rf_model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    
    print("Features (X) shape:", X_train.shape)
    print("First few rows of features:\n", X_train.head())
    print("Data types of features:\n", X_train.dtypes)
    print("Target (y) shape:", y_train.shape)
    print("First few rows of target:\n", y_train.head())

    
    return rf_model, X.columns.tolist(), accuracy


def predict_pest_infestation(model, feature_names, crop, soil_moisture, weather_data):
    temperature, humidity, fetched_weather_condition = weather_data
    
    possible_conditions = [col for col in feature_names if 'Weather Condition' in col]
    
    from src.utils import compare_weather_conditions
    matched_weather_condition = compare_weather_conditions(fetched_weather_condition, possible_conditions)
    
    input_data = pd.DataFrame({
        'Suitable Moisture': [soil_moisture],
        'Suitable Temperature': [temperature],
        'Weather Condition_' + matched_weather_condition: [1],
        'Crop Infected_' + crop: [1]
    })
    
    for col in feature_names:
        if col not in input_data.columns:
            input_data[col] = 0
    
    input_data = input_data[feature_names]
    pest_prediction_prob = model.predict_proba(input_data)
    infestation_chance = max(pest_prediction_prob[0]) * 100
    pest_prediction = model.classes_[pest_prediction_prob.argmax()]
    
    return pest_prediction, infestation_chance

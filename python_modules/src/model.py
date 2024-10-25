from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import pandas as pd
from src.data_loader import load_all_data, preprocess_data

def preprocess_numeric_ranges(X):
    # Function to convert 'Low', 'Moderate', 'High' in 'Suitable Moisture' to numeric values
    def convert_moisture(moisture):
        if moisture == 'Low':
            return (0 + 300) / 2  # Average value for Low range
        elif moisture == 'Moderate':
            return (301 + 700) / 2  # Average value for Moderate range
        elif moisture == 'High':
            return (701 + 1023) / 2  # Average value for High range
        return None

    # Convert '15-25°C' format in 'Suitable Temperature' to the average temperature
    def convert_temperature(temp):
        if isinstance(temp, str) and '-' in temp:
            low, high = map(int, temp.replace('°C', '').split('-'))
            return (low + high) / 2
        return None

    # Apply conversion functions
    X['Suitable Moisture'] = X['Suitable Moisture'].apply(convert_moisture)
    X['Suitable Temperature'] = X['Suitable Temperature'].apply(convert_temperature)
    return X

def train_model(data_folder='data/'):
    # Load and preprocess all data from CSV files
    data = load_all_data(data_folder)
    X, y = preprocess_data(data)
    print("Data preprocessed successfully")
    
    # Print column names for debugging
    
    # Convert moisture and temperature columns to numeric ranges
    if 'Suitable Moisture' in X.columns and 'Suitable Temperature' in X.columns:
        X = preprocess_numeric_ranges(X)
    else:
        print("Error: 'Suitable Moisture' or 'Suitable Temperature' column not found in data.")
        return None, None, None
    
    # Handle missing values by filling with the median
    X.fillna(X.median(), inplace=True)
    
    # Split data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42, stratify=y)
    
    # Initialize and train RandomForest model
    rf_model = RandomForestClassifier(n_estimators=200, max_depth=10, random_state=42)
    rf_model.fit(X_train, y_train)
    
    # Evaluate the model
    y_pred = rf_model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    
    

    return rf_model, X.columns.tolist(), accuracy


def predict_pest_infestation(model, feature_names, crop, region, soil_moisture, weather_data):
    temperature, humidity, fetched_weather_condition = weather_data
    
    possible_conditions = [col for col in feature_names if 'Weather Condition' in col]
    
    from src.utils import compare_weather_conditions
    matched_weather_condition = compare_weather_conditions(fetched_weather_condition, possible_conditions)
    
    # Prepare input data as a DataFrame
    input_data = pd.DataFrame({
        'Suitable Moisture': [soil_moisture],
        'Suitable Temperature': [temperature],
        'Weather Condition_' + matched_weather_condition: [1],
        'Crop Infected_' + crop: [1],
        'Region_' + region: [1]
    })
    
    # Fill missing columns in input data with 0 to match feature_names
    for col in feature_names:
        if col not in input_data.columns:
            input_data[col] = 0
    
    # Ensure columns order matches model feature names
    input_data = input_data[feature_names]
    
    # Get probability predictions for pest infestation
    pest_prediction_prob = model.predict_proba(input_data)
    infestation_chance = max(pest_prediction_prob[0]) * 100
    pest_prediction = model.classes_[pest_prediction_prob.argmax()]
    
    return pest_prediction, infestation_chance

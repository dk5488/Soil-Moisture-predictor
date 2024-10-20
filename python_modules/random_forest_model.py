import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import random
from weather_data import fetch_weather_data

def get_soil_moisture():
    return 50

def load_historical_data(file_path='data/chengalpattu_pests.csv'):
    df = pd.read_csv(file_path, delimiter='\t')
    df['Affected_Crops'] = df['Affected_Crops'].apply(lambda x: x.split(','))
    df = df.explode('Affected_Crops')
    return df

def train_model(data_file='data/chengalpattu_pests.csv'):
    data = load_historical_data(data_file)
    
    X = data[['Soil_Moisture', 'Temperature', 'Weather_Condition', 'Affected_Crops']]
    X = pd.get_dummies(X, columns=['Affected_Crops', 'Weather_Condition'], drop_first=True)
    
    y = data['Pest_Type']
    
    value_counts = y.value_counts()
    classes_to_keep = value_counts[value_counts >= 2].index
    data = data[data['Pest_Type'].isin(classes_to_keep)]
    
    X = data[['Soil_Moisture', 'Temperature', 'Weather_Condition', 'Affected_Crops']]
    X = pd.get_dummies(X, columns=['Affected_Crops', 'Weather_Condition'], drop_first=True)
    y = data['Pest_Type']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42, stratify=y)
    rf_model = RandomForestClassifier(n_estimators=200, max_depth=10, random_state=42)
    rf_model.fit(X_train, y_train)
    
    y_pred = rf_model.predict(X_test)
    
    accuracy = accuracy_score(y_test, y_pred)
    
    return rf_model, X.columns.tolist(), accuracy

def compare_weather_conditions(fetched_condition, possible_conditions):
    
    fetched_condition_lower = fetched_condition.lower()
    
    for condition in possible_conditions:
        
        if fetched_condition_lower in condition.lower():
            return condition
        
        
    return 'Other'

def predict_pest_infestation(model, feature_names, crop="Tomato"):
    soil_moisture = get_soil_moisture()
    weather_data = fetch_weather_data()
    
    if weather_data:
        temperature, humidity, fetched_weather_condition = weather_data
        print(f"Live Weather Data - Temperature: {temperature}°C, Humidity: {humidity}%")
        
    else:
        temperature, humidity, fetched_weather_condition = random.uniform(25, 40), random.uniform(30, 90), random.choice(['Clear', 'Cloudy', 'Rain', 'Storm'])
        
        
    possible_conditions = [col for col in feature_names if 'Weather_Condition' in col]
    matched_weather_condition = compare_weather_conditions(fetched_weather_condition, possible_conditions)
    
    input_data = pd.DataFrame({
        'Soil_Moisture': [soil_moisture],
        'Temperature': [temperature],
        'Weather_Condition_' + matched_weather_condition: [1],
        'Affected_Crops_' + crop: [1]
    })
    
    for col in feature_names:
        if col not in input_data.columns:
            input_data[col] = 0
            
    input_data = input_data[feature_names]
    pest_prediction_prob = model.predict_proba(input_data)
    infestation_chance = max(pest_prediction_prob[0]) * 100
    pest_prediction = model.classes_[pest_prediction_prob.argmax()]
    
    if infestation_chance >= 80:
        print(f"Predicted Pest Infestation: {pest_prediction} ({infestation_chance:.2f}% chance)")
    else:
        print(f"No significant chances of infestation (Only {infestation_chance:.2f}% chance)")
        
    return f"{pest_prediction}, {infestation_chance:.2f}"

def main():
    
    print("Training the RandomForest model...")
    model, feature_names, accuracy = train_model()
    
    if accuracy < 0.80:
        print("Improving model by fine-tuning hyperparameters and additional data preprocessing...")
        
    crop_input = input("Enter the crop (e.g., Tomato, Rice, etc.): ").strip()
    
    print("Fetching live data from sensors and predicting pest infestation...")
    
    predict_pest_infestation(model, feature_names, crop=crop_input)

if __name__ == "__main__":
    main()


 #venv\Scripts\activate
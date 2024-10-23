from src.data_loader import load_all_data
from src.model import train_model, predict_pest_infestation
from src.weather_data import fetch_weather_data

def get_soil_moisture():
    return 50  # Placeholder for real sensor data

def main():
    print("Training the RandomForest model...")
    model, feature_names, accuracy = train_model()  # Train model with all CSVs from data directory
    
    if accuracy < 0.80:
        print(f"Model accuracy is {accuracy * 100:.2f}%. Fine-tuning might be needed.")
    
    crop_input = input("Enter the crop (e.g., Tomato, Rice, etc.): ").strip()
    soil_moisture = get_soil_moisture()
    weather_data = fetch_weather_data()  # Ensure this function returns (temperature, humidity, weather_condition)
    
    print("Fetching live data from sensors and predicting pest infestation...")
    pest_prediction, infestation_chance = predict_pest_infestation(model, feature_names, crop_input, soil_moisture, weather_data)
    
    if infestation_chance >= 80:
        print(f"Predicted Pest Infestation: {pest_prediction} ({infestation_chance:.2f}% chance)")
    else:
        print(f"No significant chances of infestation (Only {infestation_chance:.2f}% chance)")

if __name__ == "__main__":
    main()

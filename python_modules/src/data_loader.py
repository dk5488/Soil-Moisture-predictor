import os
import pandas as pd

def load_all_data(data_folder='data/'):
    # List all CSV files in the data folder
    csv_files = [f for f in os.listdir(data_folder) if f.endswith('.csv')]
    
    all_data = []
    for file in csv_files:
        file_path = os.path.join(data_folder, file)
        try:
            # Use 'on_bad_lines' to skip bad lines
            df = pd.read_csv(file_path, on_bad_lines='skip')  # Skips problematic lines
            df['Crop Infected'] = os.path.splitext(file)[0]  # Add the crop type based on the filename
            all_data.append(df)
        except pd.errors.ParserError as e:
            print(f"Error parsing {file}: {e}")
    
    # Concatenate all DataFrames into one
    combined_data = pd.concat(all_data, ignore_index=True)
    return combined_data

import pandas as pd

def preprocess_data(data):
    # Check column existence and handle missing values
    required_columns = ['Suitable Moisture', 'Suitable Temperature', 'Weather Condition', 'Crop Infected']
    for col in required_columns:
        if col not in data.columns:
            raise ValueError(f"Missing column in data: {col}")

    # Function to parse temperature ranges
    def parse_temperature(temp_str):
        if '-' in temp_str:
            temp_range = temp_str.split('-')
            return (float(temp_range[0].strip().replace('°C', '')) + float(temp_range[1].strip().replace('°C', ''))) / 2
        else:
            return float(temp_str.strip().replace('°C', ''))

    # Map Suitable Moisture to numerical values
    moisture_mapping = {
        'Low': 0,
        'Moderate': 1,
        'High': 2
    }
    data['Suitable Moisture'] = data['Suitable Moisture'].str.strip()  # Remove any leading/trailing whitespace
    data['Suitable Moisture'] = data['Suitable Moisture'].map(moisture_mapping)

    # Parse Suitable Temperature
    data['Suitable Temperature'] = data['Suitable Temperature'].apply(parse_temperature)

    # Prepare features (X) and target (y)
    X = data[['Suitable Moisture', 'Suitable Temperature', 'Weather Condition', 'Crop Infected']]

    # One-hot encode the Weather Condition and Crop Infected columns
    X = pd.get_dummies(X, columns=['Weather Condition', 'Crop Infected'], drop_first=True)

    # Target variable
    y = data['Name']  # Adjust this based on your actual target variable

    # Handle class imbalance by filtering classes with fewer than 2 occurrences
    value_counts = y.value_counts()
    classes_to_keep = value_counts[value_counts >= 2].index
    data = data[data['Name'].isin(classes_to_keep)]
    
    # Re-prepare X and y after filtering
    X = pd.get_dummies(data[['Suitable Moisture', 'Suitable Temperature', 'Weather Condition', 'Crop Infected']], 
                       columns=['Weather Condition', 'Crop Infected'], drop_first=True)
    y = data['Name']
    
    return X, y



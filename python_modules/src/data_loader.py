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
            df['Crop_Type'] = os.path.splitext(file)[0]  # Add the crop type based on the filename
            all_data.append(df)
        except pd.errors.ParserError as e:
            print(f"Error parsing {file}: {e}")
    
    # Concatenate all DataFrames into one
    combined_data = pd.concat(all_data, ignore_index=True)
    return combined_data

def preprocess_data(data):
    X = data[['Soil_Moisture', 'Temperature', 'Weather_Condition', 'Crop_Type']]
    X = pd.get_dummies(X, columns=['Crop_Type', 'Weather_Condition'], drop_first=True)
    
    y = data['Pest_Type']
    
    # Balancing the classes (optional step, depending on your dataset)
    value_counts = y.value_counts()
    classes_to_keep = value_counts[value_counts >= 2].index
    data = data[data['Pest_Type'].isin(classes_to_keep)]
    
    X = pd.get_dummies(data[['Soil_Moisture', 'Temperature', 'Weather_Condition', 'Crop_Type']], 
                       columns=['Crop_Type', 'Weather_Condition'], drop_first=True)
    y = data['Pest_Type']
    
    return X, y

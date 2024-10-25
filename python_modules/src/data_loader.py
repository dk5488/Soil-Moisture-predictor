import os
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import threading

def map_moisture_analog(moisture_level):
    moisture_level = moisture_level.strip().lower()
    if moisture_level == 'low':
        return (0 + 300) / 2   # Low moisture analog range
    elif moisture_level == 'moderate':
        return (301 + 700) / 2  # Moderate moisture analog range
    elif moisture_level == 'high':
        return (701 + 1023) / 2  # High moisture analog range (assuming max analog range of 1023)
    else:
        return None  # For any unexpected value

def load_all_data(data_folder='data/'):
    csv_files = [f for f in os.listdir(data_folder) if f.endswith('.csv')]
    all_data = []

    for file in csv_files:
        file_path = os.path.join(data_folder, file)
        try:
            df = pd.read_csv(file_path, on_bad_lines='skip')  # Skips problematic lines
            df['Crop Infected'] = os.path.splitext(file)[0]  # Add crop type based on filename
            if 'Region Found' not in df.columns:
                df['Region Found'] = 'Unknown'  # Default if Region is missing
            all_data.append(df)
        except pd.errors.ParserError as e:
            print(f"Error parsing {file}: {e}")

    combined_data = pd.concat(all_data, ignore_index=True)
    print('All data loaded successfully')
    return combined_data


def plot_data(data):
    plt.figure(figsize=(16, 12))

    # Plot 1: Suitable Moisture distribution
    plt.subplot(2, 2, 1)
    sns.histplot(data['Suitable Moisture'], kde=True, bins=15)
    plt.title('Distribution of Suitable Moisture')

    # Plot 2: Suitable Temperature distribution
    plt.subplot(2, 2, 2)
    sns.histplot(data['Suitable Temperature'], kde=True, bins=15)
    plt.title('Distribution of Suitable Temperature')

    # Plot 3: Weather Condition counts
    plt.subplot(2, 2, 3)
    sns.countplot(y=data['Weather Condition'])
    plt.title('Weather Condition Counts')

    # Plot 4: Crop Infected counts
    plt.subplot(2, 2, 4)
    sns.countplot(y=data['Crop Infected'])
    plt.title('Crop Infected Counts')

    # Adjust spacing between plots
    plt.subplots_adjust(wspace=0.4, hspace=0.4)

    # Show the plots
    plt.show()  # This will block until the plot window is closed

def async_plot(data):
    plot_thread = threading.Thread(target=plot_data, args=(data,))
    plot_thread.start()

def preprocess_data(data, target_column='Name'):
    required_columns = ['Suitable Moisture', 'Suitable Temperature', 'Weather Condition', 'Crop Infected', 'Region Found']
    for col in required_columns:
        if col not in data.columns:
            raise ValueError(f"Missing column in data: {col}")

    def parse_temperature(temp_str):
        if '-' in temp_str:
            temp_range = temp_str.split('-')
            return (float(temp_range[0].strip().replace('°C', '')) + float(temp_range[1].strip().replace('°C', ''))) / 2
        else:
            return float(temp_str.strip().replace('°C', ''))

    data['Suitable Moisture Analog'] = data['Suitable Moisture'].apply(map_moisture_analog)
    data = data[data['Suitable Moisture Analog'].notnull()]  # Drop rows with None in 'Suitable Moisture Analog'

    # Update temperature parsing using .loc to avoid SettingWithCopyWarning
    data.loc[:, 'Suitable Temperature'] = data['Suitable Temperature'].apply(parse_temperature)

    # Separate features for X before encoding
    X = data[['Suitable Moisture', 'Suitable Temperature', 'Weather Condition', 'Crop Infected', 'Region Found']]
    
    # Print X before encoding
    print("X before encoding:\n", X.head())

    # Call async plot function for visualization
    async_plot(data)

    # Encode categorical features after visualization
    X = pd.get_dummies(X, columns=['Weather Condition', 'Crop Infected', 'Region Found'], drop_first=True)
    
    # Print X after encoding
    print("X after encoding:\n", X.head())
    
    y = data[target_column]
    print('Columns:',y)

    value_counts = y.value_counts()
    classes_to_keep = value_counts[value_counts >= 2].index
    data = data[data[target_column].isin(classes_to_keep)]

    X = pd.get_dummies(data[['Suitable Moisture', 'Suitable Temperature', 'Weather Condition', 'Crop Infected', 'Region Found']], 
                       columns=['Weather Condition', 'Crop Infected', 'Region Found'], drop_first=True)

    y = data[target_column]

    return X, y
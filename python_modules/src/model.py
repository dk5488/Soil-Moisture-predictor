from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

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
    
    return rf_model, X.columns.tolist(), accuracy

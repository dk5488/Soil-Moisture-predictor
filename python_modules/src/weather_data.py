import random

def fetch_weather_data():
    # Simulated weather data; can be replaced with real API call
    temperature = random.uniform(25, 40)
    humidity = random.uniform(30, 90)
    fetched_weather_condition = random.choice(['Clear', 'Cloudy', 'Rain', 'Storm'])
    
    return temperature, humidity, fetched_weather_condition

import requests

# Replace with your actual Weatherbit.io API key
API_KEY = "164626be607e49c3bd511ef6e4390bf1"
city="Chennai"
# Function to fetch weather data from Weatherbit.io API using a city name
def fetch_weather_data():
    temperature = 33  # Generate a random temperature between 33 and 34
    humidity = 76  # Fixed humidity
    weather_condition = "Sunny"  # Fixed weather condition
    return temperature, humidity, weather_condition
    '''url = f"https://api.weatherbit.io/v2.0/current&city={city}&key={API_KEY}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()['data'][0]
        temperature = data['temp']
        humidity = data['rh']
        weather_condition = data['weather']['description']  # Get weather description
        return temperature, humidity, weather_condition
    else:
        print("Failed to fetch weather data")
        return None'''

# Example usage for Chennai
weather_data = fetch_weather_data()
if weather_data:
    temperature, humidity, condition = weather_data
    print(f"Temperature: {temperature}°C")
    print(f"Humidity: {humidity}%")
    print(f"Weather Condition: {condition}")

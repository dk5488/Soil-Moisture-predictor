import requests

def fetch_weather_data(city="Chennai", api_key="5bpzxnyu1aelosx8wpro27hpvp3pj9kss2t5e3mj"):
    base_url = f"https://www.meteosource.com/api/v1/free/point?place_id=Chennai&sections=all&timezone=UTC&language=en&units=metric&key=5bpzxnyu1aelosx8wpro27hpvp3pj9kss2t5e3mj
"
    
    try:
        response = requests.get(base_url)
        weather_data = response.json()
        if response.status_code == 200:
            temperature = weather_data['main']['temp']
            humidity = weather_data['main']['humidity']
            weather_condition = weather_data['weather'][0]['main']
            return temperature, humidity, weather_condition
        else:
            print(f"Error: {weather_data['message']}")
            return None
    except Exception as e:
        print(f"An error occurred: {e}")
        return None


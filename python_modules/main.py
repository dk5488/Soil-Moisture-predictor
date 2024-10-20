import random
import time
import requests
#import RPi.GPIO as GPIO
import time
'''
  # Set up GPIO pins
GPIO.setmode(GPIO.BCM)
sensor_pin = 18  # Replace with the actual GPIO pin connected to your sensor
GPIO.setup(sensor_pin, GPIO.IN)

def read_moisture():
    """Reads the moisture level from the sensor."""
    moisture_level = GPIO.input(sensor_pin)
    return moisture_level

while True:
    moisture = read_moisture()
    print("Moisture level:", moisture)
    time.sleep(1)  # Adjust the delay as needed
'''

def read_soil_sensor():
    # Simulate sensor data (soil moisture level)
    return random.uniform(0, 100)  # Random moisture level between 0% and 100%

while True:
    # Simulate reading from the soil sensor
    soil_moisture = read_soil_sensor()
    print(f"Moisture Level: {soil_moisture:.2f}%")
    
    # Send the data to the Flask server
    url = "http://127.0.0.1:5000/update"  # Flask server URL
    data = {'soil_moisture': soil_moisture}
    try:
        response = requests.post(url, json=data)
        print(f"Data sent to server, response: {response.status_code}")
    except Exception as e:
        print(f"Error sending data: {e}")

    time.sleep(100)  # Wait for 10 seconds before reading the sensor again

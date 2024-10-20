import Adafruit_DHT
import spidev
import time
import RPi.GPIO as GPIO

# Set up the DHT22 sensor
DHT_SENSOR = Adafruit_DHT.DHT22
DHT_PIN = 4  # GPIO pin connected to the DHT22 sensor data pin

# SPI setup for MCP3008 (Soil Moisture Sensor)
SPI_CHANNEL = 0  # Using CE0
SPI_SPEED = 1000000  # 1 MHz for fast communication

# Set up SPI interface for MCP3008
spi = spidev.SpiDev()
spi.open(0, SPI_CHANNEL)
spi.max_speed_hz = SPI_SPEED

def read_spi(channel):
    """Read the analog value from a specific MCP3008 channel."""
    adc = spi.xfer2([1, (8 + channel) << 4, 0])
    data = ((adc[1] & 3) << 8) + adc[2]
    return data

def get_soil_moisture():
    """Returns the moisture level from the soil moisture sensor."""
    raw_value = read_spi(0)  # Assuming soil sensor is connected to channel 0
    # Map the raw_value (0-1023) to a percentage (0-100%)
    moisture_percent = (raw_value / 1023.0) * 100
    return moisture_percent

def get_temperature_humidity():
    """Returns temperature and humidity from the DHT22 sensor."""
    humidity, temperature = Adafruit_DHT.read_retry(DHT_SENSOR, DHT_PIN)
    if humidity is not None and temperature is not None:
        return temperature, humidity
    else:
        return None, None

try:
    while True:
        # Measure soil moisture
        soil_moisture = get_soil_moisture()
        
        # Measure temperature and humidity
        temperature, humidity = get_temperature_humidity()

        if temperature is not None and humidity is not None:
            print(f"Temperature: {temperature:.1f}C, Humidity: {humidity:.1f}%")
        else:
            print("Failed to retrieve temperature and humidity data.")

        print(f"Soil Moisture: {soil_moisture:.2f}%")

        # Sleep for 5 seconds to reduce unnecessary load on sensors and CPU
        time.sleep(5)

except KeyboardInterrupt:
    pass
finally:
    spi.close()
    GPIO.cleanup()

#!/usr/bin/python
import RPi.GPIO as GPIO
from time import sleep
import paho.mqtt.client as mqtt #import the client1
import pigpio


def on_connect(client, userdata, flags, rc):
	print("Connected")
	print("Subscribing to topic","ibin/throw")
	client.subscribe("ibin/throw")
	client.publish(PRGM_LOGGING_CHANNEL , "main.py launched correctly" , 2 , True)

def on_message(client, userdata, msg):
	side = str(msg.payload.decode("utf-8"))
	print(msg.topic+" "+side)
	if side == "0":
		throwLeft()
	elif side == "2":
		throwRight()
	else:
		print("Input valid side.")

# # # #forward message to module subscribing to it
# def on_message(client, userdata, msg):
# 	topic = msg.topic
# 	payload_message = str(msg.payload.decode("utf-8"))
# 	print("New message on topic ",topic, payload)
# 	# if side == "0":
# 	# 	throwLeft()
# 	# elif side == "2":
# 	# 	throwRight()
# 	# else:
# 	# 	print("Input valid side.")

print("creating new instance")
client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.username_pw_set("bisavwqs","gspBl5b8VeTt")
client.connect("m21.cloudmqtt.com", 16973, 60)
client.loop_start()


#########################################
### Thrower

#!/usr/bin/env python


pi = pigpio.pi() # Connect to local Pi.


def throwLeft():
	print("Throwing left.")
	pi.set_servo_pulsewidth(18, 500)
	sleep(0.5)
	pi.set_servo_pulsewidth(18, 1250)
	sleep(0.5)
	pi.set_servo_pulsewidth(18, 0)

def throwRight():
	print("Throwing right.")
	pi.set_servo_pulsewidth(18, 2000)
	sleep(0.5)
	pi.set_servo_pulsewidth(18, 1250)
	sleep(0.5)
	pi.set_servo_pulsewidth(18, 0)

print("Got here")
try:
	pi.set_servo_pulsewidth(18, 1250)
	sleep(0.5)
	pi.set_servo_pulsewidth(18, 0)
except KeyboardInterrupt:
	pwm.stop()
	GPIO.cleanup()

#########################################
### FLAME


#GPIO SETUP
channel = 21
GPIO.setmode(GPIO.BCM)
GPIO.setup(channel, GPIO.IN)
 
def callback(channel):
	print("flame detected")
	client.publish("ibin/flame","1")
 
GPIO.add_event_detect(channel, GPIO.BOTH, bouncetime=300)  # let us know when the pin goes HIGH or LOW
GPIO.add_event_callback(channel, callback)  # assign function to GPIO PIN, Run function on change
 
while 1:
	try:
		sleep(1000)
	except KeyboardInterrupt:
		GPIO.cleanup()
		raise
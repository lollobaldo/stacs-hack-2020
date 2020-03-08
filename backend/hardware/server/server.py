import configparser, logging, os, sys
from time import sleep
import paho.mqtt.client as mqtt

from utils import my_logger
import modules.DHT as DHT
import modules.systemStats as SS
import modules.remoteCommands as RC
import modules.lights as LS

#read config from file
config = configparser.RawConfigParser()
config.read("config.ini")
PRGM_LOGGING_FILE    = config.get("MAIN", "prgm_logging_file")
PRGM_LOGGING_FORMAT  = config.get("MAIN", "prgm_logging_format")
PRGM_LOGGING_CHANNEL = config.get("MAIN", "prgm_logging_channel")


#read credentials
creds = configparser.RawConfigParser()
creds.read("credentials.ini")
MQTT_SERVER   = creds.get("MAIN","serv")
MQTT_USERNAME = creds.get("MAIN","user")
MQTT_PASSWORD = creds.get("MAIN","pswd")
MQTT_PORT     = creds.getint("MAIN","port")

#logging.basicConfig(format=PRGM_LOGGING_FORMAT, filename=PRGM_LOGGING_FILE,
#						level=logging.INFO)

#list of modules to initialise
modules_list = [DHT, SS, RC, LS]

#placeholders for subscriptions and error-dealing
subscribed_handlers = {}
at_exception = []

#setup modules
def setup():
	#client.subscribe()
	#load channels from modules
	for module in modules_list:
		module.setup(client)
		subscribed_handlers.update(module.TO_SUBSCRIBE)
		at_exception.append(module.cleanup)
	for key in subscribed_handlers.keys():
		client.subscribe(key)

#on MQTT connection
def on_connect(client, userdata, flags, rc):
	my_logger(client , PRGM_LOGGING_CHANNEL , "Connected with result code " + str(rc))
	client.publish(PRGM_LOGGING_CHANNEL , "main.py launched correctly" , 2 , True)
	setup()

#forward message to module subscribing to it
def on_message(client, userdata, msg):
	topic = str(msg.topic)
	payload_message = str(msg.payload.decode("utf-8"))
	my_logger(client , PRGM_LOGGING_CHANNEL , "Message received in topic " + topic + ": " + payload_message)
	subscribed_handlers[topic](payload_message)

#client log
def on_log(client, userdata, level, buf):
	my_logger(client , PRGM_LOGGING_CHANNEL , "Log: " + buf)
	pass

client = mqtt.Client()
client.username_pw_set(MQTT_USERNAME,MQTT_PASSWORD)
client.on_connect = on_connect
client.on_message = on_message
client.on_log     = on_log
client.connect(MQTT_SERVER,MQTT_PORT,60)
client.loop_start()

while 1:
	try:
		sleep(1000)
	except KeyboardInterrupt:
		for clean in at_exception:
			clean()
		raise
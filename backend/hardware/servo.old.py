import RPi.GPIO as GPIO
from time import sleep #import time

# servoPIN = 17
# GPIO.setmode(GPIO.BCM)
# GPIO.setup(servoPIN, GPIO.OUT)

# p = GPIO.PWM(servoPIN, 50) # GPIO 17 for PWM with 50Hz
# p.start(2.5) # Initialization
print("Setting up")

GPIO.setmode(GPIO.BCM)
GPIO.setup(18, GPIO.OUT)
# Now setup PWM on pin #3 at 50Hz
pwm=GPIO.PWM(18, 50)
# Then start it with 0 duty cycle so it doesn't set any angles on startup

pwm.start(0)

def setAngle(angle):
	duty = angle / 18 + 2
	GPIO.output(18, True)
	pwm.ChangeDutyCycle(duty)
	sleep(1)
	GPIO.output(18, False)
	pwm.ChangeDutyCycle(0)

# def setDuty(duty):
# 	GPIO.output(18, True)
# 	pwm.ChangeDutyCycle(duty)
# 	sleep(0.5)
# 	# GPIO.output(3, False)
# 	pwm.ChangeDutyCycle(0)

def throwLeft():
	print("Throwing left.")
	setAngle(160)
	sleep(1)
	setAngle(90)

def throwRight():
	print("Throwing right.")
	setAngle(20)
	sleep(1)
	setAngle(90)


try:
	# setDuty(40)

	# sleep(3)
	# setDuty(75)
	# sleep(3)
	# setDuty(95)

	# # sleep(2)

	# # setDuty(14)
	# #for i in range(10, 20):
	# 	# print(i/2)
	# 	# setDuty(i/2)
	# 	# sleep(3)
	# pwm.stop()
	# GPIO.cleanup()
	setAngle(90)
	while (True):
		side = input("Select side: ")
		if side == "l":
			throwLeft()
		elif side == "r":
			throwRight()
		else:
			print("Input valid side.")
except KeyboardInterrupt:          # trap a CTRL+C keyboard interrupt  
	pwm.stop()
	GPIO.cleanup()

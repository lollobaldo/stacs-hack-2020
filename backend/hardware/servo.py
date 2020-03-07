#!/usr/bin/env python

import time

import pigpio

pi = pigpio.pi() # Connect to local Pi.

# pi.set_servo_pulsewidth(18, 500)
# time.sleep(1)
# pi.set_servo_pulsewidth(18, 750)
# time.sleep(1)
# pi.set_servo_pulsewidth(18, 1000)
# time.sleep(1)
# pi.set_servo_pulsewidth(18, 1250)
# time.sleep(1)
# pi.set_servo_pulsewidth(18, 1500)
# time.sleep(1)
# pi.set_servo_pulsewidth(18, 1750)
# time.sleep(1)
# pi.set_servo_pulsewidth(18, 2000)
# time.sleep(1)

def throwLeft():
	print("Throwing left.")
	pi.set_servo_pulsewidth(18, 500)
	time.sleep(0.5)
	pi.set_servo_pulsewidth(18, 1250)
	time.sleep(0.5)
	pi.set_servo_pulsewidth(18, 0)

def throwRight():
	print("Throwing right.")
	pi.set_servo_pulsewidth(18, 2000)
	time.sleep(0.5)
	pi.set_servo_pulsewidth(18, 1250)
	time.sleep(0.5)
	pi.set_servo_pulsewidth(18, 0)


try:
	pi.set_servo_pulsewidth(18, 1250)
	time.sleep(0.5)
	pi.set_servo_pulsewidth(18, 0)
	while (True):
		side = input("Select side: ")
		if side == "l":
			throwLeft()
		elif side == "r":
			throwRight()
		else:
			print("Input valid side.")
except KeyboardInterrupt:
	pwm.stop()
	GPIO.cleanup()


# switch servo off
pi.set_servo_pulsewidth(18, 0)

pi.stop()
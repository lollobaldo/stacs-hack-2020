#!/usr/bin/env python

import time

import pigpio

pi = pigpio.pi() # Connect to local Pi.

pi.set_servo_pulsewidth(18, 1000)
time.sleep(0.5)
pi.set_servo_pulsewidth(18, 1500)
time.sleep(0.5)
pi.set_servo_pulsewidth(18, 2000)
time.sleep(0.5)
pi.set_servo_pulsewidth(18, 1500)
time.sleep(0.5)

# switch servo off
pi.set_servo_pulsewidth(18, 0)

pi.stop()
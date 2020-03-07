import RPi.GPIO as GPIO
from time import sleep #import time

# servoPIN = 17
# GPIO.setmode(GPIO.BCM)
# GPIO.setup(servoPIN, GPIO.OUT)

# p = GPIO.PWM(servoPIN, 50) # GPIO 17 for PWM with 50Hz
# p.start(2.5) # Initialization
print("Setting up")

GPIO.setup(3, GPIO.OUT)
# Now setup PWM on pin #3 at 50Hz

pwm=GPIO.PWM(3, 50)
# Then start it with 0 duty cycle so it doesn't set any angles on startup

pwm.start(0)

def SetAngle(angle):
	duty = angle / 18 + 2
	GPIO.output(3, True)
	p.ChangeDutyCycle(duty)
	sleep(1)
	GPIO.output(3, False)
	p.ChangeDutyCycle(0)

SetAngle(90) 
sleep(1)
SetAngle(0)
sleep(1)
SetAngle(180)

pwm.stop()
GPIO.cleanup()

# try:
#   while True:
#     print("Run cycle")
#     p.ChangeDutyCycle(5)
#     time.sleep(0.5)
#     p.ChangeDutyCycle(7.5)
#     time.sleep(0.5)
#     p.ChangeDutyCycle(10)
#     time.sleep(0.5)
#     p.ChangeDutyCycle(12.5)
#     time.sleep(0.5)
#     p.ChangeDutyCycle(10)
#     time.sleep(0.5)
#     p.ChangeDutyCycle(7.5)
#     time.sleep(0.5)
#     p.ChangeDutyCycle(5)
#     time.sleep(0.5)
#     p.ChangeDutyCycle(2.5)
#     time.sleep(0.5)
# except KeyboardInterrupt:
#   p.stop()
#   GPIO.cleanup()

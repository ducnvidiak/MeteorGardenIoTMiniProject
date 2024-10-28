#define fs1 13
#define fs2 12
#define fs3 14
#define fs4 27
#define lightSensor 2

int dTime = 15;
int dvSensor;
void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(lightSensor, INPUT); 
}
void star() {

}
void loop() {
  // put your main code here, to run repeatedly:
  dvSensor = digitalRead(lightSensor);
  Serial.println(dvSensor);
  if (dvSensor == 1) {
    for (int fadeValue = 0; fadeValue <= 255; fadeValue += 5) {
      analogWrite(fs1, fadeValue);
      delay(dTime);
    }
    for (int fadeValue = 255; fadeValue >= 0; fadeValue -= 5) {
      analogWrite(fs1, fadeValue);
      delay(dTime);
    }

    for (int fadeValue = 0; fadeValue <= 255; fadeValue += 5) {
      analogWrite(fs2, fadeValue);
      delay(dTime);
    }
    for (int fadeValue = 255; fadeValue >= 0; fadeValue -= 5) {
      analogWrite(fs2, fadeValue);
      delay(dTime);
    }


    for (int fadeValue = 0; fadeValue <= 255; fadeValue += 5) {
      analogWrite(fs3, fadeValue);
      delay(dTime);
    }
    for (int fadeValue = 255; fadeValue >= 0; fadeValue -= 5) {
      analogWrite(fs3, fadeValue);
      delay(dTime);
    }


    for (int fadeValue = 0; fadeValue <= 255; fadeValue += 5) {
      analogWrite(fs4, fadeValue);
      delay(dTime);
    }
    for (int fadeValue = 255; fadeValue >= 0; fadeValue -= 5) {
      analogWrite(fs4, fadeValue);
      delay(dTime);
    }
  }
}

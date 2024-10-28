#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ArduinoJson.h>

#include <DHT.h>
#include <RTClib.h>


#define pinGround A0
#define pinSiren D8
#define pinDHT D6
#define pinRain D7
#define pinRelay D0
#define pinGardenLight D4
#define pinGardenWarm D3

// statusPins = [D8, D0, D4, D3]; pinSiren - pinRelay - pinGardenLight - pinGardenWarn

#define DHTTYPE DHT11

DHT dht(pinDHT, DHTTYPE);
RTC_DS1307 DS1307_RTC;

const char* ssid = "Huynh Duc Chinh";
const char* password = "123123123";
ESP8266WebServer server(80);

char Week_days[7][12] = { "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" };

float t = 0.0;  // temperature
float h = 0.0;  // humidity
int g = 0;
int r = 0;
String realTime = "";


void handleRoot() {
  StaticJsonDocument<200> response;

  response["Temperature"] = t;
  response["Huminity"] = h;
  response["Ground"] = g;
  response["Rain"] = r;
  response["RealTime"] = realTime;
  response["D0"] = digitalRead(pinRelay);
  response["D3"] = digitalRead(pinGardenWarm);
  response["D4"] = digitalRead(pinGardenLight);
  response["D8"] = digitalRead(pinSiren);

  // Serialize the response JSON to a string
  String jsonResponse;
  serializeJson(response, jsonResponse);

  // Send the response JSON
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.sendHeader("Content-Type", "application/json");
  server.send(200, "application/json", jsonResponse);
}

void handleJson() {

  DynamicJsonDocument doc(1024);
  DeserializationError error = deserializeJson(doc, server.arg("plain"));

  if (error) {
    server.send(400, "text/plain", "Bad Request");
  } else {
    StaticJsonDocument<200> response;
    digitalWrite(D0, doc["D0"]);
    digitalWrite(D3, doc["D3"]);
    digitalWrite(D4, doc["D4"]);
    digitalWrite(D8, doc["D8"]);

    response["D0"] = doc["D0"];
    response["D3"] = doc["D3"];
    response["D4"] = doc["D4"];
    response["D8"] = doc["D8"];

    // Serialize the response JSON to a string
    String jsonResponse;
    serializeJson(response, jsonResponse);

    // Send the response JSON
    server.sendHeader("Access-Control-Allow-Origin", "*");
    server.sendHeader("Content-Type", "application/json");
    server.send(200, "application/json", jsonResponse);
  }
}

void handleOptions() {
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.sendHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  server.sendHeader("Access-Control-Allow-Headers", "Content-Type");
  server.send(200);
}

void setup() {
  // put your setup code here, to run once:
  dht.begin();
  Serial.begin(9600);

  DS1307_RTC.begin();
  delay(500);
  DS1307_RTC.adjust(DateTime(F(__DATE__), F(__TIME__)));

  pinMode(pinGround, INPUT);
  pinMode(pinSiren, OUTPUT);

  pinMode(pinRain, INPUT);

  pinMode(pinGardenLight, OUTPUT);
  pinMode(pinGardenWarm, OUTPUT);

  pinMode(pinRelay, OUTPUT);
  digitalWrite(pinRelay, LOW);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.begin(9600);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("");
  Serial.print("Connected to Wifi ");
  Serial.println(ssid);
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
  //-------------------- phat wifi
  server.on("/", HTTP_OPTIONS, handleOptions);
  server.on("/", HTTP_GET, handleRoot);
  server.on("/update", HTTP_OPTIONS, handleOptions);
  server.on("/update", HTTP_POST, handleJson);

  server.begin();
  Serial.println("HTTP server started");
}

void loop() {
  // put your main code here, to run repeatedly:
  server.handleClient();

  DateTime now = DS1307_RTC.now();
  realTime = String(now.year()) + "/" + String(now.month()) + "/" + String(now.day()) + " (" + String(Week_days[now.dayOfTheWeek()]) + ") " + String(now.hour()) + ":" + String(now.minute()) + ":" + String(now.second());
  // Serial.print(now.year(), DEC);
  // Serial.print('/');
  // Serial.print(now.month(), DEC);
  // Serial.print('/');
  // Serial.print(now.day(), DEC);
  // Serial.print(" (");
  // Serial.print(Week_days[now.dayOfTheWeek()]);
  // Serial.print(") ");

  // Serial.print(now.hour(), DEC);
  // Serial.print(':');
  // Serial.print(now.minute(), DEC);
  // Serial.print(':');
  // Serial.print(now.second(), DEC);
  // Serial.println();
  // Serial.print(" since midnight 1/1/1970 = ");
  // Serial.print(now.unixtime());
  // Serial.print("s = ");
  // Serial.print(now.unixtime() / 86400L);
  // Serial.println("d");
  // Serial.println();
  // Serial.println();

  g = 100 - map(analogRead(pinGround), 0, 1023, 0, 100);
  if (g > 50) {  // chỉnh lại
    // digitalWrite(pinRelay, HIGH);
  } else {
    // digitalWrite(pinRelay, LOW);
  }
  // Serial.print("Analog Ground: ");
  // Serial.println(g);
  r = digitalRead(pinRain);
  // Serial.print("Digital Rain: ");
  // Serial.println(r);

  float newT = dht.readTemperature();
  if (isnan(newT)) {
    Serial.println("Failed to read from DHT sensor!");
  } else {
    t = newT;
  }
  // Serial.print("Temperature: ");
  // Serial.println(t);

  float newH = dht.readHumidity();
  if (isnan(newH)) {
    Serial.println("Failed to read from DHT sensor!");
  } else {
    h = newH;
  }
  // Serial.print("Huminity: ");
  // Serial.println(h);
  // Serial.println("----------------------------------------");
  delay(50);
}

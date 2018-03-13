/* 
 *  this is a code for Arduino to recive string from JavaScript 
 *  and displaying that on LCD
 */
#include <LiquidCrystal.h> //LCD library 
LiquidCrystal lcd(12, 11, 5, 4, 3, 2); //digital pin placement 
String message; 

void setup() {
  Serial.begin(9600); //starting Serial port so JavaScript file can send string
  lcd.begin(16,2); //starting LCD
} 

void loop() {
  message = Serial.readString(); // getting string from serial 
  if(Serial.available()){
    while(Serial.available()>0){
    }
  }//these 4 line is just needed to run code, it does not do anything
  
  lcd.setCursor(0, 0); //setting cursor on LCD to left top raw
  //next lines will be displaying message nicely on LCD
  for(int i =0; i<message.length(); i++){ //untill we get to the last alphabet,
    if(i==16){ //if it is at the top right corner 
      lcd.setCursor(0, 1); //move cursor to the next raw
    }
    lcd.print(message.charAt(i)); //print out an alphabet (will run untill they print whole message0
   
    
  }
  
}

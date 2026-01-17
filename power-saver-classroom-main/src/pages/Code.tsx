import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { useState } from 'react';

const arduinoCode = `// Smart Power Saver for Classrooms
// PowerSyncers - TECH_EXPO 2K25

#include <Wire.h>
#include <LiquidCrystal_I2C.h>

// Pin Definitions
#define PIR_PIN 2
#define RELAY_LIGHT 3
#define RELAY_FAN 4
#define MANUAL_SWITCH 5

// LCD Setup
LiquidCrystal_I2C lcd(0x27, 16, 2);

// Variables
bool motionDetected = false;
bool manualOverride = false;
unsigned long lastMotion = 0;
const unsigned long TIMEOUT = 300000; // 5 minutes

void setup() {
  pinMode(PIR_PIN, INPUT);
  pinMode(RELAY_LIGHT, OUTPUT);
  pinMode(RELAY_FAN, OUTPUT);
  pinMode(MANUAL_SWITCH, INPUT_PULLUP);
  
  lcd.init();
  lcd.backlight();
  lcd.print("System Ready");
  
  // Start with appliances OFF
  digitalWrite(RELAY_LIGHT, HIGH);
  digitalWrite(RELAY_FAN, HIGH);
}

void loop() {
  // Check manual override
  if (digitalRead(MANUAL_SWITCH) == LOW) {
    manualOverride = !manualOverride;
    delay(300); // Debounce
  }
  
  // Read PIR sensor
  motionDetected = digitalRead(PIR_PIN);
  
  if (manualOverride) {
    // Manual mode - always ON
    turnOnAppliances();
    displayStatus("Manual Override");
  } else if (motionDetected) {
    // Motion detected
    lastMotion = millis();
    turnOnAppliances();
    displayStatus("Room Occupied");
  } else if (millis() - lastMotion > TIMEOUT) {
    // Timeout - turn OFF
    turnOffAppliances();
    displayStatus("Room Empty");
  }
  
  delay(100);
}

void turnOnAppliances() {
  digitalWrite(RELAY_LIGHT, LOW);
  digitalWrite(RELAY_FAN, LOW);
}

void turnOffAppliances() {
  digitalWrite(RELAY_LIGHT, HIGH);
  digitalWrite(RELAY_FAN, HIGH);
}

void displayStatus(String message) {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Power Saver");
  lcd.setCursor(0, 1);
  lcd.print(message);
}`;

const Code = () => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(arduinoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <>
      <Helmet>
        <title>Arduino Code | Smart Power Saver</title>
        <meta name="description" content="Complete Arduino source code for the Smart Power Saver system." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center gap-2 text-expo-cyan hover:text-expo-cyan/80 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-mono text-sm">Back to Simulation</span>
          </Link>
          
          <h1 className="expo-title text-3xl md:text-4xl mb-2">Arduino Code</h1>
          <p className="text-expo-text-muted font-mono text-sm mb-8">
            Complete source code for the microcontroller
          </p>
          
          <div className="expo-panel overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <span className="font-mono text-sm text-expo-cyan">smart_power_saver.ino</span>
              <button 
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded text-sm text-slate-300 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-expo-emerald" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="p-6 overflow-x-auto text-sm">
              <code className="text-slate-300 font-mono leading-relaxed whitespace-pre">
                {arduinoCode}
              </code>
            </pre>
          </div>
          
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <div className="expo-panel p-4">
              <h3 className="text-expo-cyan font-display mb-2">Libraries Used</h3>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>• Wire.h</li>
                <li>• LiquidCrystal_I2C.h</li>
              </ul>
            </div>
            <div className="expo-panel p-4">
              <h3 className="text-expo-emerald font-display mb-2">Memory Usage</h3>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>• Flash: ~4KB (12%)</li>
                <li>• SRAM: ~200B (10%)</li>
              </ul>
            </div>
            <div className="expo-panel p-4">
              <h3 className="text-expo-amber font-display mb-2">Configuration</h3>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>• Timeout: 5 minutes</li>
                <li>• LCD Address: 0x27</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Code;

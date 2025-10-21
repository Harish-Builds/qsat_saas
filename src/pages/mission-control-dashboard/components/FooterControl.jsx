"use client"
import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import { useState } from "react";
import { useEffect } from "react";

const FooterControl = ({ latitude, longitude, altitude, status }) => {
  const [missionStats, setMissionStats] = useState({
    lat: 0,
    long: 0,
    alt: 0,
    state: 0,
  });

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false }));

  // Update mission stats when props change
  useEffect(() => {
    setMissionStats({
      lat: latitude,
      long: longitude,
      alt: altitude,
      state: status,
    });
  }, [latitude, longitude, altitude, status]);

  // Update time every second
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  const currentYear = new Date()?.getFullYear();

  return (
    <footer className="bg-card/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="bg-muted/20 rounded-2xl p-6 mb-8 border border-border">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="text-xl font-bold font-mono text-primary mb-1">
                {latitude !== undefined && latitude !== null 
                  ? (typeof latitude === 'string' ? parseFloat(latitude).toFixed(6) : Number(latitude).toFixed(6))
                  : '0.000000'}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">
                Latitude
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold font-mono text-success mb-1">
                {longitude !== undefined && longitude !== null 
                  ? (typeof longitude === 'string' ? parseFloat(longitude).toFixed(6) : Number(longitude).toFixed(6))
                  : '0.000000'}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">
                Longitude
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold font-mono text-accent mb-1">
                {altitude !== undefined && altitude !== null 
                  ? (typeof altitude === 'string' ? parseFloat(altitude).toFixed(1) : Number(altitude).toFixed(1))
                  : '0.0'}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">
                Altitude (m)
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <div className={`w-2 h-2 rounded-full ${status === 1 || status === '1' ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
                <div className="text-xl font-bold font-mono text-secondary mb-1">
                  {(status === 1 || status === '1') ? 'ACTIVE' : 'STANDBY'}
                </div>
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">
                Status
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold font-mono text-secondary mb-1">
                {currentTime}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">
                Latest Time
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterControl;
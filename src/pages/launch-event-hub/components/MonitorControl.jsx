import React, { useState, useEffect, useRef } from "react";
import {
  Download,
  Play,
  Pause,
  Trash2,
  Database,
  ArrowUpZA,
  Thermometer,
  ThermometerSun,
  SwitchCamera,
  CloudFog,
  Activity,
  TrendingUp,
  Wifi,
  WifiOff,
  AlertCircle,
} from "lucide-react";
import Icon from "../../../components/AppIcon";
import FooterControl from "pages/mission-control-dashboard/components/FooterControl";

const MissionControl = () => {
  const [dataLog, setDataLog] = useState([]);
  const [isMonitoring, setIsMonitoring] = useState(true); // Controls data reception
  const [dataCount, setDataCount] = useState(0);
  const monitorRef = useRef(null);
  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  
  // Connection status: 'disconnected', 'connecting', 'connected', 'error'
  const [connectionStatus, setConnectionStatus] = useState('disconnected');

  const [missionStats, setMissionStats] = useState({
    latitude: 0,
    longitude: 0,
    altitude: 0,
    status: 0,
    pressure: 0,
    humidity: 0,
    temperature: 0,
    actuator: 0,
    vvelocity: 0,
    lvelocity: 0,
  });

  // WebSocket connection management
  useEffect(() => {
    const WS_URL = 'ws://localhost:8080';
    
    const connectWebSocket = () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }

      if (wsRef.current) {
        wsRef.current.close();
      }

      try {
        console.log('Attempting to connect to WebSocket...');
        setConnectionStatus('connecting');
        
        const ws = new WebSocket(WS_URL);
        wsRef.current = ws;

        ws.onopen = () => {
          console.log('✓ WebSocket connected successfully');
          setConnectionStatus('connected');
        };

        ws.onmessage = (event) => {
          // Only process messages if monitoring is active
          if (!isMonitoring) {
            console.log('Data received but monitoring is paused');
            return;
          }

          try {
            const message = JSON.parse(event.data);
            
            switch (message.type) {
              case 'SERIAL_DATA':
                handleSerialData(message);
                break;
              
              case 'CONNECTION':
                console.log('Bridge message:', message.message);
                break;
              
              case 'SYSTEM_STATUS':
                console.log('System status:', message.message);
                addSystemLog(message.message, 'SYSTEM_STATUS');
                break;
              
              case 'ERROR':
                console.error('Serial error:', message.message);
                addSystemLog(message.message, 'ERROR');
                break;
              
              default:
                console.log('Unknown message type:', message.type);
            }
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };

        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          setConnectionStatus('error');
        };

        ws.onclose = (event) => {
          console.log('WebSocket disconnected. Code:', event.code, 'Reason:', event.reason);
          setConnectionStatus('disconnected');
          
          reconnectTimeoutRef.current = setTimeout(() => {
            console.log('Attempting to reconnect...');
            connectWebSocket();
          }, 3000);
        };

      } catch (error) {
        console.error('Failed to create WebSocket connection:', error);
        setConnectionStatus('error');
        reconnectTimeoutRef.current = setTimeout(connectWebSocket, 5000);
      }
    };

    connectWebSocket();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []); // Only connect once on mount

  // Parse Arduino serial data
  const parseArduinoData = (rawData) => {
    const result = {
      type: 'TELEMETRY',
      values: {},
      sensorData: {}
    };

    try {
      // Try JSON first
      if (rawData.trim().startsWith('{')) {
        try {
          const jsonData = JSON.parse(rawData);
          Object.keys(jsonData).forEach(key => {
            result.values[key] = jsonData[key];
            mapToSensorData(key, jsonData[key], result);
          });
          return result;
        } catch (e) {
          // Not valid JSON, continue with other parsing
        }
      }

      // Parse comma-separated key:value pairs
      const pairs = rawData.split(',');
      let hasParsedData = false;
      
      pairs.forEach(pair => {
        const colonIndex = pair.indexOf(':');
        if (colonIndex > 0) {
          const key = pair.substring(0, colonIndex).trim();
          const value = pair.substring(colonIndex + 1).trim();
          
          if (key && value) {
            result.values[key] = value;
            mapToSensorData(key, value, result);
            hasParsedData = true;
          }
        }
      });

      if (!hasParsedData) {
        result.values.message = rawData;
        result.type = 'RAW_DATA';
      }

    } catch (error) {
      console.error('Error parsing Arduino data:', error);
      result.values.message = rawData;
      result.type = 'RAW_DATA';
    }

    return result;
  };

  // Map parsed keys to mission stats
  const mapToSensorData = (key, value, result) => {
    const keyLower = key.toLowerCase();
    const keyMap = {
      'lat': 'latitude',
      'latitude': 'latitude',
      'lon': 'longitude',
      'longitude': 'longitude',
      'lng': 'longitude',
      'alt': 'altitude',
      'altitude': 'altitude',
      'temp': 'temperature',
      'temperature': 'temperature',
      'hum': 'humidity',
      'humidity': 'humidity',
      'press': 'pressure',
      'pressure': 'pressure',
      'vvel': 'vvelocity',
      'vvelocity': 'vvelocity',
      'lvel': 'lvelocity',
      'lvelocity': 'lvelocity',
      'actuator': 'actuator',
      'status': 'status',
    };
    
    if (keyMap[keyLower]) {
      const mappedKey = keyMap[keyLower];
      const numValue = parseFloat(value);
      result.sensorData[mappedKey] = isNaN(numValue) ? value : numValue;
    }
  };

  // Handle incoming serial data
  const handleSerialData = (message) => {
    const data = message.data;
    const timestamp = new Date(message.timestamp);
    
    const parsedData = parseArduinoData(data);
    
    // Update mission stats if we have sensor data
    if (Object.keys(parsedData.sensorData).length > 0) {
      setMissionStats(prev => ({
        ...prev,
        ...parsedData.sensorData
      }));
    }

    // Create log entry
    const newEntry = {
      id: Date.now() + Math.random(),
      timestamp: timestamp.toISOString(),
      timeFormatted: timestamp.toLocaleTimeString("en-US", { hour12: false }),
      type: parsedData.type,
      raw: data,
      ...parsedData.values,
    };

    setDataLog((prev) => [...prev, newEntry]);
    setDataCount((prev) => prev + 1);

    // Auto-scroll to bottom
    setTimeout(() => {
      if (monitorRef.current) {
        monitorRef.current.scrollTop = monitorRef.current.scrollHeight;
      }
    }, 0);
  };

  // Add system log messages
  const addSystemLog = (message, type = 'SYSTEM_STATUS') => {
    const timestamp = new Date();
    const newEntry = {
      id: Date.now() + Math.random(),
      timestamp: timestamp.toISOString(),
      timeFormatted: timestamp.toLocaleTimeString("en-US", { hour12: false }),
      type: type,
      raw: message,
      message: message,
    };

    setDataLog((prev) => [...prev, newEntry]);
    setDataCount((prev) => prev + 1);

    setTimeout(() => {
      if (monitorRef.current) {
        monitorRef.current.scrollTop = monitorRef.current.scrollHeight;
      }
    }, 0);
  };

  // BUTTON FUNCTIONS

  // Pause/Resume button - Toggles data reception
  const handlePauseResume = () => {
    setIsMonitoring(!isMonitoring);
    if (!isMonitoring) {
      console.log('▶️ Monitoring resumed - Data reception active');
      addSystemLog('Monitoring resumed', 'SYSTEM_STATUS');
    } else {
      console.log('⏸️ Monitoring paused - Data reception stopped');
      addSystemLog('Monitoring paused', 'SYSTEM_STATUS');
    }
  };

  // Clear/Delete button - Resets everything to initial state
  const handleClear = () => {
    if (window.confirm("Clear all logged data and reset mission stats?")) {
      console.log('🗑️ Clearing all data...');
      
      // Reset data log
      setDataLog([]);
      setDataCount(0);
      
      // Reset mission stats to zero
      setMissionStats({
        latitude: 0,
        longitude: 0,
        altitude: 0,
        status: 0,
        pressure: 0,
        humidity: 0,
        temperature: 0,
        actuator: 0,
        vvelocity: 0,
        lvelocity: 0,
      });
      
      // Resume monitoring if it was paused
      setIsMonitoring(true);
      
      console.log('✓ All data cleared - Ready to receive new data');
      addSystemLog('All data cleared - Starting fresh', 'SYSTEM_STATUS');
    }
  };

  // Export to CSV - Downloads all logged data
  const handleExportCSV = () => {
    if (dataLog.length === 0) {
      alert("No data to export. Start collecting data first!");
      return;
    }

    try {
      console.log(`📥 Exporting ${dataLog.length} entries to CSV...`);

      // Collect all unique keys from all log entries
      const allKeys = new Set();
      dataLog.forEach((entry) => {
        Object.keys(entry).forEach((key) => {
          if (key !== "id") allKeys.add(key);
        });
      });

      const headers = Array.from(allKeys);
      
      // Create CSV content
      const csvContent = [
        headers.join(","),
        ...dataLog.map((entry) =>
          headers
            .map((header) => {
              const value = entry[header] || "";
              // Escape values that contain commas or quotes
              return typeof value === "string" &&
                (value.includes(",") || value.includes('"'))
                ? `"${value.replace(/"/g, '""')}"`
                : value;
            })
            .join(",")
        ),
      ].join("\n");

      // Create and download file
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      
      const filename = `arduino_data_${new Date().toISOString().split("T")[0]}_${new Date().getTime()}.csv`;
      
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
      
      console.log(`✓ Data exported successfully: ${filename}`);
      addSystemLog(`Exported ${dataLog.length} entries to ${filename}`, 'SYSTEM_STATUS');
    } catch (error) {
      console.error('❌ Error exporting CSV:', error);
      alert('Failed to export data. Please try again.');
    }
  };

  const missionCards = [
    {
      title: "Pressure",
      value: typeof missionStats?.pressure === 'number' ? missionStats.pressure.toFixed(1) : 0,
      unit: "hPa",
      icon: "CloudFog",
      color: "primary",
      trend: "Atmospheric",
    },
    {
      title: "Temperature",
      value: typeof missionStats?.temperature === 'number' ? missionStats.temperature.toFixed(1) : 0,
      unit: "°C",
      icon: "Thermometer",
      color: "accent",
      trend: "In Operating range",
    },
    {
      title: "Humidity",
      value: typeof missionStats?.humidity === 'number' ? missionStats.humidity.toFixed(1) : 0,
      unit: "%",
      icon: "ThermometerSun",
      color: "success",
      trend: "Nominal",
    },
    {
      title: "Actuator",
      value: missionStats?.actuator || 0,
      unit: missionStats?.actuator === 1 ? "ON" : "OFF",
      icon: "SwitchCamera",
      color: "secondary",
      trend: missionStats?.actuator === 1 ? "Actuation Started" : "Standby",
    },
    {
      title: "Vertical Velocity",
      value: typeof missionStats?.vvelocity === 'number' ? missionStats.vvelocity.toFixed(1) : 0,
      unit: "m/s",
      icon: "ArrowUpZA",
      color: "success",
      trend: "Ascending",
    },
    {
      title: "Lateral Velocity",
      value: typeof missionStats?.lvelocity === 'number' ? missionStats.lvelocity.toFixed(1) : 0,
      unit: "m/s",
      icon: "TrendingUp",
      color: "primary",
      trend: "Tracking",
    },
  ];

  const getTypeColor = (type) => {
    const colors = {
      TELEMETRY: "text-cyan-400",
      SERIAL_DATA: "text-green-400",
      SYSTEM_STATUS: "text-blue-400",
      RAW_DATA: "text-yellow-400",
      ERROR: "text-red-400",
    };
    return colors[type] || "text-gray-400";
  };

  // Connection status badge component
  const ConnectionBadge = () => {
    const configs = {
      connected: { 
        icon: Wifi, 
        color: "text-green-400", 
        bg: "bg-green-500/20", 
        text: "CONNECTED",
        pulse: true
      },
      connecting: { 
        icon: Wifi, 
        color: "text-yellow-400", 
        bg: "bg-yellow-500/20", 
        text: "CONNECTING...",
        pulse: true
      },
      disconnected: { 
        icon: WifiOff, 
        color: "text-red-400", 
        bg: "bg-red-500/20", 
        text: "DISCONNECTED",
        pulse: false
      },
      error: { 
        icon: AlertCircle, 
        color: "text-orange-400", 
        bg: "bg-orange-500/20", 
        text: "ERROR",
        pulse: false
      },
    };

    const config = configs[connectionStatus] || configs.disconnected;
    const IconComponent = config.icon;

    return (
      <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg ${config.bg}`}>
        <div className={`w-2 h-2 rounded-full ${config.color.replace('text-', 'bg-')} ${config.pulse ? 'animate-pulse' : ''}`}></div>
        <IconComponent size={14} className={config.color} />
        <span className={`text-xs font-mono ${config.color}`}>{config.text}</span>
      </div>
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 p-4 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {missionCards?.map((card, index) => (
          <div
            key={index}
            className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`p-3 rounded-xl bg-${card?.color}/20 border border-${card?.color}/30 group-hover:mission-glow transition-all duration-300`}
              >
                <Icon
                  name={card?.icon}
                  size={24}
                  className={`text-${card?.color}`}
                />
              </div>
              <div className="text-right">
                <div className="text-2xl md:text-xl font-bold text-foreground font-mono">
                  {card?.value}
                  <span className="text-sm text-muted-foreground ml-1">
                    {card?.unit}
                  </span>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-2">
              {card?.title}
            </h3>

            <div className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full bg-${card?.color} animate-pulse`}
              ></div>
              <span className="text-sm text-muted-foreground">
                {card?.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="relative min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 md:py-0 sm:py-8 flex items-center justify-center">
          <div className="w-full max-w-8xl">
            {/* Serial Monitor */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-3 sm:px-4 py-3 border-b border-slate-700 bg-slate-900/80">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Activity size={18} className="text-cyan-400 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm font-mono text-cyan-400 uppercase tracking-wide">
                    Arduino Serial Monitor
                  </span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <ConnectionBadge />
                  {isMonitoring && connectionStatus === 'connected' ? (
                    <div className="hidden sm:flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-mono text-green-400">
                        LIVE
                      </span>
                    </div>
                  ) : !isMonitoring ? (
                    <div className="hidden sm:flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-xs font-mono text-red-400">
                        PAUSED
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="relative h-[300px] sm:h-[400px] lg:h-[600px] bg-black">
                <div
                  ref={monitorRef}
                  className="absolute inset-0 overflow-y-auto p-3 sm:p-4 font-mono text-xs sm:text-sm scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "#475569 transparent",
                  }}
                >
                  {dataLog.length === 0 ? (
                    <div className="text-gray-600 text-center py-12">
                      <Activity className="w-8 h-8 mx-auto mb-3 opacity-50" />
                      <p className="text-sm">Waiting for Arduino data...</p>
                      {connectionStatus !== 'connected' && (
                        <div className="mt-4 space-y-2">
                          <p className="text-xs text-red-400">
                            WebSocket not connected
                          </p>
                          <p className="text-xs text-gray-500">
                            Make sure the Node.js server is running on ws://localhost:8080
                          </p>
                          <p className="text-xs text-gray-500">
                            Run: cd server && npm start
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {dataLog.map((entry, index) => (
                        <div
                          key={entry.id}
                          className="hover:bg-slate-900/30 px-2 py-1 rounded transition-colors"
                        >
                          <div className="flex items-start gap-2">
                            <span className="text-gray-600 whitespace-nowrap">
                              [{index + 1}]
                            </span>
                            <span className="text-gray-500 whitespace-nowrap">
                              {entry.timeFormatted}
                            </span>
                            <span
                              className={`font-semibold ${getTypeColor(
                                entry.type
                              )} whitespace-nowrap`}
                            >
                              {entry.type}
                            </span>
                            <span className="text-gray-300 flex-1 break-all">
                              {entry.raw}
                            </span>
                          </div>
                        </div>
                      ))}

                      {isMonitoring && connectionStatus === 'connected' && (
                        <div className="flex items-center gap-2 text-gray-600 animate-pulse px-2 py-1">
                          <div className="w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
                          <span>Receiving data...</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Monitor Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 px-3 sm:px-4 py-2 sm:py-3 border-t border-slate-700 bg-slate-900/50">
                <div className="flex items-center gap-2">
                  {/* Pause/Resume Button */}
                  <button
                    onClick={handlePauseResume}
                    className={`p-1.5 rounded transition-colors ${
                      isMonitoring 
                        ? 'hover:bg-red-900/30 bg-slate-800' 
                        : 'hover:bg-green-900/30 bg-slate-800'
                    }`}
                    title={isMonitoring ? "Pause data reception" : "Resume data reception"}
                  >
                    {isMonitoring ? (
                      <Pause size={16} className="text-red-400" />
                    ) : (
                      <Play size={16} className="text-green-400" />
                    )}
                  </button>
                  
                  {/* Clear/Delete Button */}
                  <button
                    onClick={handleClear}
                    className="p-1.5 rounded hover:bg-slate-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Clear all data and reset"
                    disabled={dataLog.length === 0 && dataCount === 0}
                  >
                    <Trash2 size={16} className="text-gray-400 hover:text-red-400" />
                  </button>
                  
                  {/* Download/Export Button */}
                  <button
                    onClick={handleExportCSV}
                    className="p-1.5 rounded hover:bg-slate-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Export data to CSV"
                    disabled={dataLog.length === 0}
                  >
                    <Download size={16} className="text-cyan-400" />
                  </button>
                </div>
                
                <div className="flex items-center gap-2 sm:gap-3 text-xs">
                  <span className="text-gray-500 flex items-center">
                    <Database size={12} className="inline mr-1" />
                    <span className="hidden xs:inline">
                      {dataCount} entries
                    </span>
                    <span className="xs:hidden">{dataCount}</span>
                  </span>
                  <span className="text-gray-500 hidden sm:inline">
                    115200 baud
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .scrollbar-thin::-webkit-scrollbar {
            width: 6px;
          }
          .scrollbar-thin::-webkit-scrollbar-track {
            background: transparent;
          }
          .scrollbar-thin::-webkit-scrollbar-thumb {
            background: #475569;
            border-radius: 3px;
          }
          .scrollbar-thin::-webkit-scrollbar-thumb:hover {
            background: #64748b;
          }
        `}</style>
      </div>

      {/* Footer Control - uncomment if you want to use it */}
      {/* <FooterControl 
        latitude={missionStats.latitude}
        longitude={missionStats.longitude}
        altitude={missionStats.altitude}
        status={missionStats.status}
      /> */}
    </>
  );
};

export default MissionControl;
import React, { useState, useEffect, useRef } from "react";
import {
  Download,
  Play,
  Pause,
  Trash2,
  Database,
  Activity,
} from "lucide-react";
import Icon from "../../../components/AppIcon";

const MissionControl = () => {
  const [dataLog, setDataLog] = useState([]);
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [dataCount, setDataCount] = useState(0);
  const monitorRef = useRef(null);

  const missionDataTemplates = [
    {
      type: "TELEMETRY",
      data: () => ({
        altitude: (400 + Math.random() * 50).toFixed(2),
        velocity: (7.5 + Math.random() * 0.5).toFixed(2),
        temperature: (-20 + Math.random() * 10).toFixed(1),
      }),
    },
    {
      type: "SYSTEM_STATUS",
      data: () => ({
        battery: (85 + Math.random() * 15).toFixed(1),
        solar_panels: Math.random() > 0.5 ? "ACTIVE" : "CHARGING",
        communication: "NOMINAL",
      }),
    },
    {
      type: "ATTITUDE",
      data: () => ({
        roll: (Math.random() * 360).toFixed(2),
        pitch: (Math.random() * 360).toFixed(2),
        yaw: (Math.random() * 360).toFixed(2),
      }),
    },
    {
      type: "GPS_POSITION",
      data: () => ({
        latitude: (Math.random() * 180 - 90).toFixed(6),
        longitude: (Math.random() * 360 - 180).toFixed(6),
        accuracy: (Math.random() * 5).toFixed(2),
      }),
    },
    {
      type: "PAYLOAD_DATA",
      data: () => ({
        sensor_1: (Math.random() * 100).toFixed(2),
        sensor_2: (Math.random() * 100).toFixed(2),
        status: "COLLECTING",
      }),
    },
    {
      type: "GROUND_STATION",
      data: () => ({
        signal_strength: (-80 + Math.random() * 20).toFixed(1),
        data_rate: (9600 + Math.random() * 400).toFixed(0),
        station_id: `GS_${Math.floor(Math.random() * 5) + 1}`,
      }),
    },
  ];

  // Generate real-time data
  useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(() => {
      const template =
        missionDataTemplates[
          Math.floor(Math.random() * missionDataTemplates.length)
        ];
      const timestamp = new Date();
      const dataValues = template.data();

      const newEntry = {
        id: Date.now(),
        timestamp: timestamp.toISOString(),
        timeFormatted: timestamp.toLocaleTimeString("en-US", { hour12: false }),
        type: template.type,
        ...dataValues,
        raw: JSON.stringify(dataValues),
      };

      setDataLog((prev) => [...prev, newEntry]);
      setDataCount((prev) => prev + 1);

      if (monitorRef.current) {
        monitorRef.current.scrollTop = monitorRef.current.scrollHeight;
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [isMonitoring]);

  const exportToCSV = () => {
    if (dataLog.length === 0) {
      alert("No data to export");
      return;
    }

    const allKeys = new Set();
    dataLog.forEach((entry) => {
      Object.keys(entry).forEach((key) => {
        if (key !== "id" && key !== "raw") allKeys.add(key);
      });
    });

    const headers = Array.from(allKeys);
    const csvContent = [
      headers.join(","),
      ...dataLog.map((entry) =>
        headers
          .map((header) => {
            const value = entry[header] || "";
            return typeof value === "string" &&
              (value.includes(",") || value.includes('"'))
              ? `"${value.replace(/"/g, '""')}"`
              : value;
          })
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `qsat_mission_data_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearLog = () => {
    if (window.confirm("Clear all logged data?")) {
      setDataLog([]);
      setDataCount(0);
    }
  };

  const [missionStats, setMissionStats] = useState({
    Latitude: 47,
    Longitude: 12,
    Altitude: 2847.5,
    Status: 1250,
    Pressure: 94.7,
    Speed: 15847,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMissionStats((prev) => ({
        ...prev,
        dataCollected: prev?.dataCollected + Math.random() * 0.5,
        orbitalTime: prev?.orbitalTime + 1,
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const missionCards = [
    {
      title: "Latitude",
      value: missionStats?.Latitude,
      unit: "",
      icon: "Rocket",
      color: "primary",
      trend: "+3 this month",
    },
    {
      title: "Longitude",
      value: missionStats?.Longitude,
      unit: "",
      icon: "Satellite",
      color: "success",
      trend: "All operational",
    },
    {
      title: "Altitude",
      value: missionStats?.Altitude?.toFixed(1),
      unit: "GB",
      icon: "Database",
      color: "accent",
      trend: "+12.3% today",
    },
    {
      title: "Status",
      value: missionStats?.Status?.toLocaleString(),
      unit: "",
      icon: "Users",
      color: "secondary",
      trend: "+45 this week",
    },
    {
      title: "Pressure",
      value: missionStats?.Pressure,
      unit: "%",
      icon: "TrendingUp",
      color: "success",
      trend: "Industry leading",
    },
    {
      title: "Speed",
      value: missionStats?.Speed?.toLocaleString(),
      unit: "hrs",
      icon: "Clock",
      color: "primary",
      trend: "Continuous",
    },
  ];

  const getTypeColor = (type) => {
    const colors = {
      TELEMETRY: "text-cyan-400",
      SYSTEM_STATUS: "text-green-400",
      ATTITUDE: "text-purple-400",
      GPS_POSITION: "text-blue-400",
      PAYLOAD_DATA: "text-yellow-400",
      GROUND_STATION: "text-orange-400",
    };
    return colors[type] || "text-gray-400";
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
        {/* Animated Stars Background */}
        {/* <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div> */}

        <div className="relative z-10 container mx-auto px-4 sm:px-6 py-4 sm:py-8 min-h-screen flex items-center justify-center">
          <div className="w-full max-w-4xl">
            {/* Serial Monitor */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-3 sm:px-4 py-3 border-b border-slate-700 bg-slate-900/80">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Activity size={18} className="text-cyan-400 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm font-mono text-cyan-400 uppercase tracking-wide">
                    Live Telemetry Stream
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {isMonitoring ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-mono text-green-400">
                        LIVE
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-xs font-mono text-red-400">
                        PAUSED
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] bg-black">
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
                      <p className="text-sm">Waiting for mission data...</p>
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
                              {Object.entries(entry)
                                .filter(
                                  ([key]) =>
                                    ![
                                      "id",
                                      "timestamp",
                                      "timeFormatted",
                                      "type",
                                      "raw",
                                    ].includes(key)
                                )
                                .map(([key, value]) => `${key}=${value}`)
                                .join(" | ")}
                            </span>
                          </div>
                        </div>
                      ))}

                      {isMonitoring && (
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
                  <button
                    onClick={() => setIsMonitoring(!isMonitoring)}
                    className="p-1.5 rounded hover:bg-slate-800 transition-colors"
                    title={isMonitoring ? "Pause" : "Resume"}
                  >
                    {isMonitoring ? (
                      <Pause size={16} className="text-red-400" />
                    ) : (
                      <Play size={16} className="text-green-400" />
                    )}
                  </button>
                  <button
                    onClick={clearLog}
                    className="p-1.5 rounded hover:bg-slate-800 transition-colors"
                    title="Clear Log"
                    disabled={dataLog.length === 0}
                  >
                    <Trash2 size={16} className="text-gray-400" />
                  </button>
                  <button
                    onClick={exportToCSV}
                    className="p-1.5 rounded hover:bg-slate-800 transition-colors"
                    title="Export CSV"
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
                    9600 baud
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
    </>
  );
};

export default MissionControl;

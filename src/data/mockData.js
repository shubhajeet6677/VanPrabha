export const PARKS = [
  {
    id: "park-1",
    name: "Cubbon Park Central Reserve",
    location: "Bengaluru Central",
    zone: "Zone A - Core Forest",
    assignedStaff: "Ramesh Kumar (Senior Guard)",
    lat: 12.9763,
    lng: 77.5929,
    status: "warning", // warning, critical, normal
    sensorsCount: 12,
    alertsCount: 1,
    temp: "27.4 °C",
    soilMoisture: "34 %",
    npk: "135/30/105",
    humidity: "62 %"
  },
  {
    id: "park-2",
    name: "Lalbagh Botanical Grove",
    location: "South Bengaluru",
    zone: "Zone B - Arboretum",
    assignedStaff: "Priya Sharma (Ecologist)",
    lat: 12.9507,
    lng: 77.5848,
    status: "critical",
    sensorsCount: 10,
    alertsCount: 2,
    temp: "34.1 °C",
    soilMoisture: "18 %",
    npk: "90/20/75",
    humidity: "48 %"
  },
  {
    id: "park-3",
    name: "Bannerghatta Buffer Woods",
    location: "Bannerghatta Outer",
    zone: "Zone C - Wildlife Fringe",
    assignedStaff: "Vikram Singh (Ranger)",
    lat: 12.8000,
    lng: 77.5770,
    status: "normal",
    sensorsCount: 8,
    alertsCount: 0,
    temp: "25.8 °C",
    soilMoisture: "55 %",
    npk: "150/45/120",
    humidity: "71 %"
  },
  {
    id: "park-4",
    name: "HSR Layout Canopy Park",
    location: "HSR Sector 2",
    zone: "Zone D - Urban Canopy",
    assignedStaff: "Ananya Roy (Field Tech)",
    lat: 12.9121,
    lng: 77.6446,
    status: "normal",
    sensorsCount: 5,
    alertsCount: 0,
    temp: "26.5 °C",
    soilMoisture: "48 %",
    npk: "140/38/115",
    humidity: "66 %"
  },
  {
    id: "park-5",
    name: "Indiranagar Bio-Ridge",
    location: "Indiranagar 100ft Rd",
    zone: "Zone E - Green Corridor",
    assignedStaff: "Karan Mehta (Staff)",
    lat: 12.9784,
    lng: 77.6408,
    status: "normal",
    sensorsCount: 4,
    alertsCount: 0,
    temp: "28.0 °C",
    soilMoisture: "40 %",
    npk: "130/32/100",
    humidity: "60 %"
  },
  {
    id: "park-6",
    name: "Jayanagar 5th Block Urban Forest",
    location: "Jayanagar",
    zone: "Zone F - Community Forest",
    assignedStaff: "Suresh Babu (Volunteer Head)",
    lat: 12.9250,
    lng: 77.5800,
    status: "warning",
    sensorsCount: 3,
    alertsCount: 0,
    temp: "29.2 °C",
    soilMoisture: "28 %",
    npk: "110/25/90",
    humidity: "53 %"
  }
];

export const ACTIVE_ALERTS = [
  {
    id: "alert-1",
    siteId: "park-2",
    siteName: "Lalbagh Botanical Grove",
    type: "Soil Moisture Critical",
    severity: "critical",
    message: "Moisture levels dropped to 18% in Sector B. Immediate hydration recommended.",
    time: "12 mins ago"
  },
  {
    id: "alert-2",
    siteId: "park-2",
    siteName: "Lalbagh Botanical Grove",
    type: "Thermal Anomaly",
    severity: "critical",
    message: "Temperature spike of 34.1 °C detected near Sensor #L-04.",
    time: "35 mins ago"
  },
  {
    id: "alert-3",
    siteId: "park-1",
    siteName: "Cubbon Park Central Reserve",
    type: "Unattended Litter Detected",
    severity: "warning",
    message: "AI Camera #C-09 reported plastic waste accumulation near Oak trail.",
    time: "1 hour ago"
  }
];

export const SENSOR_SUMMARY = [
  {
    id: "temp",
    title: "Ambient Temperature",
    value: "27.4 °C",
    unit: "°C",
    status: "Optimal",
    change: "+1.2° vs yesterday",
    isWarning: false,
    sparkline: [24, 25, 26, 28, 27, 26.5, 27.4]
  },
  {
    id: "moisture",
    title: "Soil Moisture",
    value: "34 %",
    unit: "%",
    status: "Low Threshold",
    change: "-4% vs yesterday",
    isWarning: true,
    sparkline: [48, 45, 42, 39, 36, 35, 34]
  },
  {
    id: "npk",
    title: "Soil NPK Ratio",
    value: "135/30/105",
    unit: "ppm",
    status: "Balanced Nitrogen",
    change: "Normal Range",
    isWarning: false,
    sparkline: [130, 132, 131, 134, 135, 133, 135]
  },
  {
    id: "humidity",
    title: "Relative Humidity",
    value: "62 %",
    unit: "%",
    status: "Healthy",
    change: "+3% vs yesterday",
    isWarning: false,
    sparkline: [58, 60, 59, 61, 63, 62, 62]
  }
];

export const HISTORICAL_30_DAYS = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  return {
    day: `Day ${day}`,
    temperature: +(24 + Math.sin(i * 0.4) * 4 + Math.random() * 1.5).toFixed(1),
    soilMoisture: +(45 - i * 0.4 + Math.cos(i * 0.5) * 5).toFixed(1),
    humidity: +(60 + Math.sin(i * 0.3) * 8 + Math.random() * 2).toFixed(1),
    nitrogen: +(130 + Math.random() * 15).toFixed(0)
  };
});

export const INITIAL_LITTER_FEED = [
  {
    id: "litter-1",
    photoUrl: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=600&q=80",
    confidence: 94.2,
    source: "Camera",
    timestamp: "2026-08-29 10:15 AM",
    status: "Pending",
    detectedItems: "Single-use Plastic Bottles, Polythene bag"
  },
  {
    id: "litter-2",
    photoUrl: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80",
    confidence: 88.7,
    source: "Staff",
    timestamp: "2026-08-28 04:45 PM",
    status: "Cleaned",
    detectedItems: "Cardboard Packaging, Snack wrapper"
  },
  {
    id: "litter-3",
    photoUrl: "https://images.unsplash.com/photo-1604186837056-8e7c286756f2?auto=format&fit=crop&w=600&q=80",
    confidence: 96.0,
    source: "Camera",
    timestamp: "2026-08-28 09:30 AM",
    status: "Cleaned",
    detectedItems: "Glass Bottle, Beverage cans"
  }
];

export const INITIAL_FIELD_LOGS = [
  {
    id: "log-1",
    author: "Ramesh Kumar",
    role: "Senior Guard",
    date: "2026-08-28 11:30 AM",
    note: "Inspected North Boundary fence. Drip irrigation valve #4 cleared of debris. Trees looking robust.",
    photoUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "log-2",
    author: "Priya Sharma",
    role: "Ecologist",
    date: "2026-08-26 03:15 PM",
    note: "Soil samples collected near the central pond. Low moisture noted in Sector 2 due to dry spell.",
    photoUrl: null
  }
];

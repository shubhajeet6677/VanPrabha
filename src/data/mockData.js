export const PARKS = [
  {
    id: "park-1",
    name: "Lodhi Garden Reserve",
    location: "Central New Delhi",
    zone: "Zone A - Heritage Forest",
    assignedStaff: "Ramesh Kumar (Senior Guard)",
    lat: 28.5933,
    lng: 77.2197,
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
    name: "Sanjay Van Bio-Diversity Park",
    location: "South New Delhi (Vasant Kunj)",
    zone: "Zone B - Dense Canopy",
    assignedStaff: "Priya Sharma (Ecologist)",
    lat: 28.5367,
    lng: 77.1818,
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
    name: "Central Ridge Forest Reserve",
    location: "Dhaula Kuan / Chanakyapuri",
    zone: "Zone C - Ridge Ecosystem",
    assignedStaff: "Vikram Singh (Ranger)",
    lat: 28.6180,
    lng: 77.1750,
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
    name: "Asola Bhatti Sanctuary Woods",
    location: "Southern Delhi Ridge",
    zone: "Zone D - Wildlife Sanctuary",
    assignedStaff: "Ananya Roy (Field Tech)",
    lat: 28.4680,
    lng: 77.2600,
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
    name: "Jahanpanah City Forest",
    location: "Greater Kailash / Chirag Delhi",
    zone: "Zone E - Community Canopy",
    assignedStaff: "Karan Mehta (Staff)",
    lat: 28.5280,
    lng: 77.2350,
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
    name: "Nehru Park Arboretum",
    location: "Chanakyapuri",
    zone: "Zone F - Urban Grove",
    assignedStaff: "Suresh Babu (Volunteer Head)",
    lat: 28.5880,
    lng: 77.1950,
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
    siteName: "Sanjay Van Bio-Diversity Park",
    type: "Soil Moisture Critical",
    severity: "critical",
    message: "Moisture levels dropped to 18% in Sector B. Immediate hydration recommended.",
    time: "12 mins ago"
  },
  {
    id: "alert-2",
    siteId: "park-2",
    siteName: "Sanjay Van Bio-Diversity Park",
    type: "Thermal Anomaly",
    severity: "critical",
    message: "Temperature spike of 34.1 °C detected near Sensor #L-04.",
    time: "35 mins ago"
  },
  {
    id: "alert-3",
    siteId: "park-1",
    siteName: "Lodhi Garden Reserve",
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

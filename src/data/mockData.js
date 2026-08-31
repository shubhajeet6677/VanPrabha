// Mock Data for VanPrabha Urban Forest Operations Platform

export const DIVISIONS = ['North', 'South', 'East', 'West'];

export const DIVISION_ZONES = {
  North: ['North Zone 1', 'North Zone 2', 'North Zone 3'],
  South: ['South Zone 1', 'South Zone 2', 'South Zone 3'],
  East: ['East Zone 1', 'East Zone 2'],
  West: ['West Zone 1', 'West Zone 2']
};

export const ROLES = [
  'Director General',
  'Division Conservator',
  'Zone Conservator',
  'Cluster Supervisor',
  'Field Warden',
  'Litter Inspector',
  'System Admin'
];

// OFFICERS DATASET
export const OFFICERS = [ 
  { name: "Rajiv Menon", id: "VP-DG-001", role: "Director General", division: "All", zone: "All", status: "Active" }, 
  { name: "Sunita Krishnan", id: "VP-DG-002", role: "Director General", division: "All", zone: "All", status: "Active" }, 
  { name: "Arun Sharma", id: "VP-DC-001", role: "Division Conservator", division: "North", zone: "All", status: "Active" }, 
  { name: "Priya Nambiar", id: "VP-DC-002", role: "Division Conservator", division: "South", zone: "All", status: "Active" }, 
  { name: "Deepak Verma", id: "VP-ZC-001", role: "Zone Conservator", division: "North", zone: "Zone N-1", status: "Active" }, 
  { name: "Anjali Rawat", id: "VP-ZC-002", role: "Zone Conservator", division: "East", zone: "Zone E-2", status: "Active" }, 
  { name: "Manoj Pillai", id: "VP-CS-001", role: "Cluster Supervisor", division: "North", zone: "Zone N-1", status: "Active" }, 
  { name: "Kavitha Reddy", id: "VP-CS-002", role: "Cluster Supervisor", division: "South", zone: "Zone S-3", status: "Active" }, 
  { name: "Ravi Chauhan", id: "VP-FW-001", role: "Field Warden", division: "North", zone: "Zone N-1", status: "Active" }, 
  { name: "Seema Tiwari", id: "VP-FW-002", role: "Field Warden", division: "East", zone: "Zone E-2", status: "Active" }, 
  { name: "Imran Siddiqui", id: "VP-LI-001", role: "Litter Inspector", division: "West", zone: "Zone W-2", status: "Active" }, 
  { name: "Pooja Bhatt", id: "VP-LI-002", role: "Litter Inspector", division: "South", zone: "Zone S-1", status: "Active" }, 
  { name: "Arjun Nair", id: "VP-ADM-001", role: "System Admin", division: "All", zone: "All", status: "Active" }, 
  { name: "Divya Mehta", id: "VP-ADM-002", role: "System Admin", division: "All", zone: "All", status: "Active" } 
];

// Helper to generate 30 days history
const generate30DaysHistory = (baseVal, variance, trend = 0) => {
  return Array.from({ length: 30 }, (_, i) => {
    const val = baseVal + Math.sin(i * 0.4) * variance + (i * trend);
    return {
      day: `Day ${i + 1}`,
      reading: +val.toFixed(1)
    };
  });
};

// Helper for 24h abnormal trend
const generateAbnormalTrend = (normalVal, dropVal) => {
  const times = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '11:00', '12:00'];
  return times.map((t, idx) => {
    let reading = normalVal;
    if (idx >= 5) {
      reading = dropVal + Math.random() * 1.5;
    } else {
      reading = normalVal - idx * 0.8 + (Math.random() * 2 - 1);
    }
    return { time: t, reading: +reading.toFixed(1) };
  });
};

// PARKS DATASET (With exact requested Tree, Soil, Water & Ambient sensor mock data)
export const PARKS_LIST = [
  {
    id: 'park-lodhi',
    name: 'Lodhi Park',
    abbr: 'LP',
    division: 'North',
    zone: 'North Zone 1',
    location: 'Central New Delhi',
    sensors: {
      tree: [
        { id: 'LPTA1', name: 'Canopy Growth Node #1', latestReading: '1.2mm growth', unit: 'mm', status: 'Online', sparkline: [1.0, 1.1, 1.2, 1.2, 1.2, 1.2, 1.2], battery: 96, lastPing: '2 mins ago', history: generate30DaysHistory(1.2, 0.2) },
        { id: 'LPTA2', name: 'Canopy Growth Node #2', latestReading: '0.8mm growth', unit: 'mm', status: 'Online', sparkline: [0.6, 0.7, 0.8, 0.8, 0.8, 0.8, 0.8], battery: 92, lastPing: '4 mins ago', history: generate30DaysHistory(0.8, 0.1) },
        { id: 'LPTA3', name: 'Canopy Growth Node #3', latestReading: '1.5mm growth', unit: 'mm', status: 'Online', sparkline: [1.2, 1.4, 1.5, 1.5, 1.5, 1.5, 1.5], battery: 98, lastPing: '1 min ago', history: generate30DaysHistory(1.5, 0.3) },
        { id: 'LPTA4', name: 'Canopy Growth Node #4', latestReading: '0.3mm growth', unit: 'mm', status: 'Offline', sparkline: [0.3, 0.3, 0, 0, 0, 0, 0], battery: 8, lastPing: '4 hours ago', history: generate30DaysHistory(0.3, 0.05) }
      ],
      soil: [
        { id: 'LPSA1', name: 'Root Soil Nutrients & Hydration #1', latestReading: 'N=42, P=18, K=28, Moisture=58%', unit: 'NPK & %', status: 'Online', sparkline: [52, 54, 56, 58, 58, 58, 58], battery: 95, lastPing: '3 mins ago', history: generate30DaysHistory(58, 4) },
        { id: 'LPSA2', name: 'Root Soil Nutrients & Hydration #2', latestReading: 'N=31, P=12, K=22, Moisture=23%', unit: 'NPK & %', status: 'Online', isAlert: true, alertMessage: 'CRITICAL: Low soil moisture threshold reached (23%)', sparkline: [48, 40, 32, 26, 23, 23, 23], battery: 88, lastPing: '1 min ago', history: generate30DaysHistory(23, 8, -0.6) },
        { id: 'LPSA3', name: 'Root Soil Nutrients & Hydration #3', latestReading: 'N=55, P=24, K=35, Moisture=61%', unit: 'NPK & %', status: 'Online', sparkline: [58, 59, 61, 61, 61, 61, 61], battery: 94, lastPing: '5 mins ago', history: generate30DaysHistory(61, 3) },
        { id: 'LPSA4', name: 'Root Soil Nutrients & Hydration #4', latestReading: 'N=38, P=15, K=19, Moisture=54%', unit: 'NPK & %', status: 'Online', sparkline: [50, 52, 54, 54, 54, 54, 54], battery: 91, lastPing: '2 mins ago', history: generate30DaysHistory(54, 2) }
      ],
      water: [
        { id: 'LPWA1', name: 'Aquatic Quality Node #1', latestReading: 'Turbidity=3.2 NTU, Temp=28°C, Flow=1.4 L/s', unit: 'NTU/°C/L/s', status: 'Online', sparkline: [3.0, 3.1, 3.2, 3.2, 3.2, 3.2, 3.2], battery: 92, lastPing: '3 mins ago', history: generate30DaysHistory(3.2, 0.4) },
        { id: 'LPWA2', name: 'Aquatic Quality Node #2', latestReading: 'Turbidity=7.8 NTU, Temp=29°C, Flow=1.1 L/s', unit: 'NTU/°C/L/s', status: 'Online', sparkline: [7.2, 7.5, 7.8, 7.8, 7.8, 7.8, 7.8], battery: 96, lastPing: '6 mins ago', history: generate30DaysHistory(7.8, 0.8) },
        { id: 'LPWA3', name: 'Aquatic Quality Node #3', latestReading: 'Turbidity=4.1 NTU, Temp=27°C, Flow=1.6 L/s', unit: 'NTU/°C/L/s', status: 'Online', sparkline: [3.9, 4.0, 4.1, 4.1, 4.1, 4.1, 4.1], battery: 89, lastPing: '2 mins ago', history: generate30DaysHistory(4.1, 0.3) },
        { id: 'LPWA4', name: 'Aquatic Quality Node #4', latestReading: 'Turbidity=2.9 NTU, Temp=28°C, Flow=0.9 L/s', unit: 'NTU/°C/L/s', status: 'Offline', sparkline: [2.9, 2.9, 0, 0, 0, 0, 0], battery: 5, lastPing: '1 day ago', history: generate30DaysHistory(2.9, 0.2) }
      ],
      ambient: [
        { id: 'LPAM1', name: 'Main Gate Ambient Station', location: 'Main Gate', latestReading: 'Temp=34°C, Humidity=72%', unit: '°C & %', status: 'Online', sparkline: [32, 33, 34, 34, 34, 34, 34], battery: 97, lastPing: '1 min ago', history: generate30DaysHistory(34, 2) },
        { id: 'LPAM2', name: 'North Trail Ambient Station', location: 'North Trail', latestReading: 'Temp=32°C, Humidity=68%', unit: '°C & %', status: 'Online', sparkline: [30, 31, 32, 32, 32, 32, 32], battery: 94, lastPing: '3 mins ago', history: generate30DaysHistory(32, 2) },
        { id: 'LPAM3', name: 'Picnic Zone Ambient Station', location: 'Picnic Zone', latestReading: 'Temp=36°C, Humidity=75%', unit: '°C & %', status: 'Online', sparkline: [34, 35, 36, 36, 36, 36, 36], battery: 91, lastPing: '2 mins ago', history: generate30DaysHistory(36, 3) },
        { id: 'LPAM4', name: 'East Entrance Ambient Station', location: 'East Entrance', latestReading: 'Temp=33°C, Humidity=70%', unit: '°C & %', status: 'Online', sparkline: [31, 32, 33, 33, 33, 33, 33], battery: 95, lastPing: '4 mins ago', history: generate30DaysHistory(33, 2) }
      ]
    }
  },
  {
    id: 'park-sanjay',
    name: 'Sanjay Park',
    abbr: 'SP',
    division: 'South',
    zone: 'South Zone 1',
    location: 'Vasant Kunj, New Delhi',
    sensors: {
      tree: [
        { id: 'SPTA1', name: 'Canopy Thermal Node #1', latestReading: '34.1 °C', unit: '°C', status: 'Online', sparkline: [28, 30, 32, 33, 34.1, 34.1, 34.1], battery: 90, lastPing: '1 min ago', isAlert: true, history: generate30DaysHistory(30, 4, 0.2) },
        { id: 'SPTA2', name: 'Trunk Strain & Growth', latestReading: '14.5 cm/h', unit: 'cm/h', status: 'Online', sparkline: [14, 14.2, 14.5, 14.5, 14.5, 14.5, 14.5], battery: 85, lastPing: '5 mins ago', history: generate30DaysHistory(14.5, 1) },
        { id: 'SPTA3', name: 'Leaf Wetness Sensor', latestReading: '45 %', unit: '%', status: 'Online', sparkline: [50, 48, 46, 45, 45, 45, 45], battery: 92, lastPing: '2 mins ago', history: generate30DaysHistory(45, 5) },
        { id: 'SPTA4', name: 'Canopy Light Penetration', latestReading: '1280 µmol', unit: 'µmol', status: 'Online', sparkline: [1200, 1250, 1280, 1280, 1280, 1280, 1280], battery: 88, lastPing: '7 mins ago', history: generate30DaysHistory(1280, 80) }
      ],
      soil: [
        { id: 'SPSA1', name: 'Soil Hydration Node', latestReading: '18 %', unit: '%', status: 'Online', sparkline: [35, 30, 25, 20, 18, 18, 18], battery: 94, lastPing: '3 mins ago', history: generate30DaysHistory(25, 8, -0.5) },
        { id: 'SPSA2', name: 'Soil Nitrogen Content', latestReading: '90 ppm', unit: 'ppm', status: 'Online', sparkline: [95, 92, 90, 90, 90, 90, 90], battery: 89, lastPing: '4 mins ago', history: generate30DaysHistory(90, 10) },
        { id: 'SPSA3', name: 'Soil Temperature Probe', latestReading: '29.5 °C', unit: '°C', status: 'Online', sparkline: [27, 28, 29, 29.5, 29.5, 29.5, 29.5], battery: 91, lastPing: '2 mins ago', history: generate30DaysHistory(29.5, 2) },
        { id: 'SPSA4', name: 'Subsurface Salinity', latestReading: '1.1 dS/m', unit: 'dS/m', status: 'Online', sparkline: [1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1], battery: 87, lastPing: '9 mins ago', history: generate30DaysHistory(1.1, 0.1) }
      ],
      water: [
        { id: 'SPWA1', name: 'Bio-Swale Water Sensor', latestReading: '1.2 m', unit: 'm', status: 'Online', sparkline: [1.3, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2], battery: 84, lastPing: '3 mins ago', history: generate30DaysHistory(1.2, 0.2) },
        { id: 'SPWA2', name: 'Aquatic DO Sensor', latestReading: '6.4 mg/L', unit: 'mg/L', status: 'Online', sparkline: [6.5, 6.4, 6.4, 6.4, 6.4, 6.4, 6.4], battery: 93, lastPing: '5 mins ago', history: generate30DaysHistory(6.4, 0.4) },
        { id: 'SPWA3', name: 'Water pH Level', latestReading: '7.4 pH', unit: 'pH', status: 'Online', sparkline: [7.3, 7.4, 7.4, 7.4, 7.4, 7.4, 7.4], battery: 89, lastPing: '2 mins ago', history: generate30DaysHistory(7.4, 0.2) },
        { id: 'SPWA4', name: 'Water Conductivity', latestReading: '450 µS/cm', unit: 'µS/cm', status: 'Offline', sparkline: [440, 450, 0, 0, 0, 0, 0], battery: 5, lastPing: '1 day ago', history: generate30DaysHistory(450, 20) }
      ],
      ambient: [
        { id: 'SPAM1', name: 'Main Entry Ambient Station', location: 'Main Gate', latestReading: 'Temp=33°C, Humidity=70%', unit: '°C & %', status: 'Online', sparkline: [31, 32, 33, 33, 33, 33, 33], battery: 95, lastPing: '2 mins ago', history: generate30DaysHistory(33, 2) },
        { id: 'SPAM2', name: 'Canopy Trail Ambient Station', location: 'North Trail', latestReading: 'Temp=31°C, Humidity=66%', unit: '°C & %', status: 'Online', sparkline: [29, 30, 31, 31, 31, 31, 31], battery: 91, lastPing: '4 mins ago', history: generate30DaysHistory(31, 2) }
      ]
    }
  },
  {
    id: 'park-jahanpanah',
    name: 'Jahanpanah Park',
    abbr: 'JP',
    division: 'South',
    zone: 'South Zone 2',
    location: 'Chirag Delhi, New Delhi',
    sensors: {
      tree: [
        { id: 'JPTA1', name: 'Canopy Temp Node #1', latestReading: '27.1 °C', unit: '°C', status: 'Online', sparkline: [26, 27, 27.1, 27.1, 27.1, 27.1, 27.1], battery: 95, lastPing: '2 mins ago', history: generate30DaysHistory(27.1, 2) },
        { id: 'JPTA2', name: 'Tree Growth Sensor', latestReading: '16.4 cm/h', unit: 'cm/h', status: 'Online', sparkline: [16, 16.2, 16.4, 16.4, 16.4, 16.4, 16.4], battery: 91, lastPing: '6 mins ago', history: generate30DaysHistory(16.4, 1) },
        { id: 'JPTA3', name: 'Canopy Density', latestReading: '88 %', unit: '%', status: 'Online', sparkline: [85, 87, 88, 88, 88, 88, 88], battery: 93, lastPing: '4 mins ago', history: generate30DaysHistory(88, 3) },
        { id: 'JPTA4', name: 'Wind Shear Canopy Sensor', latestReading: '3.4 m/s', unit: 'm/s', status: 'Online', sparkline: [3.1, 3.5, 3.4, 3.4, 3.4, 3.4, 3.4], battery: 87, lastPing: '1 min ago', history: generate30DaysHistory(3.4, 0.8) }
      ],
      soil: [
        { id: 'JPSA1', name: 'Soil Moisture Node', latestReading: '42 %', unit: '%', status: 'Online', sparkline: [40, 41, 42, 42, 42, 42, 42], battery: 92, lastPing: '3 mins ago', history: generate30DaysHistory(42, 4) },
        { id: 'JPSA2', name: 'Soil NPK Ratio', latestReading: '130/32/100', unit: 'ppm', status: 'Online', sparkline: [128, 130, 130, 130, 130, 130, 130], battery: 88, lastPing: '7 mins ago', history: generate30DaysHistory(130, 8) },
        { id: 'JPSA3', name: 'Soil pH Sensor', latestReading: '6.9 pH', unit: 'pH', status: 'Online', sparkline: [6.8, 6.9, 6.9, 6.9, 6.9, 6.9, 6.9], battery: 94, lastPing: '5 mins ago', history: generate30DaysHistory(6.9, 0.1) },
        { id: 'JPSA4', name: 'Root Soil Temperature', latestReading: '24.2 °C', unit: '°C', status: 'Online', sparkline: [23, 24, 24.2, 24.2, 24.2, 24.2, 24.2], battery: 89, lastPing: '2 mins ago', history: generate30DaysHistory(24.2, 1.5) }
      ],
      water: [
        { id: 'JPWA1', name: 'Central Stream Water Level', latestReading: '1.8 m', unit: 'm', status: 'Online', sparkline: [1.7, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8], battery: 91, lastPing: '4 mins ago', history: generate30DaysHistory(1.8, 0.2) },
        { id: 'JPWA2', name: 'Stream Dissolved Oxygen', latestReading: '7.4 mg/L', unit: 'mg/L', status: 'Online', sparkline: [7.2, 7.4, 7.4, 7.4, 7.4, 7.4, 7.4], battery: 96, lastPing: '1 min ago', history: generate30DaysHistory(7.4, 0.3) },
        { id: 'JPWA3', name: 'Water Turbidity', latestReading: '3.8 NTU', unit: 'NTU', status: 'Online', sparkline: [3.6, 3.8, 3.8, 3.8, 3.8, 3.8, 3.8], battery: 85, lastPing: '6 mins ago', history: generate30DaysHistory(3.8, 0.4) },
        { id: 'JPWA4', name: 'Water pH Balance', latestReading: '7.1 pH', unit: 'pH', status: 'Online', sparkline: [7.0, 7.1, 7.1, 7.1, 7.1, 7.1, 7.1], battery: 90, lastPing: '3 mins ago', history: generate30DaysHistory(7.1, 0.2) }
      ]
    }
  },
  {
    id: 'park-nehru',
    name: 'Nehru Botanical Park',
    abbr: 'NP',
    division: 'East',
    zone: 'East Zone 1',
    location: 'Chanakyapuri, New Delhi',
    sensors: {
      tree: [
        { id: 'NPTA1', name: 'Arboretum Canopy Node', latestReading: '26.8 °C', unit: '°C', status: 'Online', sparkline: [25, 26, 26.8, 26.8, 26.8, 26.8, 26.8], battery: 97, lastPing: '1 min ago', history: generate30DaysHistory(26.8, 2) },
        { id: 'NPTA2', name: 'Sap Flow Sensor', latestReading: '19.1 cm/h', unit: 'cm/h', status: 'Online', sparkline: [18, 19, 19.1, 19.1, 19.1, 19.1, 19.1], battery: 92, lastPing: '3 mins ago', history: generate30DaysHistory(19.1, 1) },
        { id: 'NPTA3', name: 'Canopy Light Probe', latestReading: '1350 µmol', unit: 'µmol', status: 'Online', sparkline: [1300, 1350, 1350, 1350, 1350, 1350, 1350], battery: 89, lastPing: '5 mins ago', history: generate30DaysHistory(1350, 50) },
        { id: 'NPTA4', name: 'Humidity Canopy Sensor', latestReading: '58 %', unit: '%', status: 'Online', sparkline: [56, 58, 58, 58, 58, 58, 58], battery: 94, lastPing: '2 mins ago', history: generate30DaysHistory(58, 4) }
      ],
      soil: [
        { id: 'NPSA1', name: 'Botanical Soil Hydration', latestReading: '45 %', unit: '%', status: 'Online', sparkline: [43, 44, 45, 45, 45, 45, 45], battery: 95, lastPing: '4 mins ago', history: generate30DaysHistory(45, 3) },
        { id: 'NPSA2', name: 'Soil Organic NPK', latestReading: '145/40/110', unit: 'ppm', status: 'Online', sparkline: [140, 145, 145, 145, 145, 145, 145], battery: 91, lastPing: '2 mins ago', history: generate30DaysHistory(145, 5) },
        { id: 'NPSA3', name: 'Soil pH Sensor', latestReading: '6.7 pH', unit: 'pH', status: 'Online', sparkline: [6.6, 6.7, 6.7, 6.7, 6.7, 6.7, 6.7], battery: 96, lastPing: '6 mins ago', history: generate30DaysHistory(6.7, 0.1) },
        { id: 'NPSA4', name: 'Soil Temp Node', latestReading: '23.8 °C', unit: '°C', status: 'Online', sparkline: [22, 23, 23.8, 23.8, 23.8, 23.8, 23.8], battery: 88, lastPing: '1 min ago', history: generate30DaysHistory(23.8, 1.2) }
      ],
      water: [
        { id: 'NPWA1', name: 'Botanical Lake Sensor', latestReading: '2.1 m', unit: 'm', status: 'Online', sparkline: [2.0, 2.1, 2.1, 2.1, 2.1, 2.1, 2.1], battery: 93, lastPing: '3 mins ago', history: generate30DaysHistory(2.1, 0.1) },
        { id: 'NPWA2', name: 'Lake Dissolved Oxygen', latestReading: '7.8 mg/L', unit: 'mg/L', status: 'Online', sparkline: [7.5, 7.8, 7.8, 7.8, 7.8, 7.8, 7.8], battery: 98, lastPing: '2 mins ago', history: generate30DaysHistory(7.8, 0.3) },
        { id: 'NPWA3', name: 'Water Turbidity', latestReading: '3.1 NTU', unit: 'NTU', status: 'Online', sparkline: [3.0, 3.1, 3.1, 3.1, 3.1, 3.1, 3.1], battery: 87, lastPing: '5 mins ago', history: generate30DaysHistory(3.1, 0.2) },
        { id: 'NPWA4', name: 'Water Temperature', latestReading: '21.5 °C', unit: '°C', status: 'Online', sparkline: [21, 21.5, 21.5, 21.5, 21.5, 21.5, 21.5], battery: 90, lastPing: '7 mins ago', history: generate30DaysHistory(21.5, 1) }
      ]
    }
  },
  {
    id: 'park-indira',
    name: 'Indira Park',
    abbr: 'IP',
    division: 'West',
    zone: 'West Zone 1',
    location: 'Janakpuri, New Delhi',
    sensors: {
      tree: [
        { id: 'IPTA1', name: 'Canopy Node #1', latestReading: '27.9 °C', unit: '°C', status: 'Online', sparkline: [27, 28, 27.9, 27.9, 27.9, 27.9, 27.9], battery: 91, lastPing: '2 mins ago', history: generate30DaysHistory(27.9, 2) },
        { id: 'IPTA2', name: 'Tree Growth Probe', latestReading: '15.8 cm/h', unit: 'cm/h', status: 'Online', sparkline: [15, 15.5, 15.8, 15.8, 15.8, 15.8, 15.8], battery: 86, lastPing: '5 mins ago', history: generate30DaysHistory(15.8, 1) },
        { id: 'IPTA3', name: 'Canopy Density', latestReading: '81 %', unit: '%', status: 'Online', sparkline: [80, 81, 81, 81, 81, 81, 81], battery: 89, lastPing: '3 mins ago', history: generate30DaysHistory(81, 4) },
        { id: 'IPTA4', name: 'PAR Solar Node', latestReading: '1310 µmol', unit: 'µmol', status: 'Online', sparkline: [1300, 1310, 1310, 1310, 1310, 1310, 1310], battery: 93, lastPing: '8 mins ago', history: generate30DaysHistory(1310, 60) }
      ],
      soil: [
        { id: 'IPSA1', name: 'Soil Moisture Probe', latestReading: '36 %', unit: '%', status: 'Online', sparkline: [35, 36, 36, 36, 36, 36, 36], battery: 94, lastPing: '1 min ago', history: generate30DaysHistory(36, 4) },
        { id: 'IPSA2', name: 'Soil NPK Content', latestReading: '125/28/95', unit: 'ppm', status: 'Online', sparkline: [120, 125, 125, 125, 125, 125, 125], battery: 88, lastPing: '4 mins ago', history: generate30DaysHistory(125, 6) },
        { id: 'IPSA3', name: 'Soil pH Sensor', latestReading: '6.9 pH', unit: 'pH', status: 'Online', sparkline: [6.8, 6.9, 6.9, 6.9, 6.9, 6.9, 6.9], battery: 90, lastPing: '6 mins ago', history: generate30DaysHistory(6.9, 0.2) },
        { id: 'IPSA4', name: 'Subsoil Temp Probe', latestReading: '24.9 °C', unit: '°C', status: 'Online', sparkline: [24, 25, 24.9, 24.9, 24.9, 24.9, 24.9], battery: 85, lastPing: '2 mins ago', history: generate30DaysHistory(24.9, 1.5) }
      ],
      water: [
        { id: 'IPWA1', name: 'Fountain Pond Reservoir', latestReading: '1.6 m', unit: 'm', status: 'Online', sparkline: [1.5, 1.6, 1.6, 1.6, 1.6, 1.6, 1.6], battery: 92, lastPing: '3 mins ago', history: generate30DaysHistory(1.6, 0.2) },
        { id: 'IPWA2', name: 'Water Dissolved Oxygen', latestReading: '6.9 mg/L', unit: 'mg/L', status: 'Online', sparkline: [6.8, 6.9, 6.9, 6.9, 6.9, 6.9, 6.9], battery: 95, lastPing: '1 min ago', history: generate30DaysHistory(6.9, 0.3) },
        { id: 'IPWA3', name: 'Water Turbidity', latestReading: '4.5 NTU', unit: 'NTU', status: 'Online', sparkline: [4.4, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5], battery: 84, lastPing: '7 mins ago', history: generate30DaysHistory(4.5, 0.5) },
        { id: 'IPWA4', name: 'Water Temp Sensor', latestReading: '22.8 °C', unit: '°C', status: 'Online', sparkline: [22, 23, 22.8, 22.8, 22.8, 22.8, 22.8], battery: 89, lastPing: '4 mins ago', history: generate30DaysHistory(22.8, 1.2) }
      ]
    }
  },
  {
    id: 'park-deer',
    name: 'Deer Park',
    abbr: 'DP',
    division: 'South',
    zone: 'South Zone 3',
    location: 'Hauz Khas, New Delhi',
    sensors: {
      tree: [
        { id: 'DPTA1', name: 'Hauz Khas Canopy Node', latestReading: '26.4 °C', unit: '°C', status: 'Online', sparkline: [25, 26, 26.4, 26.4, 26.4, 26.4, 26.4], battery: 96, lastPing: '2 mins ago', history: generate30DaysHistory(26.4, 2) },
        { id: 'DPTA2', name: 'Sap Flow Sensor', latestReading: '17.8 cm/h', unit: 'cm/h', status: 'Online', sparkline: [17, 17.5, 17.8, 17.8, 17.8, 17.8, 17.8], battery: 91, lastPing: '4 mins ago', history: generate30DaysHistory(17.8, 1) },
        { id: 'DPTA3', name: 'Canopy Density', latestReading: '86 %', unit: '%', status: 'Online', sparkline: [84, 85, 86, 86, 86, 86, 86], battery: 93, lastPing: '1 min ago', history: generate30DaysHistory(86, 3) },
        { id: 'DPTA4', name: 'Solar PAR Probe', latestReading: '1380 µmol', unit: 'µmol', status: 'Online', sparkline: [1350, 1380, 1380, 1380, 1380, 1380, 1380], battery: 90, lastPing: '6 mins ago', history: generate30DaysHistory(1380, 50) }
      ],
      soil: [
        { id: 'DPSA1', name: 'Soil Hydration Sensor', latestReading: '40 %', unit: '%', status: 'Online', sparkline: [38, 39, 40, 40, 40, 40, 40], battery: 95, lastPing: '3 mins ago', history: generate30DaysHistory(40, 4) },
        { id: 'DPSA2', name: 'Soil NPK Ratio', latestReading: '138/34/108', unit: 'ppm', status: 'Online', sparkline: [135, 138, 138, 138, 138, 138, 138], battery: 89, lastPing: '5 mins ago', history: generate30DaysHistory(138, 6) },
        { id: 'DPSA3', name: 'Soil pH Sensor', latestReading: '6.8 pH', unit: 'pH', status: 'Online', sparkline: [6.7, 6.8, 6.8, 6.8, 6.8, 6.8, 6.8], battery: 92, lastPing: '2 mins ago', history: generate30DaysHistory(6.8, 0.1) },
        { id: 'DPSA4', name: 'Soil Temp Probe', latestReading: '23.5 °C', unit: '°C', status: 'Online', sparkline: [22, 23, 23.5, 23.5, 23.5, 23.5, 23.5], battery: 87, lastPing: '8 mins ago', history: generate30DaysHistory(23.5, 1.2) }
      ],
      water: [
        { id: 'DPWA1', name: 'Hauz Khas Lake Level', latestReading: '3.2 m', unit: 'm', status: 'Online', sparkline: [3.1, 3.2, 3.2, 3.2, 3.2, 3.2, 3.2], battery: 94, lastPing: '1 min ago', history: generate30DaysHistory(3.2, 0.3) },
        { id: 'DPWA2', name: 'Lake Dissolved Oxygen', latestReading: '7.6 mg/L', unit: 'mg/L', status: 'Online', sparkline: [7.4, 7.6, 7.6, 7.6, 7.6, 7.6, 7.6], battery: 97, lastPing: '3 mins ago', history: generate30DaysHistory(7.6, 0.4) },
        { id: 'DPWA3', name: 'Lake Turbidity Probe', latestReading: '3.4 NTU', unit: 'NTU', status: 'Online', sparkline: [3.3, 3.4, 3.4, 3.4, 3.4, 3.4, 3.4], battery: 88, lastPing: '5 mins ago', history: generate30DaysHistory(3.4, 0.3) },
        { id: 'DPWA4', name: 'Lake Water Temperature', latestReading: '21.8 °C', unit: '°C', status: 'Online', sparkline: [21, 22, 21.8, 21.8, 21.8, 21.8, 21.8], battery: 91, lastPing: '4 mins ago', history: generate30DaysHistory(21.8, 1) }
      ]
    }
  }
];

// FORESTS DATASET
export const FORESTS_LIST = [
  {
    id: 'forest-ridge',
    name: 'Central Ridge Forest',
    abbr: 'CF',
    division: 'North',
    zone: 'North Zone 2',
    location: 'Dhaula Kuan, Delhi',
    sensors: {
      tree: [
        { id: 'CFTA1', name: 'Ridge Dense Canopy Node', latestReading: '25.8 °C', unit: '°C', status: 'Online', sparkline: [24, 25, 25.8, 25.8, 25.8, 25.8, 25.8], battery: 95, lastPing: '2 mins ago', history: generate30DaysHistory(25.8, 2) },
        { id: 'CFTA2', name: 'Tree Trunk Expansion', latestReading: '21.4 cm/h', unit: 'cm/h', status: 'Online', sparkline: [20, 21, 21.4, 21.4, 21.4, 21.4, 21.4], battery: 90, lastPing: '4 mins ago', history: generate30DaysHistory(21.4, 1.5) },
        { id: 'CFTA3', name: 'Wild Canopy Density', latestReading: '92 %', unit: '%', status: 'Online', sparkline: [90, 91, 92, 92, 92, 92, 92], battery: 94, lastPing: '1 min ago', history: generate30DaysHistory(92, 3) },
        { id: 'CFTA4', name: 'Solar PAR Absorption', latestReading: '1510 µmol', unit: 'µmol', status: 'Online', sparkline: [1480, 1510, 1510, 1510, 1510, 1510, 1510], battery: 88, lastPing: '6 mins ago', history: generate30DaysHistory(1510, 70) }
      ],
      soil: [
        { id: 'CFSA1', name: 'Ridge Soil Hydration', latestReading: '55 %', unit: '%', status: 'Online', sparkline: [52, 54, 55, 55, 55, 55, 55], battery: 96, lastPing: '3 mins ago', history: generate30DaysHistory(55, 4) },
        { id: 'CFSA2', name: 'Organic NPK Balance', latestReading: '150/45/120', unit: 'ppm', status: 'Online', sparkline: [145, 150, 150, 150, 150, 150, 150], battery: 92, lastPing: '5 mins ago', history: generate30DaysHistory(150, 8) },
        { id: 'CFSA3', name: 'Soil pH Sensor', latestReading: '6.6 pH', unit: 'pH', status: 'Online', sparkline: [6.5, 6.6, 6.6, 6.6, 6.6, 6.6, 6.6], battery: 91, lastPing: '2 mins ago', history: generate30DaysHistory(6.6, 0.1) },
        { id: 'CFSA4', name: 'Subsoil Temp Probe', latestReading: '22.4 °C', unit: '°C', status: 'Online', sparkline: [21, 22, 22.4, 22.4, 22.4, 22.4, 22.4], battery: 87, lastPing: '8 mins ago', history: generate30DaysHistory(22.4, 1.2) }
      ],
      water: [
        { id: 'CFWA1', name: 'Forest Stream Level', latestReading: '1.9 m', unit: 'm', status: 'Online', sparkline: [1.8, 1.9, 1.9, 1.9, 1.9, 1.9, 1.9], battery: 93, lastPing: '4 mins ago', history: generate30DaysHistory(1.9, 0.2) },
        { id: 'CFWA2', name: 'Stream Dissolved Oxygen', latestReading: '7.9 mg/L', unit: 'mg/L', status: 'Online', sparkline: [7.6, 7.9, 7.9, 7.9, 7.9, 7.9, 7.9], battery: 97, lastPing: '1 min ago', isAlert: true, history: generate30DaysHistory(7.9, 0.3) },
        { id: 'CFWA3', name: 'Water Turbidity', latestReading: '2.8 NTU', unit: 'NTU', status: 'Online', sparkline: [2.7, 2.8, 2.8, 2.8, 2.8, 2.8, 2.8], battery: 89, lastPing: '6 mins ago', history: generate30DaysHistory(2.8, 0.2) },
        { id: 'CFWA4', name: 'Water Temperature', latestReading: '20.9 °C', unit: '°C', status: 'Online', sparkline: [20, 20.9, 20.9, 20.9, 20.9, 20.9, 20.9], battery: 92, lastPing: '3 mins ago', history: generate30DaysHistory(20.9, 1) }
      ]
    }
  },
  {
    id: 'forest-asola',
    name: 'Asola Bhatti Sanctuary Forest',
    abbr: 'AF',
    division: 'South',
    zone: 'South Zone 2',
    location: 'Southern Ridge, New Delhi',
    sensors: {
      tree: [
        { id: 'AFTA1', name: 'Sanctuary Canopy Node', latestReading: '26.5 °C', unit: '°C', status: 'Online', sparkline: [25, 26, 26.5, 26.5, 26.5, 26.5, 26.5], battery: 94, lastPing: '2 mins ago', history: generate30DaysHistory(26.5, 2) },
        { id: 'AFTA2', name: 'Tree Trunk Strain', latestReading: '19.8 cm/h', unit: 'cm/h', status: 'Online', sparkline: [19, 19.5, 19.8, 19.8, 19.8, 19.8, 19.8], battery: 89, lastPing: '5 mins ago', history: generate30DaysHistory(19.8, 1.2) },
        { id: 'AFTA3', name: 'Canopy Coverage Index', latestReading: '89 %', unit: '%', status: 'Online', sparkline: [87, 88, 89, 89, 89, 89, 89], battery: 92, lastPing: '3 mins ago', history: generate30DaysHistory(89, 3) },
        { id: 'AFTA4', name: 'Solar PAR Absorption', latestReading: '1460 µmol', unit: 'µmol', status: 'Online', sparkline: [1430, 1460, 1460, 1460, 1460, 1460, 1460], battery: 87, lastPing: '7 mins ago', history: generate30DaysHistory(1460, 50) }
      ],
      soil: [
        { id: 'AFSA1', name: 'Sanctuary Soil Hydration', latestReading: '48 %', unit: '%', status: 'Online', sparkline: [46, 47, 48, 48, 48, 48, 48], battery: 95, lastPing: '1 min ago', history: generate30DaysHistory(48, 4) },
        { id: 'AFSA2', name: 'Soil NPK Ratio', latestReading: '140/38/115', unit: 'ppm', status: 'Online', sparkline: [135, 140, 140, 140, 140, 140, 140], battery: 91, lastPing: '4 mins ago', history: generate30DaysHistory(140, 6) },
        { id: 'AFSA3', name: 'Soil pH Sensor', latestReading: '6.7 pH', unit: 'pH', status: 'Online', sparkline: [6.6, 6.7, 6.7, 6.7, 6.7, 6.7, 6.7], battery: 93, lastPing: '6 mins ago', history: generate30DaysHistory(6.7, 0.1) },
        { id: 'AFSA4', name: 'Subsoil Temp Node', latestReading: '23.1 °C', unit: '°C', status: 'Online', sparkline: [22, 23, 23.1, 23.1, 23.1, 23.1, 23.1], battery: 88, lastPing: '2 mins ago', history: generate30DaysHistory(23.1, 1.2) }
      ],
      water: [
        { id: 'AFWA1', name: 'Bhatti Pit Reservoir Sensor', latestReading: '4.5 m', unit: 'm', status: 'Online', sparkline: [4.4, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5], battery: 96, lastPing: '3 mins ago', history: generate30DaysHistory(4.5, 0.4) },
        { id: 'AFWA2', name: 'Reservoir DO Level', latestReading: '7.5 mg/L', unit: 'mg/L', status: 'Online', sparkline: [7.3, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5], battery: 98, lastPing: '1 min ago', history: generate30DaysHistory(7.5, 0.3) },
        { id: 'AFWA3', name: 'Water Turbidity Index', latestReading: '3.2 NTU', unit: 'NTU', status: 'Online', sparkline: [3.0, 3.2, 3.2, 3.2, 3.2, 3.2, 3.2], battery: 86, lastPing: '5 mins ago', history: generate30DaysHistory(3.2, 0.2) },
        { id: 'AFWA4', name: 'Water Temperature Probe', latestReading: '21.2 °C', unit: '°C', status: 'Online', sparkline: [20.5, 21.2, 21.2, 21.2, 21.2, 21.2, 21.2], battery: 90, lastPing: '7 mins ago', history: generate30DaysHistory(21.2, 1) }
      ]
    }
  },
  {
    id: 'forest-aravalli',
    name: 'Aravalli Bio Forest',
    abbr: 'AB',
    division: 'East',
    zone: 'East Zone 2',
    location: 'Gurugram Border, Haryana',
    sensors: {
      tree: [
        { id: 'ABTA1', name: 'Bio Canopy Sensor #1', latestReading: '28.2 °C', unit: '°C', status: 'Online', sparkline: [27, 28, 28.2, 28.2, 28.2, 28.2, 28.2], battery: 90, lastPing: '3 mins ago', history: generate30DaysHistory(28.2, 3) },
        { id: 'ABTA2', name: 'Sap Flow Sensor', latestReading: '17.1 cm/h', unit: 'cm/h', status: 'Online', sparkline: [16.5, 17, 17.1, 17.1, 17.1, 17.1, 17.1], battery: 85, lastPing: '6 mins ago', history: generate30DaysHistory(17.1, 1) },
        { id: 'ABTA3', name: 'Canopy Density', latestReading: '83 %', unit: '%', status: 'Online', sparkline: [81, 82, 83, 83, 83, 83, 83], battery: 89, lastPing: '2 mins ago', history: generate30DaysHistory(83, 4) },
        { id: 'ABTA4', name: 'Solar PAR Absorption', latestReading: '1410 µmol', unit: 'µmol', status: 'Online', sparkline: [1380, 1410, 1410, 1410, 1410, 1410, 1410], battery: 92, lastPing: '4 mins ago', history: generate30DaysHistory(1410, 60) }
      ],
      soil: [
        { id: 'ABSA1', name: 'Bio Soil Hydration', latestReading: '37 %', unit: '%', status: 'Online', sparkline: [35, 36, 37, 37, 37, 37, 37], battery: 93, lastPing: '1 min ago', history: generate30DaysHistory(37, 4) },
        { id: 'ABSA2', name: 'Soil NPK Ratio', latestReading: '128/30/100', unit: 'ppm', status: 'Online', sparkline: [125, 128, 128, 128, 128, 128, 128], battery: 87, lastPing: '5 mins ago', history: generate30DaysHistory(128, 7) },
        { id: 'ABSA3', name: 'Soil pH Sensor', latestReading: '6.9 pH', unit: 'pH', status: 'Online', sparkline: [6.8, 6.9, 6.9, 6.9, 6.9, 6.9, 6.9], battery: 91, lastPing: '3 mins ago', history: generate30DaysHistory(6.9, 0.1) },
        { id: 'ABSA4', name: 'Soil Temperature Node', latestReading: '24.8 °C', unit: '°C', status: 'Online', sparkline: [24, 24.8, 24.8, 24.8, 24.8, 24.8, 24.8], battery: 86, lastPing: '8 mins ago', history: generate30DaysHistory(24.8, 1.5) }
      ],
      water: [
        { id: 'ABWA1', name: 'Stream Sensor Node', latestReading: '1.4 m', unit: 'm', status: 'Online', sparkline: [1.3, 1.4, 1.4, 1.4, 1.4, 1.4, 1.4], battery: 91, lastPing: '2 mins ago', history: generate30DaysHistory(1.4, 0.2) },
        { id: 'ABWA2', name: 'Stream DO Level', latestReading: '6.8 mg/L', unit: 'mg/L', status: 'Online', sparkline: [6.6, 6.8, 6.8, 6.8, 6.8, 6.8, 6.8], battery: 95, lastPing: '4 mins ago', history: generate30DaysHistory(6.8, 0.4) },
        { id: 'ABWA3', name: 'Water Turbidity', latestReading: '4.1 NTU', unit: 'NTU', status: 'Online', sparkline: [4.0, 4.1, 4.1, 4.1, 4.1, 4.1, 4.1], battery: 84, lastPing: '7 mins ago', history: generate30DaysHistory(4.1, 0.3) },
        { id: 'ABWA4', name: 'Water Temperature Probe', latestReading: '22.4 °C', unit: '°C', status: 'Online', sparkline: [21.5, 22.4, 22.4, 22.4, 22.4, 22.4, 22.4], battery: 89, lastPing: '3 mins ago', history: generate30DaysHistory(22.4, 1.2) }
      ]
    }
  },
  {
    id: 'forest-kamla-nehru',
    name: 'Kamla Nehru North Ridge',
    abbr: 'KN',
    division: 'North',
    zone: 'North Zone 1',
    location: 'North Ridge, New Delhi',
    sensors: {
      tree: [
        { id: 'KNTA1', name: 'North Ridge Canopy Node', latestReading: '25.2 °C', unit: '°C', status: 'Online', sparkline: [24, 25, 25.2, 25.2, 25.2, 25.2, 25.2], battery: 96, lastPing: '2 mins ago', history: generate30DaysHistory(25.2, 2) },
        { id: 'KNTA2', name: 'Tree Growth Probe', latestReading: '20.5 cm/h', unit: 'cm/h', status: 'Online', sparkline: [19, 20, 20.5, 20.5, 20.5, 20.5, 20.5], battery: 92, lastPing: '4 mins ago', history: generate30DaysHistory(20.5, 1.5) },
        { id: 'KNTA3', name: 'Canopy Density Index', latestReading: '91 %', unit: '%', status: 'Online', sparkline: [89, 90, 91, 91, 91, 91, 91], battery: 95, lastPing: '1 min ago', history: generate30DaysHistory(91, 2) },
        { id: 'KNTA4', name: 'PAR Solar Node', latestReading: '1490 µmol', unit: 'µmol', status: 'Online', sparkline: [1460, 1490, 1490, 1490, 1490, 1490, 1490], battery: 89, lastPing: '5 mins ago', history: generate30DaysHistory(1490, 50) }
      ],
      soil: [
        { id: 'KNSA1', name: 'Ridge Soil Hydration', latestReading: '54 %', unit: '%', status: 'Online', sparkline: [52, 53, 54, 54, 54, 54, 54], battery: 97, lastPing: '2 mins ago', history: generate30DaysHistory(54, 3) },
        { id: 'KNSA2', name: 'Soil NPK Ratio', latestReading: '148/42/118', unit: 'ppm', status: 'Online', sparkline: [142, 148, 148, 148, 148, 148, 148], battery: 93, lastPing: '4 mins ago', history: generate30DaysHistory(148, 6) },
        { id: 'KNSA3', name: 'Soil pH Sensor', latestReading: '6.6 pH', unit: 'pH', status: 'Online', sparkline: [6.5, 6.6, 6.6, 6.6, 6.6, 6.6, 6.6], battery: 91, lastPing: '6 mins ago', history: generate30DaysHistory(6.6, 0.1) },
        { id: 'KNSA4', name: 'Subsoil Temp Node', latestReading: '22.1 °C', unit: '°C', status: 'Online', sparkline: [21, 22, 22.1, 22.1, 22.1, 22.1, 22.1], battery: 88, lastPing: '1 min ago', history: generate30DaysHistory(22.1, 1) }
      ],
      water: [
        { id: 'KNWA1', name: 'Ridge Reservoir Level', latestReading: '2.2 m', unit: 'm', status: 'Online', sparkline: [2.1, 2.2, 2.2, 2.2, 2.2, 2.2, 2.2], battery: 94, lastPing: '3 mins ago', history: generate30DaysHistory(2.2, 0.3) },
        { id: 'KNWA2', name: 'Stream DO Level', latestReading: '7.8 mg/L', unit: 'mg/L', status: 'Online', sparkline: [7.6, 7.8, 7.8, 7.8, 7.8, 7.8, 7.8], battery: 98, lastPing: '1 min ago', history: generate30DaysHistory(7.8, 0.2) },
        { id: 'KNWA3', name: 'Water Turbidity', latestReading: '2.9 NTU', unit: 'NTU', status: 'Online', sparkline: [2.7, 2.9, 2.9, 2.9, 2.9, 2.9, 2.9], battery: 89, lastPing: '5 mins ago', history: generate30DaysHistory(2.9, 0.2) },
        { id: 'KNWA4', name: 'Water Temperature Probe', latestReading: '20.2 °C', unit: '°C', status: 'Online', sparkline: [19.5, 20.2, 20.2, 20.2, 20.2, 20.2, 20.2], battery: 92, lastPing: '2 mins ago', history: generate30DaysHistory(20.2, 0.8) }
      ]
    }
  },
  {
    id: 'forest-jahanpanah',
    name: 'Jahanpanah City Forest',
    abbr: 'JC',
    division: 'South',
    zone: 'South Zone 1',
    location: 'Mehrauli, New Delhi',
    sensors: {
      tree: [
        { id: 'JCTA1', name: 'Mehrauli Canopy Sensor', latestReading: '26.1 °C', unit: '°C', status: 'Online', sparkline: [25, 26, 26.1, 26.1, 26.1, 26.1, 26.1], battery: 95, lastPing: '2 mins ago', history: generate30DaysHistory(26.1, 2) },
        { id: 'JCTA2', name: 'Tree Growth Probe', latestReading: '18.9 cm/h', unit: 'cm/h', status: 'Online', sparkline: [18, 18.5, 18.9, 18.9, 18.9, 18.9, 18.9], battery: 91, lastPing: '4 mins ago', history: generate30DaysHistory(18.9, 1.5) },
        { id: 'JCTA3', name: 'Canopy Coverage Index', latestReading: '88 %', unit: '%', status: 'Online', sparkline: [86, 87, 88, 88, 88, 88, 88], battery: 93, lastPing: '1 min ago', history: generate30DaysHistory(88, 2) },
        { id: 'JCTA4', name: 'Solar PAR Sensor', latestReading: '1440 µmol', unit: 'µmol', status: 'Online', sparkline: [1410, 1440, 1440, 1440, 1440, 1440, 1440], battery: 90, lastPing: '6 mins ago', history: generate30DaysHistory(1440, 40) }
      ],
      soil: [
        { id: 'JCSA1', name: 'City Forest Soil Hydration', latestReading: '46 %', unit: '%', status: 'Online', sparkline: [44, 45, 46, 46, 46, 46, 46], battery: 96, lastPing: '2 mins ago', history: generate30DaysHistory(46, 3) },
        { id: 'JCSA2', name: 'Soil NPK Content', latestReading: '136/36/112', unit: 'ppm', status: 'Online', sparkline: [130, 136, 136, 136, 136, 136, 136], battery: 92, lastPing: '5 mins ago', history: generate30DaysHistory(136, 5) },
        { id: 'JCSA3', name: 'Soil pH Sensor', latestReading: '6.8 pH', unit: 'pH', status: 'Online', sparkline: [6.7, 6.8, 6.8, 6.8, 6.8, 6.8, 6.8], battery: 94, lastPing: '3 mins ago', history: generate30DaysHistory(6.8, 0.1) },
        { id: 'JCSA4', name: 'Subsoil Temperature Node', latestReading: '23.4 °C', unit: '°C', status: 'Online', sparkline: [22.5, 23, 23.4, 23.4, 23.4, 23.4, 23.4], battery: 89, lastPing: '7 mins ago', history: generate30DaysHistory(23.4, 1) }
      ],
      water: [
        { id: 'JCWA1', name: 'Eco Pond Level', latestReading: '2.5 m', unit: 'm', status: 'Online', sparkline: [2.4, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5], battery: 93, lastPing: '1 min ago', history: generate30DaysHistory(2.5, 0.3) },
        { id: 'JCWA2', name: 'Pond Dissolved Oxygen', latestReading: '7.5 mg/L', unit: 'mg/L', status: 'Online', sparkline: [7.3, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5], battery: 97, lastPing: '3 mins ago', history: generate30DaysHistory(7.5, 0.2) },
        { id: 'JCWA3', name: 'Water Turbidity Index', latestReading: '3.4 NTU', unit: 'NTU', status: 'Online', sparkline: [3.2, 3.4, 3.4, 3.4, 3.4, 3.4, 3.4], battery: 87, lastPing: '4 mins ago', history: generate30DaysHistory(3.4, 0.3) },
        { id: 'JCWA4', name: 'Water Temperature Probe', latestReading: '21.6 °C', unit: '°C', status: 'Online', sparkline: [20.8, 21.6, 21.6, 21.6, 21.6, 21.6, 21.6], battery: 91, lastPing: '2 mins ago', history: generate30DaysHistory(21.6, 0.8) }
      ]
    }
  },
  {
    id: 'forest-sanjay-van',
    name: 'Sanjay Van',
    abbr: 'SV',
    division: 'South',
    zone: 'South Zone 2',
    location: 'Vasant Kunj, New Delhi',
    sensors: {
      tree: [
        { id: 'SVTA1', name: 'Vasant Kunj Canopy Node', latestReading: '25.9 °C', unit: '°C', status: 'Online', sparkline: [25, 25.5, 25.9, 25.9, 25.9, 25.9, 25.9], battery: 96, lastPing: '2 mins ago', history: generate30DaysHistory(25.9, 2) },
        { id: 'SVTA2', name: 'Tree Sap Flow Sensor', latestReading: '20.0 cm/h', unit: 'cm/h', status: 'Online', sparkline: [19, 19.8, 20.0, 20.0, 20.0, 20.0, 20.0], battery: 92, lastPing: '3 mins ago', history: generate30DaysHistory(20.0, 1.5) },
        { id: 'SVTA3', name: 'Canopy Density Index', latestReading: '90 %', unit: '%', status: 'Online', sparkline: [88, 89, 90, 90, 90, 90, 90], battery: 94, lastPing: '1 min ago', history: generate30DaysHistory(90, 2) },
        { id: 'SVTA4', name: 'PAR Solar Absorption', latestReading: '1470 µmol', unit: 'µmol', status: 'Online', sparkline: [1440, 1470, 1470, 1470, 1470, 1470, 1470], battery: 89, lastPing: '5 mins ago', history: generate30DaysHistory(1470, 50) }
      ],
      soil: [
        { id: 'SVSA1', name: 'Forest Soil Hydration', latestReading: '50 %', unit: '%', status: 'Online', sparkline: [48, 49, 50, 50, 50, 50, 50], battery: 95, lastPing: '2 mins ago', history: generate30DaysHistory(50, 3) },
        { id: 'SVSA2', name: 'Soil NPK Content', latestReading: '142/40/114', unit: 'ppm', status: 'Online', sparkline: [138, 142, 142, 142, 142, 142, 142], battery: 91, lastPing: '4 mins ago', history: generate30DaysHistory(142, 5) },
        { id: 'SVSA3', name: 'Soil pH Sensor', latestReading: '6.7 pH', unit: 'pH', status: 'Online', sparkline: [6.6, 6.7, 6.7, 6.7, 6.7, 6.7, 6.7], battery: 93, lastPing: '3 mins ago', history: generate30DaysHistory(6.7, 0.1) },
        { id: 'SVSA4', name: 'Subsoil Temp Node', latestReading: '22.8 °C', unit: '°C', status: 'Online', sparkline: [22, 22.8, 22.8, 22.8, 22.8, 22.8, 22.8], battery: 88, lastPing: '8 mins ago', history: generate30DaysHistory(22.8, 1) }
      ],
      water: [
        { id: 'SVWA1', name: 'Lal Kot Pond Water Level', latestReading: '2.4 m', unit: 'm', status: 'Online', sparkline: [2.3, 2.4, 2.4, 2.4, 2.4, 2.4, 2.4], battery: 94, lastPing: '1 min ago', history: generate30DaysHistory(2.4, 0.3) },
        { id: 'SVWA2', name: 'Pond Dissolved Oxygen', latestReading: '7.7 mg/L', unit: 'mg/L', status: 'Online', sparkline: [7.5, 7.7, 7.7, 7.7, 7.7, 7.7, 7.7], battery: 98, lastPing: '3 mins ago', history: generate30DaysHistory(7.7, 0.2) },
        { id: 'SVWA3', name: 'Water Turbidity Index', latestReading: '3.0 NTU', unit: 'NTU', status: 'Online', sparkline: [2.8, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0], battery: 88, lastPing: '4 mins ago', history: generate30DaysHistory(3.0, 0.3) },
        { id: 'SVWA4', name: 'Water Temperature Probe', latestReading: '21.0 °C', unit: '°C', status: 'Online', sparkline: [20, 21.0, 21.0, 21.0, 21.0, 21.0, 21.0], battery: 92, lastPing: '2 mins ago', history: generate30DaysHistory(21.0, 0.8) }
      ]
    }
  }
];

// LITTER DETECTION DATASET
export const LITTER_SITES = [
  // PARKS (6)
  {
    id: 'park-lodhi',
    name: 'Lodhi Park',
    type: 'Park',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80',
    cameraCount: 5,
    cameras: [
      {
        id: 'cam-lp-1',
        name: 'Camera 1 — Main Gate',
        location: 'North Entrance Gate',
        streamUrl: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=1200&q=80',
        detectionsCount: 2,
        boundingBoxes: [
          { id: 'b1', label: 'Single-use Plastic Bottle', confidence: 94.2, box: { top: '38%', left: '42%', width: '16%', height: '22%' }, status: 'Pending' },
          { id: 'b2', label: 'Discarded Polythene Bag', confidence: 89.5, box: { top: '55%', left: '60%', width: '14%', height: '18%' }, status: 'Cleaned' }
        ],
        detectionCards: [
          { id: 'dc-1', snapshot: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=400&q=80', item: 'Single-use Plastic Bottle', confidence: 94.2, timestamp: '2026-08-30 11:42 AM', status: 'Pending' },
          { id: 'dc-2', snapshot: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=400&q=80', item: 'Discarded Polythene Bag', confidence: 89.5, timestamp: '2026-08-30 10:15 AM', status: 'Cleaned' }
        ]
      },
      {
        id: 'cam-lp-2',
        name: 'Camera 2 — North Trail',
        location: 'Heritage Oak Pathway',
        streamUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
        detectionsCount: 1,
        boundingBoxes: [
          { id: 'b3', label: 'Beverage Can', confidence: 92.1, box: { top: '48%', left: '30%', width: '12%', height: '16%' }, status: 'Pending' }
        ],
        detectionCards: [
          { id: 'dc-3', snapshot: 'https://images.unsplash.com/photo-1604186837056-8e7c286756f2?auto=format&fit=crop&w=400&q=80', item: 'Beverage Can', confidence: 92.1, timestamp: '2026-08-30 09:30 AM', status: 'Pending' }
        ]
      },
      {
        id: 'cam-lp-3',
        name: 'Camera 3 — Picnic Zone',
        location: 'Central Lawn Gazebo',
        streamUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        detectionsCount: 1,
        boundingBoxes: [
          { id: 'b4', label: 'Food Wrapper Package', confidence: 96.0, box: { top: '62%', left: '50%', width: '18%', height: '20%' }, status: 'Cleaned' }
        ],
        detectionCards: [
          { id: 'dc-4', snapshot: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=400&q=80', item: 'Food Wrapper Package', confidence: 96.0, timestamp: '2026-08-30 08:20 AM', status: 'Cleaned' }
        ]
      },
      {
        id: 'cam-lp-4',
        name: 'Camera 4 — Parking Lot',
        location: 'South Visitor Parking',
        streamUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        detectionsCount: 0,
        boundingBoxes: [],
        detectionCards: []
      },
      {
        id: 'cam-lp-5',
        name: 'Camera 5 — East Entrance',
        location: 'East Gate Walkway',
        streamUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
        detectionsCount: 1,
        boundingBoxes: [
          { id: 'b5', label: 'Paper Cup Container', confidence: 88.7, box: { top: '40%', left: '35%', width: '15%', height: '18%' }, status: 'Pending' }
        ],
        detectionCards: [
          { id: 'dc-5', snapshot: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=400&q=80', item: 'Paper Cup Container', confidence: 88.7, timestamp: '2026-08-30 11:05 AM', status: 'Pending' }
        ]
      }
    ]
  },
  {
    id: 'park-sanjay',
    name: 'Sanjay Park',
    type: 'Park',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    cameraCount: 5,
    cameras: [
      {
        id: 'cam-sp-1',
        name: 'Camera 1 — Main Gate',
        location: 'Vasant Kunj Entrance',
        streamUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
        detectionsCount: 1,
        boundingBoxes: [
          { id: 'b6', label: 'Plastic Water Bottle', confidence: 95.1, box: { top: '50%', left: '45%', width: '16%', height: '22%' }, status: 'Pending' }
        ],
        detectionCards: [
          { id: 'dc-6', snapshot: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=400&q=80', item: 'Plastic Water Bottle', confidence: 95.1, timestamp: '2026-08-30 10:45 AM', status: 'Pending' }
        ]
      },
      { id: 'cam-sp-2', name: 'Camera 2 — North Trail', location: 'Canopy Walking Track', streamUrl: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] },
      { id: 'cam-sp-3', name: 'Camera 3 — Picnic Zone', location: 'Lake View Seating Area', streamUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', detectionsCount: 1, boundingBoxes: [{ id: 'b7', label: 'Cardboard Box', confidence: 91.4, box: { top: '52%', left: '55%', width: '18%', height: '20%' }, status: 'Cleaned' }], detectionCards: [{ id: 'dc-7', snapshot: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=400&q=80', item: 'Cardboard Box', confidence: 91.4, timestamp: '2026-08-30 07:45 AM', status: 'Cleaned' }] },
      { id: 'cam-sp-4', name: 'Camera 4 — Parking Lot', location: 'Visitor Lot Alpha', streamUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] },
      { id: 'cam-sp-5', name: 'Camera 5 — East Entrance', location: 'Bio-diversity East Entry', streamUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] }
    ]
  },
  {
    id: 'park-jahanpanah',
    name: 'Jahanpanah Park',
    type: 'Park',
    image: 'https://images.unsplash.com/photo-1511497584788-876761c119ef?auto=format&fit=crop&w=800&q=80',
    cameraCount: 5,
    cameras: [
      { id: 'cam-jp-1', name: 'Camera 1 — Main Gate', location: 'North Gate Trail', streamUrl: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] },
      { id: 'cam-jp-2', name: 'Camera 2 — North Trail', location: 'Green Jogging Track', streamUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] },
      { id: 'cam-jp-3', name: 'Camera 3 — Picnic Zone', location: 'Shaded Bench Area', streamUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] },
      { id: 'cam-jp-4', name: 'Camera 4 — Parking Lot', location: 'South Gate Parking', streamUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] },
      { id: 'cam-jp-5', name: 'Camera 5 — East Entrance', location: 'East Perimeter Gate', streamUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] }
    ]
  },
  {
    id: 'park-nehru',
    name: 'Nehru Botanical Park',
    type: 'Park',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
    cameraCount: 5,
    cameras: [
      { id: 'cam-np-1', name: 'Camera 1 — Main Gate', location: 'Botanical Entrance', streamUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] },
      { id: 'cam-np-2', name: 'Camera 2 — North Trail', location: 'Rose Garden Trail', streamUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] },
      { id: 'cam-np-3', name: 'Camera 3 — Picnic Zone', location: 'Central Lawn Gazebo', streamUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] },
      { id: 'cam-np-4', name: 'Camera 4 — Parking Lot', location: 'Chanakyapuri Lot', streamUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] },
      { id: 'cam-np-5', name: 'Camera 5 — East Entrance', location: 'Nursery East Entry', streamUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] }
    ]
  },
  {
    id: 'park-indira',
    name: 'Indira Park',
    type: 'Park',
    image: 'https://images.unsplash.com/photo-1596796946840-4144e648233d?auto=format&fit=crop&w=800&q=80',
    cameraCount: 5,
    cameras: [
      { id: 'cam-ip-1', name: 'Camera 1 — Main Gate', location: 'Janakpuri Main Gate', streamUrl: 'https://images.unsplash.com/photo-1596796946840-4144e648233d?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] },
      { id: 'cam-ip-2', name: 'Camera 2 — North Trail', location: 'Children Play Track', streamUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] },
      { id: 'cam-ip-3', name: 'Camera 3 — Picnic Zone', location: 'Fountain Square', streamUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] },
      { id: 'cam-ip-4', name: 'Camera 4 — Parking Lot', location: 'Visitor Parking Lot', streamUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] },
      { id: 'cam-ip-5', name: 'Camera 5 — East Entrance', location: 'West Gate Entrance', streamUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] }
    ]
  },
  {
    id: 'park-deer',
    name: 'Deer Park',
    type: 'Park',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
    cameraCount: 5,
    cameras: [
      { id: 'cam-dp-1', name: 'Camera 1 — Main Gate', location: 'Hauz Khas Entrance', streamUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] },
      { id: 'cam-dp-2', name: 'Camera 2 — North Trail', location: 'Deer Enclosure Walkway', streamUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] },
      { id: 'cam-dp-3', name: 'Camera 3 — Picnic Zone', location: 'Lake View Overlook', streamUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] },
      { id: 'cam-dp-4', name: 'Camera 4 — Parking Lot', location: 'Hauz Khas Village Parking', streamUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] },
      { id: 'cam-dp-5', name: 'Camera 5 — East Entrance', location: 'Monument Pathway Gate', streamUrl: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] }
    ]
  },

  // FORESTS (6)
  {
    id: 'forest-ridge',
    name: 'Central Ridge Forest',
    type: 'Forest',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    cameraCount: 5,
    cameras: [
      {
        id: 'cam-cf-1',
        name: 'Camera 1 — Main Gate',
        location: 'Chanakyapuri Forest Gate',
        streamUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
        detectionsCount: 1,
        boundingBoxes: [
          { id: 'b8', label: 'Discarded Glass Bottle', confidence: 93.8, box: { top: '44%', left: '38%', width: '15%', height: '21%' }, status: 'Pending' }
        ],
        detectionCards: [
          { id: 'dc-8', snapshot: 'https://images.unsplash.com/photo-1604186837056-8e7c286756f2?auto=format&fit=crop&w=400&q=80', item: 'Discarded Glass Bottle', confidence: 93.8, timestamp: '2026-08-30 11:20 AM', status: 'Pending' }
        ]
      },
      { id: 'cam-cf-2', name: 'Camera 2 — North Trail', location: 'Ridge Perimeter Trail', streamUrl: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] },
      { id: 'cam-cf-3', name: 'Camera 3 — Picnic Zone', location: 'Ridge Clearing Viewpoint', streamUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] },
      { id: 'cam-cf-4', name: 'Camera 4 — Parking Lot', location: 'North Ridge Parking', streamUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] },
      { id: 'cam-cf-5', name: 'Camera 5 — East Entrance', location: 'Dhaula Kuan Ridge Entry', streamUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] }
    ]
  },
  {
    id: 'forest-asola',
    name: 'Asola Bhatti Sanctuary',
    type: 'Forest',
    image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80',
    cameraCount: 5,
    cameras: [
      { id: 'cam-af-1', name: 'Camera 1 — Main Gate', location: 'Tughlaqabad Sanctuary Gate', streamUrl: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] },
      { id: 'cam-af-2', name: 'Camera 2 — North Trail', location: 'Bhatti Mines Ridge', streamUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] },
      { id: 'cam-af-3', name: 'Camera 3 — Picnic Zone', location: 'Neelkanth Lake Trail', streamUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] },
      { id: 'cam-af-4', name: 'Camera 4 — Parking Lot', location: 'Sanctuary Entry Lot', streamUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] },
      { id: 'cam-af-5', name: 'Camera 5 — East Entrance', location: 'Surajkund Border Gate', streamUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] }
    ]
  },
  {
    id: 'forest-aravalli',
    name: 'Aravalli Bio Forest',
    type: 'Forest',
    image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=800&q=80',
    cameraCount: 5,
    cameras: [
      { id: 'cam-ab-1', name: 'Camera 1 — Main Gate', location: 'Gurugram Border Entrance', streamUrl: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] },
      { id: 'cam-ab-2', name: 'Camera 2 — North Trail', location: 'Bio-diversity Ridge Trail', streamUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] },
      { id: 'cam-ab-3', name: 'Camera 3 — Picnic Zone', location: 'Native Nursery Zone', streamUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] },
      { id: 'cam-ab-4', name: 'Camera 4 — Parking Lot', location: 'Aravalli Visitor Lot', streamUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] },
      { id: 'cam-ab-5', name: 'Camera 5 — East Entrance', location: 'Mehrauli Gurgaon Gate', streamUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] }
    ]
  },
  {
    id: 'forest-kamla-nehru',
    name: 'Kamla Nehru North Ridge',
    type: 'Forest',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80',
    cameraCount: 5,
    cameras: [
      { id: 'cam-kn-1', name: 'Camera 1 — Main Gate', location: 'DU North Campus Gate', streamUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] },
      { id: 'cam-kn-2', name: 'Camera 2 — North Trail', location: 'Flagstaff Tower Trail', streamUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] },
      { id: 'cam-kn-3', name: 'Camera 3 — Picnic Zone', location: 'Khooni Khan Jheel Viewpoint', streamUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] },
      { id: 'cam-kn-4', name: 'Camera 4 — Parking Lot', location: 'Vice Regal Parking', streamUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] },
      { id: 'cam-kn-5', name: 'Camera 5 — East Entrance', location: 'Civil Lines Gate', streamUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] }
    ]
  },
  {
    id: 'forest-jahanpanah',
    name: 'Jahanpanah City Forest',
    type: 'Forest',
    image: 'https://images.unsplash.com/photo-1511497584788-876761c119ef?auto=format&fit=crop&w=800&q=80',
    cameraCount: 5,
    cameras: [
      { id: 'cam-jcf-1', name: 'Camera 1 — Main Gate', location: 'Alaknanda Gate', streamUrl: 'https://images.unsplash.com/photo-1511497584788-876761c119ef?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] },
      { id: 'cam-jcf-2', name: 'Camera 2 — North Trail', location: 'Central Forest Loop', streamUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] },
      { id: 'cam-jcf-3', name: 'Camera 3 — Picnic Zone', location: 'Chirag Delhi Canopy Gazebo', streamUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] },
      { id: 'cam-jcf-4', name: 'Camera 4 — Parking Lot', location: 'GK Part 2 Visitor Lot', streamUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] },
      { id: 'cam-jcf-5', name: 'Camera 5 — East Entrance', location: 'Tughlaqabad Extension Gate', streamUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] }
    ]
  },
  {
    id: 'forest-sanjay-van',
    name: 'Sanjay Van',
    type: 'Forest',
    image: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=800&q=80',
    cameraCount: 5,
    cameras: [
      { id: 'cam-svf-1', name: 'Camera 1 — Main Gate', location: 'Qutub Institutional Gate', streamUrl: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] },
      { id: 'cam-svf-2', name: 'Camera 2 — North Trail', location: 'Lal Kot Wall Trail', streamUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] },
      { id: 'cam-svf-3', name: 'Camera 3 — Picnic Zone', location: 'Sufi Shrine Viewpoint', streamUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] },
      { id: 'cam-svf-4', name: 'Camera 4 — Parking Lot', location: 'Vasant Kunj Forest Parking', streamUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] },
      { id: 'cam-svf-5', name: 'Camera 5 — East Entrance', location: 'Aruna Asaf Ali Gate', streamUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80', detectionsCount: 0, boundingBoxes: [], detectionCards: [] }
    ]
  }
];

// ALERTS DATASET
export const ALERT_SITES = [
  {
    id: 'park-lodhi',
    name: 'Lodhi Park',
    type: 'Park',
    activeAlertsCount: 2,
    hasActiveAlerts: true,
    issues: [
      {
        id: 'iss-1',
        title: 'Soil Moisture critically low — Sensor LPSA2 (23%)',
        description: 'Moisture reading in Sector 2 dropped to 23% (N=31, P=12, K=22), triggering critical hydration alert.',
        affectedSensorId: 'LPSA2',
        sensorType: 'Soil Nutrients & Hydration Node',
        location: 'Lodhi Park — Sector 2 (North Lawn)',
        severity: 'Critical',
        timeAgo: '12 mins ago',
        timestamp: '2026-08-30 12:18 PM',
        status: 'Active',
        abnormalTrend: generateAbnormalTrend(58, 23),
        actionLogs: [
          { officer: 'System Telemetry Monitor', timestamp: '2026-08-30 12:18 PM', action: 'Critical low moisture threshold (< 25%) reached on LPSA2.' }
        ]
      },
      {
        id: 'iss-2',
        title: 'Telemetry Node Offline — Sensor LPTA4',
        description: 'Tree Growth sensor LPTA4 (0.3mm growth) reported offline ping status.',
        affectedSensorId: 'LPTA4',
        sensorType: 'Tree Growth Node',
        location: 'Lodhi Park — East Canopy Sector 4',
        severity: 'Warning',
        timeAgo: '4 hours ago',
        timestamp: '2026-08-30 08:30 AM',
        status: 'Active',
        abnormalTrend: generateAbnormalTrend(1.5, 0.3),
        actionLogs: [
          { officer: 'System Telemetry Monitor', timestamp: '2026-08-30 08:30 AM', action: 'Heartbeat timeout. Device classified as Offline.' }
        ]
      }
    ]
  },
  {
    id: 'park-sanjay',
    name: 'Sanjay Park',
    type: 'Park',
    activeAlertsCount: 1,
    hasActiveAlerts: true,
    issues: [
      {
        id: 'iss-3',
        title: 'Thermal Spike Detected — Sensor SPTA1',
        description: 'Canopy temperature anomaly reached 34.1 °C in Dense Forest Canopy Sector B.',
        affectedSensorId: 'SPTA1',
        sensorType: 'Canopy Thermal Node',
        location: 'Sanjay Park — Sector B Dense Canopy',
        severity: 'Critical',
        timeAgo: '35 mins ago',
        timestamp: '2026-08-30 11:55 AM',
        status: 'Active',
        abnormalTrend: generateAbnormalTrend(27, 34.1),
        actionLogs: [
          { officer: 'System Telemetry Monitor', timestamp: '2026-08-30 11:55 AM', action: 'Thermal threshold (+5°C spike) exceeded.' }
        ]
      }
    ]
  },
  {
    id: 'forest-ridge',
    name: 'Central Ridge Forest',
    type: 'Forest',
    activeAlertsCount: 2,
    hasActiveAlerts: true,
    issues: [
      {
        id: 'iss-4',
        title: 'Aquatic Dissolved Oxygen Spike — Sensor CFWA2',
        description: 'Stream oxygen telemetry spiked above normal range reaching 7.9 mg/L rapidly.',
        affectedSensorId: 'CFWA2',
        sensorType: 'Stream Dissolved Oxygen Node',
        location: 'Central Ridge Forest — North Stream Basin',
        severity: 'Warning',
        timeAgo: '48 mins ago',
        timestamp: '2026-08-30 11:42 AM',
        status: 'Active',
        abnormalTrend: generateAbnormalTrend(6.2, 7.9),
        actionLogs: [
          { officer: 'System Telemetry Monitor', timestamp: '2026-08-30 11:42 AM', action: 'Dissolved oxygen anomaly flagged.' }
        ]
      },
      {
        id: 'iss-5',
        title: 'Unattended Trash Accumulation — Camera #cam-cf-1',
        description: 'AI Litter Inspector camera #cam-cf-1 flagged uncleaned glass bottle waste.',
        affectedSensorId: 'cam-cf-1',
        sensorType: 'AI Litter Camera',
        location: 'Central Ridge Forest — Main Gate Trail',
        severity: 'Warning',
        timeAgo: '1 hour ago',
        timestamp: '2026-08-30 11:20 AM',
        status: 'Active',
        abnormalTrend: generateAbnormalTrend(0, 93.8),
        actionLogs: [
          { officer: 'AI Camera Stream', timestamp: '2026-08-30 11:20 AM', action: 'High confidence waste item detected (93.8%).' }
        ]
      }
    ]
  },
  {
    id: 'park-nehru',
    name: 'Nehru Botanical Park',
    type: 'Park',
    activeAlertsCount: 0,
    hasActiveAlerts: false,
    issues: []
  },
  {
    id: 'forest-asola',
    name: 'Asola Bhatti Sanctuary Forest',
    type: 'Forest',
    activeAlertsCount: 0,
    hasActiveAlerts: false,
    issues: []
  },
  {
    id: 'park-deer',
    name: 'Deer Park',
    type: 'Park',
    activeAlertsCount: 0,
    hasActiveAlerts: false,
    issues: []
  }
];

export const SENSOR_SUMMARY = [
  {
    id: "temp",
    title: "Ambient Temperature",
    value: "34 °C",
    unit: "°C",
    status: "Optimal",
    change: "+1.2° vs yesterday",
    isWarning: false,
    sparkline: [32, 33, 34, 34, 34, 34, 34]
  },
  {
    id: "moisture",
    title: "Soil Moisture",
    value: "23 %",
    unit: "%",
    status: "Low Threshold (LPSA2)",
    change: "Critical Alert Active",
    isWarning: true,
    sparkline: [48, 40, 32, 26, 23, 23, 23]
  },
  {
    id: "npk",
    title: "Soil NPK Ratio",
    value: "N=42, P=18, K=28",
    unit: "ppm",
    status: "Balanced Nutrients",
    change: "Normal Range",
    isWarning: false,
    sparkline: [40, 41, 42, 42, 42, 42, 42]
  },
  {
    id: "humidity",
    title: "Relative Humidity",
    value: "72 %",
    unit: "%",
    status: "Healthy",
    change: "+3% vs yesterday",
    isWarning: false,
    sparkline: [68, 70, 72, 72, 72, 72, 72]
  }
];

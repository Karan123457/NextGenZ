const COLLEGES = [
  {
    id: 'gp-delhi',
    name: 'Government Polytechnic Delhi',
    type: 'Government',
    city: 'New Delhi',
    state: 'Delhi',
    fees: 12000,
    placementRate: 78,
    avgPackageLPA: 3.2,
    courses: [
      { name: 'CSE', seats: 60, cutoffRank: 9500, exam: 'Delhi CET 2024' },
      { name: 'ECE', seats: 60, cutoffRank: 12500, exam: 'Delhi CET 2024' },
      { name: 'ME', seats: 60, cutoffRank: 18000, exam: 'Delhi CET 2024' },
    ],
    howToReach: {
      nearestMetro: 'Rajiv Chowk (Blue/Yellow)',
      nearestRail: 'New Delhi Jn (NDLS) ~5 km',
      nearestAirport: 'IGI Airport ~18 km',
      map: 'https://maps.google.com/?q=Government+Polytechnic+Delhi'
    },
    website: '#',
  },
  {
    id: 'govt-poly-pune',
    name: 'Government Polytechnic Pune',
    type: 'Government',
    city: 'Pune',
    state: 'Maharashtra',
    fees: 8000,
    placementRate: 82,
    avgPackageLPA: 3.8,
    courses: [
      { name: 'CSE', seats: 60, cutoffRank: 7000, exam: 'MHT CET (Poly) 2024' },
      { name: 'IT', seats: 60, cutoffRank: 7800, exam: 'MHT CET (Poly) 2024' },
      { name: 'EE', seats: 60, cutoffRank: 12000, exam: 'MHT CET (Poly) 2024' },
    ],
    howToReach: {
      nearestMetro: 'PCMC Metro',
      nearestRail: 'Pune Jn (PUNE) ~6 km',
      nearestAirport: 'Pune Intl ~12 km',
      map: 'https://maps.google.com/?q=Government+Polytechnic+Pune'
    },
    website: '#',
  },
  {
    id: 'private-blr',
    name: 'City Polytechnic Bengaluru',
    type: 'Private',
    city: 'Bengaluru',
    state: 'Karnataka',
    fees: 45000,
    placementRate: 74,
    avgPackageLPA: 2.8,
    courses: [
      { name: 'CSE', seats: 120, cutoffRank: 15000, exam: 'DCET / Mgmt' },
      { name: 'AI & ML', seats: 60, cutoffRank: 14000, exam: 'DCET / Mgmt' },
      { name: 'ECE', seats: 60, cutoffRank: 18500, exam: 'DCET / Mgmt' },
    ],
    howToReach: {
      nearestMetro: 'Majestic (Nadaprabhu Kempegowda)',
      nearestRail: 'KSR Bengaluru (SBC) ~3 km',
      nearestAirport: 'BLR ~35 km',
      map: 'https://maps.google.com/?q=Bengaluru+Polytechnic'
    },
    website: '#',
  },
  {
    id: 'govt-lucknow',
    name: 'Government Polytechnic Lucknow',
    type: 'Government',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    fees: 10000,
    placementRate: 70,
    avgPackageLPA: 2.6,
    courses: [
      { name: 'CSE', seats: 60, cutoffRank: 11000, exam: 'JEECUP 2024' },
      { name: 'Civil', seats: 60, cutoffRank: 15000, exam: 'JEECUP 2024' },
    ],
    howToReach: {
      nearestMetro: 'Charbagh',
      nearestRail: 'Lucknow Jn (LJN) ~2 km',
      nearestAirport: 'LKO ~12 km',
      map: 'https://maps.google.com/?q=Government+Polytechnic+Lucknow'
    },
    website: '#',
  },
  {
    id: 'private-noida',
    name: 'Sunrise Polytechnic Noida',
    type: 'Private',
    city: 'Noida',
    state: 'Uttar Pradesh',
    fees: 60000,
    placementRate: 85,
    avgPackageLPA: 4.2,
    courses: [
      { name: 'CSE', seats: 120, cutoffRank: 9000, exam: 'JEECUP / Mgmt' },
      { name: 'IT', seats: 60, cutoffRank: 10500, exam: 'JEECUP / Mgmt' },
    ],
    howToReach: {
      nearestMetro: 'Noida Sec-62',
      nearestRail: 'Anand Vihar ~12 km',
      nearestAirport: 'DEL ~30 km',
      map: 'https://maps.google.com/?q=Sunrise+Polytechnic+Noida'
    },
    website: '#',
  },
  {
    id: 'govt-chennai',
    name: 'Central Polytechnic College, Chennai',
    type: 'Government',
    city: 'Chennai',
    state: 'Tamil Nadu',
    fees: 6000,
    placementRate: 76,
    avgPackageLPA: 3.0,
    courses: [
      { name: 'CSE', seats: 60, cutoffRank: 8000, exam: 'TN Diploma Admissions' },
      { name: 'ECE', seats: 60, cutoffRank: 11000, exam: 'TN Diploma Admissions' },
    ],
    howToReach: {
      nearestMetro: 'Alandur',
      nearestRail: 'Chennai Egmore (MS) ~10 km',
      nearestAirport: 'MAA ~7 km',
      map: 'https://maps.google.com/?q=Central+Polytechnic+College+Chennai'
    },
    website: '#',
  },
  {
    id: 'private-kolkata',
    name: 'Eastern Institute of Polytechnic, Kolkata',
    type: 'Private',
    city: 'Kolkata',
    state: 'West Bengal',
    fees: 38000,
    placementRate: 68,
    avgPackageLPA: 2.4,
    courses: [
      { name: 'CSE', seats: 60, cutoffRank: 17500, exam: 'JEXPO / Mgmt' },
      { name: 'EE', seats: 60, cutoffRank: 21000, exam: 'JEXPO / Mgmt' },
    ],
    howToReach: {
      nearestMetro: 'Sealdah Metro',
      nearestRail: 'Sealdah (SDAH) ~2 km',
      nearestAirport: 'CCU ~13 km',
      map: 'https://maps.google.com/?q=Kolkata+Polytechnic'
    },
    website: '#',
  },
  {
    id: 'govt-jaipur',
    name: 'Government Polytechnic Jaipur',
    type: 'Government',
    city: 'Jaipur',
    state: 'Rajasthan',
    fees: 9000,
    placementRate: 72,
    avgPackageLPA: 2.7,
    courses: [
      { name: 'CSE', seats: 60, cutoffRank: 11500, exam: 'Rajasthan Diploma Admissions' },
      { name: 'ME', seats: 60, cutoffRank: 16000, exam: 'Rajasthan Diploma Admissions' },
    ],
    howToReach: {
      nearestMetro: 'Mansarovar',
      nearestRail: 'Jaipur Jn (JP) ~5 km',
      nearestAirport: 'JAI ~10 km',
      map: 'https://maps.google.com/?q=Government+Polytechnic+Jaipur'
    },
    website: '#',
  },
];

export default COLLEGES;

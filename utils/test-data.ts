export const PLAYERS = {
  valid: ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry'],
  single: 'TestPlayer',
  withSpecialChars: "O'Brien",
  longName: 'A'.repeat(50),
  withNumbers: 'Player123',
  withSpaces: '  Alice  ',
};

export const TEAM_CONFIG = {
  minPlayers: 4,
  numberOfTeams: '2',
  formats: ['Doubles', 'Singles', 'Mixed'] as const,
  assignModes: ['Random', 'Manual'] as const,
};

export const COURT_BOOKING = {
  memberName: 'TestMember',
  expenseCategories: ['Shuttle', 'Snacks', 'Miscellaneous'] as const,
};

export const SUBSCRIPTION = {
  mobileNumber: '9876543210',
  country: 'India',
  priceUSD: 'USD $15 / year',
  subscriptionMonths: '12 months',
};

export const BASE_URL = 'https://rajeshmokaalla.github.io/badminton-tournament/';

export const SECTION_HEADINGS = [
  '1. Players',
  '2. Teams',
  '3. Matches',
  '4. Standings',
  '5. Save to Cloud',
  'Past Tournaments',
  'Player Stats',
  'Admin',
  'Court Booking',
  'Group Members',
  'Add Court Booking',
  'Other Expenses',
  'Split Summary',
  'Contact Us',
  'Privacy Notice',
];

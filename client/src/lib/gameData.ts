export interface Team {
  id: number;
  name: string;
  members: string[];
  description?: string;
}

export const teams: Team[] = [
  {
    id: 1,
    name: "Wealth 360",
    members: ["Alan", "Chris", "John"],
    description: "Financial innovation team",
  },
  {
    id: 2,
    name: "Digital Identity",
    members: ["Tim", "Mark", "Manoj"],
    description: "Identity verification specialists",
  },
  {
    id: 3,
    name: "Agentic AI Adoption",
    members: ["John", "Jenny", "Megan"],
    description: "AI integration experts",
  },
  {
    id: 4,
    name: "Re-imagine Remortgage",
    members: ["Emily", "Barry"],
    description: "Mortgage process revolutionaries",
  },
  {
    id: 5,
    name: "Boss in a Box",
    members: ["Joe", "Lewis"],
    description: "Management automation pioneers",
  },
  {
    id: 6,
    name: "423",
    members: ["Chris", "Stefani", "Trien"],
    description: "Agentic AI Auth",
  },
];

// Function to get teams in different configurations
export const getTeamsConfiguration = (teamCount: number = 5): Team[] => {
  // If requesting more teams than available, duplicate some teams with different names
  if (teamCount <= teams.length) {
    return teams.slice(0, teamCount);
  }

  const extraTeams: Team[] = [
    {
      id: 6,
      name: "Future Finance",
      members: ["Sarah", "Mike", "Alex"],
      description: "Next-gen financial solutions",
    },
    {
      id: 7,
      name: "Quantum Computing",
      members: ["Lisa", "David", "Emma"],
      description: "Quantum technology research",
    },
  ];

  return [...teams, ...extraTeams].slice(0, teamCount);
};

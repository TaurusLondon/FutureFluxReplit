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
    members: ["Hannah", "Jamie A", "John S", "Katy"],
    description: "Wealth Management Dashboard",
  },
  {
    id: 2,
    name: "Digital Identity",
    members: ["Crystal", "Manoj", "Mark S", "Megan R"],
    description: "Identity verification specialists",
  },
  {
    id: 3,
    name: "Solver-as-a-service",
    members: ["Dave S", "Russel"],
    description: "Quantum",
  },
  {
    id: 4,
    name: "Re-imagine Remortgage",
    members: ["Emily", "Jas", "Yunxi"],
    description: "Mortgage process revolutionaries",
  },
  {
    id: 5,
    name: "Device Lab",
    members: ["Alan Y", "Ozy", "Invited guests: Jas, Mac,..."],
    description: "Fure devices",
  },
  {
    id: 6,
    name: "Yonder",
    members: ["Emily", "Megan R"],
    description: "Rewards",
  },
  {
    id: 7,
    name: "SME Lending",
    members: ["Barry", "John A", "Mac"],
    description: "Lending",
  },
  {
    id: 8,
    name: "Auth for Agentic AI",
    members: ["Alan Y", "Stefani", "Trien"],
    description: "Security for Agentic AI",
  },
  {
    id: 9,
    name: "Level E",
    members: ["Lizzie", "Megan H"],
    description: "Level E",
  },
  {
    id: 10,
    name: "Serene",
    members: ["Megan R", "Rajesh"],
    description: "Customer support",
  },
  {
    id: 11,
    name: "Agentic AI",
    members: ["Megan H", "Jenny", "John A"],
    description: "AI integration experts",
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

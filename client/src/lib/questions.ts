export interface QuestionBank {
  past: string[];
  present: string[];
  future: string[];
}

export interface WildcardQuestion {
  theme: string;
  title: string;
  scenario: string;
  question: string;
  image: string;
}

export type QuestionType = keyof QuestionBank;

export const questions: QuestionBank = {
  past: [
    "Theme: Advice - If you could travel back in time to meet your past selves, what piece of advice would you give?",
    "Theme: Pivot - Was there a moment where the project took a big unexpected turn? What caused it?",
    "Theme: Regrets - What’s one mistake or missed opportunity that turned out to be a great learning?",
    "Theme: Influences - What from a past project helped shape this one?",
    "Theme: Learning - What is the one thing you will take forward with you into your next project?",
  ],
  present: [
    "Theme: Current mood - If you had to describe the current state of this project as a weather forecast, what would it be?",
    "Theme: Progress - What part of the project is currently most in flow? (ie., what’s working really well?)",
    "Theme: Challenge - What’s one sticky or surprising thing you’re wrestling with right now?",
    "Theme: Collaboration - How’s the collaboration going — what’s helping or hindering?",
    "Theme: Visibility - What’s one thing you wish the wider team knew about this project?",
  ],
  future: [
    "Theme: Vision - What’s your best-case scenario for this project, no limits?",
    "Theme: Impact - If this project succeeds, what will be different for our customers or colleagues?",
    "Theme: Dream support - If you had a time-travelling extra team member from the future, what would you have them help with?",
    "Theme: Longevity - Where do you hope this project will be 12 months from now?",
  ],
};

// Function to get a random question from a specific time period
export const getRandomQuestion = (
  period: QuestionType,
  usedQuestions: string[] = [],
): string | null => {
  const availableQuestions = questions[period].filter(
    (q) => !usedQuestions.includes(q),
  );

  if (availableQuestions.length === 0) {
    return null; // No more questions available
  }

  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
  return availableQuestions[randomIndex];
};

// Function to check if there are questions remaining for a time period
export const hasQuestionsRemaining = (
  period: QuestionType,
  usedQuestions: string[] = [],
): boolean => {
  return questions[period].some((q) => !usedQuestions.includes(q));
};

// Wildcard questions for special challenges
export const wildcardQuestions: WildcardQuestion[] = [
  {
    theme: "It's a franchise mash-up!!!",
    title:
      "Uh-oh, the T1000 has arrived to destroy you. (aka a challenge or blocker or particularly ahem awkward stakeholder)",
    scenario: "You need a protector (T–800) aka Dougie.",
    question: "What do they need to do to help/protect you?",
    image: "Franchise.png",
  },
  {
    theme: "It's a franchise mash-up!!!",
    title: "FreakyFriday",
    scenario: "Swap places with the LT",
    question:
      "If this project becomes legendary, what will people say about it in hindsight?",
    image: "Freakyfriday.png",
  },
  {
    theme: "It's a franchise mash-up!!!",
    title: "Sliding Doors",
    scenario: "Swap places with the LT",
    question:
      "One small difference can change the whole course of history... If you could go back in time and change one thing about this project, what would it be?",
    image: "Slidingdoors.png",
  },
];

// Function to get a random wildcard question
export const getRandomWildcardQuestion = (): WildcardQuestion => {
  const randomIndex = Math.floor(Math.random() * wildcardQuestions.length);
  return wildcardQuestions[randomIndex];
};

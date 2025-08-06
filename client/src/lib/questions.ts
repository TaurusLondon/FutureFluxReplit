export interface QuestionBank {
  past: string[];
  present: string[];
  future: string[];
}

export type QuestionType = keyof QuestionBank;

export const questions: QuestionBank = {
  past: [
    "If you traveled to 1885, what would be the most challenging part of explaining your smartphone to a cowboy?",
    "Doc Brown needs to fix the DeLorean with 1885 technology. What creative solution would your team propose?",
    "You're stuck in the Wild West and need to prove you're from the future. What would you invent using only materials from 1885?",
    "Your team has to organize a town meeting in 1885 Hill Valley. How would you get everyone's attention without modern technology?",
    "The time machine lands in 1885 during a gold rush. How would your team ethically make money to fund repairs?",
    "You need to send a message to the future from 1885. What's your most creative solution?",
    "Your team encounters the famous outlaw Buford 'Mad Dog' Tannen. How do you outsmart him using future knowledge?",
    "The DeLorean's hover circuits are damaged in 1885. Design a replacement using Old West materials and knowledge!"
  ],
  present: [
    "It's 1985 and you need to convince someone that you're from 2024. What current technology would blow their mind the most?",
    "Your team needs to help Marty McFly blend in at Hill Valley High School in 1985. What advice do you give him?",
    "The DeLorean is broken in 1985 and you need plutonium. How does your team legally acquire the 1.21 gigawatts of power?",
    "You're at the Enchantment Under the Sea dance in 1955. Your team needs to ensure George and Lorraine fall in love. What's your backup plan?",
    "Biff has the sports almanac in 1985. How does your team create a distraction to get it back without changing history?",
    "Your team needs to fix the clock tower in 1955 Hill Valley. What's your project management approach with 1955 resources?",
    "You discover the DeLorean in 1985 but Doc Brown is missing. How does your team figure out how to operate the time machine?",
    "Your team needs to prevent someone from seeing the DeLorean fly in 1985. What's your creative cover story?"
  ],
  future: [
    "In 2015, flying cars are everywhere but your team's DeLorean can't fly. How do you navigate the skyways of Hill Valley?",
    "Your team arrives in 2024 and finds that social media has taken over everything. How do you use this to your advantage in fixing the timeline?",
    "The future has advanced AI, but you need to communicate with a simple 1985 computer. How does your team create a compatible interface?",
    "In 2025, everyone has brain-computer interfaces, but your team only has 1985 knowledge. How do you adapt and learn quickly?",
    "Your team discovers that cryptocurrency has replaced all traditional money in the future. How do you acquire future currency with past knowledge?",
    "The future has eliminated all physical books and documents. How does your team research historical events needed to fix the timeline?",
    "In the future, all transportation is autonomous. Your team needs to manually drive the DeLorean. How do you avoid detection?",
    "Your team finds that the future has strict environmental laws. How do you power the DeLorean without breaking future regulations?",
    "In 2030, virtual reality is indistinguishable from reality. How does your team tell what's real and what's not?",
    "The future has advanced medical technology that can detect time travelers. How does your team avoid medical scans while staying healthy?"
  ]
};

// Function to get a random question from a specific time period
export const getRandomQuestion = (period: QuestionType, usedQuestions: string[] = []): string | null => {
  const availableQuestions = questions[period].filter(q => !usedQuestions.includes(q));
  
  if (availableQuestions.length === 0) {
    return null; // No more questions available
  }
  
  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
  return availableQuestions[randomIndex];
};

// Function to check if there are questions remaining for a time period
export const hasQuestionsRemaining = (period: QuestionType, usedQuestions: string[] = []): boolean => {
  return questions[period].some(q => !usedQuestions.includes(q));
};

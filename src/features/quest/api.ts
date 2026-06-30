import type { TrialOption } from "./types";

interface OpenTriviaResult {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface OpenTriviaResponse {
  response_code: number;
  results: OpenTriviaResult[];
}

export interface BonusQuestion {
  question: string;
  category: string;
  difficulty: string;
  options: TrialOption[];
}

const OPEN_TRIVIA_URL =
  "https://opentdb.com/api.php?amount=1&category=18&type=multiple";

function decodeHtml(text: string): string {
  const el = document.createElement("textarea");
  el.innerHTML = text;
  return el.value;
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export async function fetchBonusQuestion(): Promise<BonusQuestion> {
  const response = await fetch(OPEN_TRIVIA_URL);

  if (!response.ok) {
    throw new Error(`Open Trivia DB responded with status ${response.status}`);
  }

  const data: OpenTriviaResponse = await response.json();

  if (data.response_code !== 0 || data.results.length === 0) {
    throw new Error("Open Trivia DB had no questions available right now.");
  }

  const result = data.results[0];

  const rawOptions = [
    { label: result.correct_answer, correct: true },
    ...result.incorrect_answers.map((label) => ({ label, correct: false }))
  ];

  const options: TrialOption[] = shuffle(rawOptions).map((opt, index) => ({
    id: String(index),
    label: decodeHtml(opt.label),
    correct: opt.correct,
    feedback: opt.correct
      ? "Correct! Nicely done on the bonus round."
      : "Not quite, that's not the right answer."
  }));

  return {
    question: decodeHtml(result.question),
    category: decodeHtml(result.category),
    difficulty: result.difficulty,
    options
  };
}

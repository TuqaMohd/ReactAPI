import { useState } from "react";
import { trialLevels } from "./data";
import type { LevelStatus } from "./types";
import LevelTracker from "./components/LevelTracker";
import QuestTitle from "./components/QuestTitle";
import AnswerOptions from "./components/AnswerOptions";
import BonusRound from "./components/BonusRound";

export default function Game() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [cleared, setCleared] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [wasCorrect, setWasCorrect] = useState<boolean | null>(null);
  const [claimed, setClaimed] = useState(false);

  const level = trialLevels.find((l) => l.id === currentLevel)!;
  const allCleared = claimed && cleared.length === trialLevels.length;

  function statusFor(id: number): LevelStatus {
    if (cleared.includes(id)) return "cleared";
    if (id === currentLevel) return "available";
    if (id < currentLevel) return "cleared";
    return "locked";
  }

  function pickOption(optionId: string) {
    if (wasCorrect) return;
    const option = level.options.find((o) => o.id === optionId)!;
    setSelectedOption(optionId);
    setFeedback(option.feedback);
    setWasCorrect(option.correct);
    if (option.correct && !cleared.includes(level.id)) {
      setCleared([...cleared, level.id]);
    }
  }

  function goToNext() {
    setSelectedOption(null);
    setFeedback(null);
    setWasCorrect(null);
    if (currentLevel < trialLevels.length) {
      setCurrentLevel(currentLevel + 1);
    }
  }

  function restart() {
    setCurrentLevel(1);
    setCleared([]);
    setSelectedOption(null);
    setFeedback(null);
    setWasCorrect(null);
    setClaimed(false);
  }

  if (allCleared) {
    return (
      <div className="text-center py-8 sm:py-10 px-2">

        <h2 className="text-xl sm:text-2xl font-bold text-gold mb-2">Congrats :D !!</h2>
        <p className="text-ink text-sm sm:text-base max-w-md mx-auto mb-4">
          You have managed to answer all three questions correctly and saved yourself the trouble of dealing with TypeScript errors.
        </p>
        <button
          onClick={restart}
          className="bg-emerald text-parchment px-5 sm:px-6 py-2 rounded hover:bg-emeraldDark text-sm sm:text-base"
        >
          Play again!
        </button>

        <div className="text-left mt-2">
          <BonusRound />
        </div>
      </div>
    );
  }

  return (
    <div>
      <LevelTracker levels={trialLevels} statusFor={statusFor} />

      <div className="bg-white border border-parchmentDark rounded-lg p-3 sm:p-5">
        <QuestTitle level={level} />

        <AnswerOptions
          options={level.options}
          selectedOption={selectedOption}
          wasCorrect={wasCorrect}
          feedback={feedback}
          onSelect={pickOption}
        />

        {wasCorrect && currentLevel < trialLevels.length && (
          <button
            onClick={goToNext}
            className="mt-4 bg-emerald text-parchment px-4 sm:px-5 py-2 rounded hover:bg-emeraldDark text-sm sm:text-base"
          >
            Next level
          </button>
        )}

        {wasCorrect && currentLevel === trialLevels.length && (
          <button
            onClick={() => setClaimed(true)}
            className="mt-4 bg-emerald text-parchment px-4 sm:px-5 py-2 rounded hover:bg-emeraldDark text-sm sm:text-base"
          >
            Finish
          </button>
        )}
      </div>
    </div>
  );
}

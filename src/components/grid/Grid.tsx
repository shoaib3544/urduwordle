import { MAX_GUESSES } from "../../constants/wordlist";
import { CompletedRow } from "./CompletedRow";
import { CurrentRow } from "./CurrentRow";
import { EmptyRow } from "./EmptyRow";

type Props = {
  guesses: string[];
  currentGuess: string;
};

export const Grid = ({ guesses, currentGuess }: Props) => {
  const empties =
    guesses.length < MAX_GUESSES - 1 ? Array.from(Array(MAX_GUESSES - 1 - guesses.length)) : [];

  return (
    <div className="pb-6">
      {guesses.map((guess, i) => (
        <CompletedRow key={i} guess={guess} />
      ))}
      {guesses.length < MAX_GUESSES && <CurrentRow guess={currentGuess} />}
      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </div>
  );
};

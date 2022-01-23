import { WORD_LENGTH } from "../../constants/wordlist";
import { Cell } from "./Cell";

export const EmptyRow = () => {
  const emptyCells = Array.from(Array(WORD_LENGTH));

  return (
    <div className="flex justify-center mb-1">
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  );
};

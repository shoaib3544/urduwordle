import { MAX_GUESSES } from "../constants/wordlist";
import { getGuessStatuses } from "./statuses";
import { solution, solutionIndex } from "./words";

export const shareStatus = (guesses: string[]) => {
  navigator.clipboard.writeText(
    "اُردل " +
      solutionIndex +
      (guesses[guesses.length-1]===solution ?  
        " - " + (guesses.length +  "/"  +  MAX_GUESSES) : "")   +
      "\n\n" +
      generateEmojiGrid(guesses) +
     "\n\nhttps://urdle.chaoticity.com"
  );
};

export const generateEmojiGrid = (guesses: string[]) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(guess);
      return "‮"+ guess
        .split("")
        .map((letter, i) => {
          switch (status[i]) {
            case "correct":
              return "🟩";
            case "present":
              return "🟨";
            default:
              return "⬛";
          }
        })
        .join("");
    })
    .join("\n");
};

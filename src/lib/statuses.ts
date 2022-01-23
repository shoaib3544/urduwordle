import { solution } from "./words";

export type CharStatus = "absent" | "present" | "correct";

export const CharValues = {
"ط" : true,
"ظ" : true,
"ئ" : true,
"ی" : true,
"ح" : true,
"ث" : true,
"ٹ" : true,
"ڑ" : true,
"غ" : true,
"ص" : true,
"ض" : true,
"پ" : true,
"ہ" : true,
"ء" : true,
"ے" : true,
"ت" : true,
"ر" : true,
"ع" : true,
"و" : true,
"ؤ" : true,
"ق" : true,
"ل" : true,
"ک" : true,
"ج" : true,
"ھ" : true,
"گ" : true,
"ف" : true,
"د" : true,
"ڈ" : true,
"س" : true,
"ا" : true,
"آ" : true,
"م" : true,
"ں" : true,
"ن" : true,
"ب" : true,
"چ" : true,
"خ" : true,
"ش" : true,
"ز" : true,
"ژ" : true,
"ذ": true};

export type CharValue = keyof typeof CharValues;

export const getStatuses = (
  guesses: string[]
): { [key: string]: CharStatus } => {
  const charObj: { [key: string]: CharStatus } = {};

  guesses.forEach((word) => {
    word.split("").forEach((letter, i) => {
      if (!solution.includes(letter)) {
        // make status absent
        return (charObj[letter] = "absent");
      }

      if (letter === solution[i]) {
        //make status correct
        return (charObj[letter] = "correct");
      }

      if (charObj[letter] !== "correct") {
        //make status present
        return (charObj[letter] = "present");
      }
    });
  });

  return charObj;
};

export const getGuessStatuses = (guess: string): CharStatus[] => {
  const splitSolution = solution.split("");
  const splitGuess = guess.split("");

  const solutionCharsTaken = splitSolution.map((_) => false);

  const statuses: CharStatus[] = Array.from(Array(guess.length));

  // handle all correct cases first
  splitGuess.forEach((letter, i) => {
    if (letter === splitSolution[i]) {
      statuses[i] = "correct";
      solutionCharsTaken[i] = true;
      return;
    }
  });

  splitGuess.forEach((letter, i) => {
    if (statuses[i]) return;

    if (!splitSolution.includes(letter)) {
      // handles the absent case
      statuses[i] = "absent";
      return;
    }

    // now we are left with "present"s
    const indexOfPresentChar = splitSolution.findIndex(
      (x, index) => x === letter && !solutionCharsTaken[index]
    );

    if (indexOfPresentChar > -1) {
      statuses[i] = "present";
      solutionCharsTaken[indexOfPresentChar] = true;
      return;
    } else {
      statuses[i] = "absent";
      return;
    }
  });

  return statuses;
};

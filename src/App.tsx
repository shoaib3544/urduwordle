import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import { useState, useEffect } from "react";
import { Alert } from "./components/alerts/Alert";
import { Grid } from "./components/grid/Grid";
import { Keyboard } from "./components/keyboard/Keyboard";
import { InfoModal } from "./components/modals/InfoModal";
import { GameEndModal } from "./components/modals/GameEndModal";
import { isWordInWordList, isWinningWord, solution } from "./lib/words";
import { MAX_GUESSES, WORD_LENGTH } from "./constants/wordlist";
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from "./lib/localStorage";

function App() {
  
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameEnd, setIsGameEnd] = useState(false);
  const [isWinModalOpen, setIsWinModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false);
  const [shareComplete, setShareComplete] = useState(false);
  
  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded?.solution !== solution) {
      return []
    }
    if (loaded.guesses.includes(solution)) {
      setIsGameEnd(true)
    }
    return loaded.guesses
  })

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution });
  }, [guesses]);

  useEffect(() => {
    if (isGameEnd) {
      setIsWinModalOpen(true);
    }
  }, [isGameEnd]);

  useEffect(() => {
    if (guesses.length>0 && isWinningWord(guesses[guesses.length-1])) {
      return setIsGameEnd(true);
    } else if (guesses.length === MAX_GUESSES ) {
      return setIsGameEnd(true);
    }
  }, [guesses]);

  const onChar = (value: string) => {
    if (currentGuess.length < WORD_LENGTH && guesses.length < MAX_GUESSES) {
      setCurrentGuess(`${currentGuess}${value}`);
    }
  };

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const onEnter = () => {
    if (!isWordInWordList(currentGuess)) {
      setIsWordNotFoundAlertOpen(true);
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false);
      }, 2000);
    }

    const winningWord = isWinningWord(currentGuess);

    if (currentGuess.length === WORD_LENGTH && guesses.length < MAX_GUESSES && !isGameEnd) {
      setGuesses([...guesses, currentGuess]);
      setCurrentGuess("");

      if (winningWord || guesses.length === MAX_GUESSES - 1) {
        return setIsGameEnd(true);
      }
    }
  };

  return (
    <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <Alert message="یہ لفظ نہیں ملا" isOpen={isWordNotFoundAlertOpen} />
      <Alert
        message="گیم کلپ بورڈ پر کاپی ہو گئی ہے"
        isOpen={shareComplete}
        variant="success"
      />
      <div className="flex w-80 mx-auto items-center mb-8">
        <h1 className="text-xl grow font-bold">اُردل</h1>
        <QuestionMarkCircleIcon
          className="h-6 w-6 cursor-pointer flip"
          onClick={() => setIsInfoModalOpen(true)}
        />
      </div>
      <Grid guesses={guesses} currentGuess={currentGuess} />
      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={guesses}
      />
      <GameEndModal
        isOpen={isWinModalOpen}
        handleClose={() => setIsWinModalOpen(false)}
        guesses={guesses}
        handleShare={() => {
          setIsWinModalOpen(false);
          setShareComplete(true);
          return setTimeout(() => {
            setShareComplete(false);
          }, 5000);
        }}
      />
      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
      />
    </div>
  );
}

export default App;

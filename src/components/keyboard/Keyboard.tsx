import { KeyValue } from "../../lib/keyboard";
import { CharValues, getStatuses } from "../../lib/statuses";
import { Key } from "./Key";
import { useEffect } from "react";
import { ArrowSmRightIcon, BackspaceIcon } from "@heroicons/react/outline";

type Props = {
  onChar: (value: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  guesses: string[];
};

export const Keyboard = ({ onChar, onDelete, onEnter, guesses }: Props) => {
  const charStatuses = getStatuses(guesses);

  const onClick = (value: KeyValue) => {
    if (value === "ENTER") {
      onEnter();
    } else if (value === "DELETE") {
      onDelete();
    } else {
      onChar(value);
    }
  };

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === "Enter") {
        onEnter();
      } else if (e.code === "Backspace") {
        onDelete();
      } else {
        const key = e.key;
        if (key.length === 1 && key in CharValues) {
          onChar(key);
        }
      }
    };
    window.addEventListener("keyup", listener);
    return () => {
      window.removeEventListener("keyup", listener);
    };
  }, [onEnter, onDelete, onChar]);

  return (
    <div className="keyboard">
      <div className="flex justify-center mb-1">
        <Key value="ض" onClick={onClick} status={charStatuses["ض"]} />
        <Key value="ص" onClick={onClick} status={charStatuses["ص"]} /> 
        <Key value="غ" onClick={onClick} status={charStatuses["غ"]} />
        <Key value="ژ" onClick={onClick} status={charStatuses["ژ"]} />        
        <Key value="ڑ" onClick={onClick} status={charStatuses["ڑ"]} />
        <Key value="ٹ" onClick={onClick} status={charStatuses["ٹ"]} />
        <Key value="ث" onClick={onClick} status={charStatuses["ث"]} />
        <Key value="ح" onClick={onClick} status={charStatuses["ح"]} />
        <Key value="ئ" onClick={onClick} status={charStatuses["ئ"]} />
        <Key value="ظ" onClick={onClick} status={charStatuses["ظ"]} />
        <Key value="ط" onClick={onClick} status={charStatuses["ط"]} />
      </div>
      <div className="flex justify-center mb-1">
        <Key value="ق" onClick={onClick} status={charStatuses["ق"]} />      
        <Key value="و" onClick={onClick} status={charStatuses["و"]} />
        <Key value="ع" onClick={onClick} status={charStatuses["ع"]} />
        <Key value="ر" onClick={onClick} status={charStatuses["ر"]} />
        <Key value="ت" onClick={onClick} status={charStatuses["ت"]} />
        <Key value="ے" onClick={onClick} status={charStatuses["ے"]} />
        <Key value="ء" onClick={onClick} status={charStatuses["ء"]} />
        <Key value="ی" onClick={onClick} status={charStatuses["ی"]} />
        <Key value="ہ" onClick={onClick} status={charStatuses["ہ"]} />
        <Key value="پ" onClick={onClick} status={charStatuses["پ"]} />
      </div>
      <div className="flex justify-center mb-1">
        <Key value="ا" onClick={onClick} status={charStatuses["ا"]} />
        <Key value="آ" onClick={onClick} status={charStatuses["آ"]} />
        <Key value="س" onClick={onClick} status={charStatuses["س"]} />
        <Key value="ڈ" onClick={onClick} status={charStatuses["ڈ"]} />        
        <Key value="د" onClick={onClick} status={charStatuses["د"]} />
        <Key value="ف" onClick={onClick} status={charStatuses["ف"]} />
        <Key value="گ" onClick={onClick} status={charStatuses["گ"]} />
        <Key value="ھ" onClick={onClick} status={charStatuses["ھ"]} />
        <Key value="ج" onClick={onClick} status={charStatuses["ج"]} />
        <Key value="ک" onClick={onClick} status={charStatuses["ک"]} />
        <Key value="ل" onClick={onClick} status={charStatuses["ل"]} />
      </div>
      <div className="flex justify-center">
        <Key classNames="enter-key" value="ENTER" onClick={onClick}><ArrowSmRightIcon/></Key>
        <Key value="ذ" onClick={onClick} status={charStatuses["ذ"]} />
        <Key value="ز" onClick={onClick} status={charStatuses["ز"]} />
        <Key value="ش" onClick={onClick} status={charStatuses["ش"]} />        
        <Key value="خ" onClick={onClick} status={charStatuses["خ"]} />
        <Key value="چ" onClick={onClick} status={charStatuses["چ"]} />
        <Key value="ط" onClick={onClick} status={charStatuses["ط"]} />
        <Key value="ب" onClick={onClick} status={charStatuses["ب"]} />
        <Key value="ں" onClick={onClick} status={charStatuses["ں"]} />
        <Key value="ن" onClick={onClick} status={charStatuses["ن"]} />
        <Key value="م" onClick={onClick} status={charStatuses["م"]} />
        <Key classNames="delete-key " value="DELETE" onClick={onClick}><BackspaceIcon/></Key>
      </div>
    </div>
  );
};

import classNames from "classnames";
import { EmojiHappyIcon, EmojiSadIcon } from "@heroicons/react/outline";

type Props = {
  isHappy: boolean;
};


export const Emoji = ({ isHappy = true }: Props) => {
  const classes = classNames(
    "mx-auto flex items-center justify-center h-12 w-12 rounded-full",
    {
      "bg-rose-200": !isHappy,
      "bg-green-200": isHappy,
    }
  );
  const emoji = isHappy ? <EmojiHappyIcon/> : <EmojiSadIcon/>;
  return  <div className={classes}>
    {emoji}
  </div>
};

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Cell } from "../grid/Cell";
import { XCircleIcon } from "@heroicons/react/outline";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={handleClose}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
            <div className="absolute left-4 top-4">
                <XCircleIcon
                  className="h-6 w-6 cursor-pointer"
                  onClick={() => handleClose()}
                />
              </div>
              <div>
                <div className="text-center">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    کھیلنے کا طریقہ
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      لفظ 6 باریوں میں بوجھیں۔ ہر باری کے بعد حروف کا رنگ یہ بتائے گا
                      کہ آپ کا اندازہ کتنا صحیح تھا۔
                    </p>

                    <div className="flex justify-center mb-1 mt-4">
                      <Cell value="ا" status="correct" />
                      <Cell value="ر" />
                      <Cell value="د" />
                      <Cell value="و" />
                    </div>
                    <p className="text-sm text-gray-500">
                    <b className="text-rose-600">ا</b> لفظ میں اپنی جگہ پر ہے
                    </p>

                    <div className="flex justify-center mb-1 mt-4">
                      <Cell value="د" />
                      <Cell value="۱" />
                      <Cell value="ر" status="present" />
                      <Cell value="و" />
                    </div>
                    <p className="text-sm text-gray-500">
                    <b className="text-rose-600">ر</b> لفظ میں ہے لیکن اس جگہ پر نہیں 
                    </p>

                    <div className="flex justify-center mb-1 mt-4">
                      <Cell value="م" />
                      <Cell value="ن" />
                      <Cell value="گ" />
                      <Cell value="ل" status="absent" />
                    </div>
                    <p className="text-sm text-gray-500">
                    <b className="text-rose-600">ل</b> لفظ میں کہیں نہیں ہے
                    </p>
                  </div>
                </div>
                <div className="mt-2 text-center pt-4">
                    <p className="text-sm text-gray-500">
                      یہ گیم  &nbsp;
                      <a
                        href="https://www.powerlanguage.co.uk/wordle/"
                        className="underline font-bold"
                      >Wordle</a>&nbsp; کا اردو ورژن ہے۔ 
                        اس کا &nbsp;
                      <a
                        href="https://github.com/awaisathar/wordle"
                        className="underline font-bold"
                      >
                        اوپن سورس کوڈ
                      </a>{" "}
                          ایک &nbsp;
                      <a
                        href="https://github.com/hannahcode/wordle"
                        className="underline font-bold"
                      >انگریزی ورژن  
                      </a>{" "}
                        سے اخذ شدہ ہے۔
                      </p>
                  </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

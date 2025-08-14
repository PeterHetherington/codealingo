import * as React from "react"
import { Dialog } from "radix-ui";
import { Cross1Icon } from "@radix-ui/react-icons";

export default  function ModalForReading( {  }) {


  return (
<div>
          <Dialog.Root>
            <Dialog.Trigger>
              <button className="flex items-center rounded-md p-1 gap-1  text-3xl cursor-pointer" >Start the lesson</button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/60" />
              <Dialog.Content className="fixed bg-gray-700 p-8 rounded-md shadow left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
                <Dialog.Close>
                  <div className="flex items-center justify-between w-80 px-3 pb-3">
                    <Dialog.Title className=" text-xl text-white">
                      Pre-reading
                    </Dialog.Title>
                    	<Dialog.Description className="text-gray-400">
					Here are the readings for this lesson. Please read them before starting the questions.
          Click on "Continue" when you are done.
				</Dialog.Description>
                    <div className="">
                      .....
                      <Cross1Icon />
                    </div>
                  </div>
                       <button className="bg-red-500 text-white px-4 py-2 rounded-md mb-4"><Link href="" >Continue</Link></button>
                </Dialog.Close>
           
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>

  )}
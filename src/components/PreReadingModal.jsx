import { Dialog } from "radix-ui";
import { FaBookOpen } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

export default function PreReadingModal({ prereadings }) {
  // https://www.radix-ui.com/primitives/docs/guides/composition
  //   centering a div trick https://medium.com/design-bootcamp/simplifying-centering-of-divs-with-tailwind-css-98f43f7383a5
  return (
    <div>
      <Dialog.Root>
        {/* Button */}
        <Dialog.Trigger asChild>
          <FaBookOpen
            className="flex items-center rounded-md p-1 gap-1"
            // onClick={() => console.log("TriggerClicked")}
          />
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/60" />

          <Dialog.Content className="fixed bg-gray-700 p-8 rounded-md w-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
            {/* Header and close button */}
            <div className="flex justify-between items-center mb-6">
              <Dialog.Title className="text-2x1 font-bold">
                Pre-reading
              </Dialog.Title>
              <Dialog.Close asChild>
                <button
                  className="hover:bg-gray-600 rounded-full p-1"
                  aria-label="close"
                >
                  <IoMdClose />
                </button>
              </Dialog.Close>
            </div>

            {/* Actual content here */}

            <div className="space-y-4">
              {prereadings.map((prereading) => (
                <div key={prereading.id} className="bg-gray-800 p-4 rounded">
                  <p>{prereading.content}</p>
                </div>
              ))}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

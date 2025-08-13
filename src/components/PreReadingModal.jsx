"use client";

import { Dialog } from "radix-ui";
import { FaBookOpen } from "react-icons/fa";

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
            onClick={() => console.log("TriggerClicked")}
          />
        </Dialog.Trigger>

        <Dialog.Overlay className="fixed inset-0 bg-black/60" />
        <Dialog.Content className="fixed bg-gray-700 p-8 rounded-md w-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></Dialog.Content>
      </Dialog.Root>
    </div>
  );
}

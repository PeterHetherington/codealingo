import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 content-center justify-items-center">
      <SignUp />
    </div>
  );
}

import { SignupForm } from "@/components/signup-form"

export default function SignupPage() {
  return (
    <div className="flex h-svh flex-col items-center justify-center bg-muted ">
      <div className="w-full  ">
        <SignupForm  className="h-screen"/>
      </div>
    </div>
  )
}

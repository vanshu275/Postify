import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        alert(data.message)
        return
      }

      // 🔥 token save
      localStorage.setItem("token", data.token)
      navigate("/")
    } catch (error) {
      console.log("Error:", error)
    }
  }

  return (
    <div
      className={cn("flex h-screen flex-col gap-6 bg-[#000000]", className)}
      {...props}
    >
      <Card className="h-screen overflow-hidden bg-[#000000] p-0">
        <CardContent className="grid h-screen p-0 md:grid-cols-2">
          <form className="m-auto w-[50%]" onSubmit={handleSubmit}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-4xl font-bold">Create your account</h1>
              </div>
              <Field>
                <FieldLabel className="text-[16px]" htmlFor="Username">
                  UserName
                </FieldLabel>
                <Input
                  id="username"
                  type="text"
                  placeholder="ABC_123"
                  required
                  onChange={(e) => {
                    setUsername(e.target.value)
                  }}
                />
              </Field>
              <Field className="">
                <Field className="">
                  <FieldLabel className="text-[16px]" htmlFor="password">
                    Password
                  </FieldLabel>
                  <Input
                    placeholder="*******"
                    id="password"
                    type="password"
                    onChange={(e) => {
                      setPassword(e.target.value)
                    }}
                    required
                  />
                </Field>
              </Field>
              <Field className="mt-4">
                <Button className="md-text-[16px] pt-1 pb-1" type="submit">
                  Create Account
                </Button>
              </Field>

              <FieldDescription className="text-center md:text-[14px]">
                Already have an account? <Link to="/login">Sign in</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/Login Image.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

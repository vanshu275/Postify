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

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex h-screen flex-col gap-6 bg-[#000000]", className)} {...props}>
      <Card className="h-screen overflow-hidden p-0 bg-[#000000] ">
        <CardContent className="grid h-screen p-0 md:grid-cols-2">
          <form className="w-[50%] m-auto">
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
                  type="username"
                  placeholder="ABC_123"
                  required
                />
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel className="text-[16px]" htmlFor="password">
                      Password
                    </FieldLabel>
                    <Input
                      placeholder="*******"
                      id="password"
                      type="password"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel
                      className="text-[16px]"
                      htmlFor="confirm-password"
                    >
                      Confirm Password
                    </FieldLabel>
                    <Input
                      placeholder="*******"
                      id="confirm-password"
                      type="password"
                      required
                    />
                  </Field>
                </Field>
              </Field>
              <Field className="mt-9">
                <Button className="text-[16px] pt-1 pb-1" type="submit">
                  Create Account
                </Button>
              </Field>

              <FieldDescription className="text-center text-[14px]">
                Already have an account? <a href="/login">Sign in</a>
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

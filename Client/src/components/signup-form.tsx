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
    <div className={cn("flex flex-col gap-6 h-[70vh]", className)} {...props}>
      <Card className="overflow-hidden p-0 h-[60vh]">
        <CardContent className="grid p-0 md:grid-cols-2 h-[60vh]">
          <form className="p-6 md:p-8 md:pt-16">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
              </div>
              <Field>
                <FieldLabel className="text-[15px]" htmlFor="Username">UserName</FieldLabel>
                <Input
                  id="email"
                  type="username"
                  placeholder="ABC_123"
                  required
                />
               
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel className="text-[15px]" htmlFor="password">Password</FieldLabel>
                    <Input placeholder="*******" id="password" type="password" required />
                  </Field>
                  <Field>
                    <FieldLabel className="text-[15px]" htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input placeholder="*******" id="confirm-password" type="password" required />
                  </Field>
                </Field>
              </Field>
              <Field className="mt-9">
                <Button className="text-[15px]" type="submit">Create Account</Button>
              </Field>
              
              <FieldDescription className="text-center">
                Already have an account? <a href="#">Sign in</a>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/Login Image.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover "
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}

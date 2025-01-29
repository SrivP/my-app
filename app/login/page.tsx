import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { login, signup } from "./actions";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";





export default async function Page() 

{
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/focus");
  }

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <form id="login-form" className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="test@test.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                minLength={6}
                name="password"
                id="password"
                type="password"
                required
              />
            </div>
            <Button formAction={login} className="w-full">
              Login
            </Button>
            <Button formAction={signup} className="w-full">
              Sign Up
            </Button>
            
          </form>
    </div>
  );
}


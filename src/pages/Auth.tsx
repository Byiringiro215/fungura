import { useState } from "react";
import { UtensilsCrossed, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="hidden w-1/2 flex-col justify-between bg-primary p-12 lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-foreground">
            <UtensilsCrossed className="h-5 w-5 text-primary" />
          </div>
          <span className="text-2xl font-bold text-primary-foreground">Reztro</span>
        </div>

        <div>
          <h1 className="mb-4 text-4xl font-bold leading-tight text-primary-foreground">
            Streamline your restaurant management
          </h1>
          <p className="text-lg text-primary-foreground/80">
            Real-time insights, inventory tracking, order management, and more — all in one powerful dashboard.
          </p>
        </div>

        <div className="flex gap-8 text-primary-foreground/70">
          <div>
            <p className="text-3xl font-bold text-primary-foreground">2K+</p>
            <p className="text-sm">Restaurants</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary-foreground">50K+</p>
            <p className="text-sm">Orders Daily</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary-foreground">99%</p>
            <p className="text-sm">Uptime</p>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 items-center justify-center bg-background p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <UtensilsCrossed className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">Reztro</span>
          </div>

          <h2 className="mb-1 text-2xl font-bold text-foreground">
            {mode === "login" ? "Welcome back" : "Create an account"}
          </h2>
          <p className="mb-8 text-sm text-muted-foreground">
            {mode === "login" ? "Sign in to your account to continue" : "Get started with your restaurant dashboard"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="mb-1 block text-xs font-medium text-foreground">Full Name</label>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <input placeholder="Enter your name" className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
                </div>
              </div>
            )}

            <div>
              <label className="mb-1 block text-xs font-medium text-foreground">Email</label>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <input type="email" placeholder="Enter your email" className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-foreground">Password</label>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <input type={showPassword ? "text" : "password"} placeholder="Enter your password" className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {mode === "login" && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs text-muted-foreground">
                  <input type="checkbox" className="accent-primary" /> Remember me
                </label>
                <button type="button" className="text-xs text-primary hover:underline">Forgot password?</button>
              </div>
            )}

            <button type="submit" className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
              {mode === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">or continue with</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="flex gap-3">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm font-medium text-foreground hover:bg-accent">
              <svg className="h-4 w-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Google
            </button>
            <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm font-medium text-foreground hover:bg-accent">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              Apple
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button onClick={() => setMode(mode === "login" ? "signup" : "login")} className="font-semibold text-primary hover:underline">
              {mode === "login" ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

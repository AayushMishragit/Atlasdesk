"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LayoutGrid, Github } from "lucide-react";
import { useSignIn } from "@clerk/nextjs";
import { getClerkErrorMessage } from "@/features/auth/error-message";

type ClerkSignInError = {
  code: string;
  message: string;
  longMessage?: string;
};

function logClerkSignInError(action: string, error: ClerkSignInError) {
  if (process.env.NODE_ENV !== "development") return;

  const meta = (error as ClerkSignInError & { meta?: unknown }).meta;
  console.error("Clerk sign-in request failed", {
    action,
    code: error.code,
    message: error.message,
    longMessage: error.longMessage,
    metaKeys: meta && typeof meta === "object" ? Object.keys(meta) : undefined,
  });
}

function getLoginErrorMessage(error: ClerkSignInError, fallback: string) {
  if (error.code === "form_identifier_not_found") {
    return "No account was found for this email address.";
  }

  if (/strategy|not_enabled|unsupported/i.test(error.code)) {
    return "Email and password sign-in may not be enabled for this Clerk application.";
  }

  return getClerkErrorMessage(error, fallback);
}

export default function LoginPage() {
  const { signIn, errors, fetchStatus } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const isVerificationPending =
    signIn.status === "needs_client_trust" ||
    signIn.status === "needs_second_factor";
  const hasEmailCodeFactor = signIn.supportedSecondFactors.some(
    (factor) => factor.strategy === "email_code",
  );
  const needsCode = isVerificationPending && hasEmailCodeFactor;

  const finish = async () => {
    if (signIn.status !== "complete") {
      setError(
        "Sign-in is not complete yet. Finish verification and try again.",
      );
      return;
    }

    const { error: finalizeError } = await signIn.finalize({
      navigate: ({ decorateUrl }) => {
        window.location.href = decorateUrl("/dashboard");
      },
    });

    if (finalizeError) {
      logClerkSignInError("finalize", finalizeError);
      setError(
        getLoginErrorMessage(finalizeError, "Unable to complete sign in."),
      );
    }
  };

  const sendVerificationCode = async () => {
    if (!hasEmailCodeFactor) {
      setError(
        "This account requires another verification method. Check the enabled sign-in factors in Clerk.",
      );
      return;
    }

    const { error: sendCodeError } = await signIn.mfa.sendEmailCode();
    if (sendCodeError) {
      logClerkSignInError("send email verification code", sendCodeError);
      setError(
        getLoginErrorMessage(
          sendCodeError,
          "Unable to send a verification code. Check the email verification settings in Clerk.",
        ),
      );
      return;
    }

    setError("");
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (isVerificationPending) {
      await sendVerificationCode();
      return;
    }

    const { error: signInError } = await signIn.password({
      emailAddress: email.trim(),
      password,
    });
    if (signInError) {
      logClerkSignInError("password", signInError);
      setError(
        getLoginErrorMessage(
          signInError,
          "Unable to sign in. Check your details and make sure email/password sign-in is enabled in Clerk.",
        ),
      );
      return;
    }

    const statusAfterPassword = signIn.status as string;
    if (statusAfterPassword === "complete") {
      await finish();
    } else if (statusAfterPassword === "needs_client_trust") {
      await sendVerificationCode();
    } else if (statusAfterPassword === "needs_second_factor") {
      await sendVerificationCode();
    } else if (statusAfterPassword === "needs_first_factor") {
      setError(
        "Clerk requires a different first sign-in factor. Confirm password sign-in is enabled in the Clerk Dashboard.",
      );
    } else {
      setError(`Sign-in could not continue (status: ${statusAfterPassword}).`);
    }
  };

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const { error: verificationError } = await signIn.mfa.verifyEmailCode({
      code,
    });
    if (verificationError) {
      logClerkSignInError("verify email code", verificationError);
      setError(
        getLoginErrorMessage(verificationError, "Invalid verification code."),
      );
      return;
    }
    if (signIn.status === "complete") {
      await finish();
    } else if (signIn.status === "needs_second_factor") {
      setError(
        "This account requires another sign-in factor that is not available in this form.",
      );
    } else {
      setError(`Verification did not complete (status: ${signIn.status}).`);
    }
  };

  const fieldError =
    errors.fields.identifier?.longMessage ??
    errors.fields.password?.longMessage ??
    errors.fields.code?.longMessage;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F5FA] px-4">
      <div className="absolute top-8 left-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <LayoutGrid size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight">AtlasDesk</span>
        </Link>
      </div>

      <form
        className="w-full max-w-md"
        onSubmit={needsCode ? handleVerify : handleLogin}
      >
        <Card className="w-full max-w-md rounded-3xl border-none soft-shadow p-4 bg-white">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Welcome back
            </CardTitle>
            <CardDescription className="text-center">
              Log in to your AtlasDesk account to continue.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant="outline"
                className="rounded-xl h-11"
              >
                <Github className="mr-2 h-4 w-4" /> Github
              </Button>
              <Button
                type="button"
                variant="outline"
                className="rounded-xl h-11"
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="h-11 rounded-xl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={!needsCode}
                disabled={needsCode}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                className="h-11 rounded-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={!needsCode}
                disabled={needsCode}
              />
            </div>

            {needsCode && (
              <div className="space-y-2">
                <Label htmlFor="code">Verification code</Label>
                <Input
                  id="code"
                  placeholder="Code sent to your email"
                  className="h-11 rounded-xl"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="text-xs text-primary hover:underline"
                  onClick={sendVerificationCode}
                  disabled={fetchStatus === "fetching"}
                >
                  Resend code
                </button>
              </div>
            )}

            {(error || fieldError) && (
              <p className="text-sm text-red-500">{error || fieldError}</p>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              disabled={fetchStatus === "fetching"}
              className="w-full h-11 rounded-xl font-bold bg-primary shadow-lg shadow-primary/20"
            >
              {needsCode ? "Verify" : "Log In"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-primary hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

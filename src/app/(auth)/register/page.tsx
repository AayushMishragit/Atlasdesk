"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
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
import { LayoutGrid } from "lucide-react";
import { getClerkErrorMessage } from "@/features/auth/error-message";

export default function RegisterPage() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [needsVerification, setNeedsVerification] = useState(false);
  const [error, setError] = useState("");

  const finish = async () => {
    const { error: finalizeError } = await signUp.finalize({
      navigate: ({ session, decorateUrl }) => {
        if (session?.currentTask) {
          setError("Complete the required account task before continuing.");
          return;
        }

        const url = decorateUrl("/dashboard");
        if (url.startsWith("http")) {
          window.location.href = url;
        } else {
          router.push(url);
        }
      },
    });

    if (finalizeError) {
      setError(
        getClerkErrorMessage(finalizeError, "Unable to complete registration."),
      );
    }
  };

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const [firstName, ...lastNameParts] = fullName.trim().split(/\s+/);
    const lastName = lastNameParts.join(" ");
    const { error: signUpError } = await signUp.password({
      emailAddress: email,
      password,
      ...(firstName ? { firstName } : {}),
      ...(lastName ? { lastName } : {}),
    });

    if (signUpError) {
      setError(
        getClerkErrorMessage(signUpError, "Unable to create your account."),
      );
      return;
    }

    if (signUp.status === "complete") {
      await finish();
      return;
    }

    if (signUp.status === "missing_requirements") {
      if (signUp.unverifiedFields.includes("email_address")) {
        const { error: sendCodeError } =
          await signUp.verifications.sendEmailCode();
        if (sendCodeError) {
          setError(
            getClerkErrorMessage(
              sendCodeError,
              "Unable to send a verification code.",
            ),
          );
          return;
        }
        setNeedsVerification(true);
        return;
      }

      setError(
        signUp.missingFields.length > 0
          ? "More information is required to finish creating your account."
          : "Your account requires another verification step before it can be completed.",
      );
      return;
    }

    setError("Your account could not be completed. Please try again.");
  };

  const handleVerify = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const { error: verificationError } =
      await signUp.verifications.verifyEmailCode({ code });
    if (verificationError) {
      setError(
        getClerkErrorMessage(verificationError, "Invalid verification code."),
      );
      return;
    }

    if (signUp.status === "complete") {
      await finish();
    } else if (signUp.status === "missing_requirements") {
      setError(
        "Email verified, but more information is required to finish registration.",
      );
    } else {
      setError("Email verification could not be completed. Please try again.");
    }
  };

  const fieldError =
    errors.fields.emailAddress?.longMessage ??
    errors.fields.password?.longMessage ??
    errors.fields.code?.longMessage ??
    errors.fields.firstName?.longMessage ??
    errors.fields.lastName?.longMessage;

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
        onSubmit={needsVerification ? handleVerify : handleSignUp}
      >
        <Card className="w-full max-w-md rounded-3xl border-none soft-shadow p-4 bg-white">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Create an account
            </CardTitle>
            <CardDescription className="text-center">
              Join 5,000+ teams shipping faster with AtlasDesk.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                className="h-11 rounded-xl"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="h-11 rounded-xl"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="At least 8 characters"
                className="h-11 rounded-xl"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            {needsVerification && (
              <div className="space-y-2">
                <Label htmlFor="code">Verification code</Label>
                <Input
                  id="code"
                  placeholder="Code sent to your email"
                  className="h-11 rounded-xl"
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  required
                />
              </div>
            )}
            {(error || fieldError) && (
              <p className="text-sm text-red-500">{error || fieldError}</p>
            )}
            <p className="text-xs text-muted-foreground">
              By clicking "Sign Up", you agree to our{" "}
              <Link href="#" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              disabled={fetchStatus === "fetching"}
              className="w-full h-11 rounded-xl font-bold bg-primary shadow-lg shadow-primary/20"
            >
              {needsVerification ? "Verify Email" : "Sign Up"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary hover:underline font-medium"
              >
                Log in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

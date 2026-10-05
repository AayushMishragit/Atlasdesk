type ClerkActionError = {
  code: string;
  longMessage?: string;
};

export function getClerkErrorMessage(
  error: ClerkActionError | null | undefined,
  fallback: string,
) {
  if (!error) return fallback;

  switch (error.code) {
    case "form_password_incorrect":
      return "Invalid email or password.";
    case "form_identifier_exists":
      return "An account with this email already exists.";
    case "form_password_pwned":
    case "form_password_length_too_short":
      return "Password requirements were not met. Choose a stronger password.";
    case "verification_code_invalid":
    case "verification_expired":
      return "The verification code is invalid or expired. Request a new code and try again.";
    default:
      return error.longMessage || fallback;
  }
}

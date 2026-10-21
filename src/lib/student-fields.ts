const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  collegeName: string;
  batch: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export function validateRegister(input: RegisterInput) {
  const name = input.name.trim();
  const email = input.email.trim();
  const collegeName = input.collegeName.trim();
  const batch = input.batch.trim();

  if (!name) return "Enter your name.";
  if (name.length > 80) return "Name must be 80 characters or fewer.";
  if (!email) return "Enter your email address.";
  if (!emailPattern.test(email)) return "Enter a valid email address.";
  if (!input.password) return "Enter a password.";
  if (input.password.length < 8) {
    return "Password must be at least 8 characters.";
  }
  if (input.password.length > 72) {
    return "Password must be 72 characters or fewer.";
  }
  if (!collegeName) return "Enter your college name.";
  if (collegeName.length > 120) {
    return "College name must be 120 characters or fewer.";
  }
  if (!batch) return "Enter your batch.";
  if (batch.length > 40) return "Batch must be 40 characters or fewer.";
  return null;
}

export function validateLogin(input: LoginInput) {
  const email = input.email.trim();
  if (!email) return "Enter your email address.";
  if (!emailPattern.test(email)) return "Enter a valid email address.";
  if (!input.password) return "Enter your password.";
  return null;
}

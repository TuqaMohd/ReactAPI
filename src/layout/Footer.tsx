import { useState, type FormEvent } from "react";

interface SignupForm {
  name: string;
  email: string;
}

interface SignupErrors {
  name?: string;
  email?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form: SignupForm): SignupErrors {
  const errors: SignupErrors = {};

  if (!form.name.trim()) {
    errors.name = "Please tell us your name.";
  }

  if (!form.email.trim()) {
    errors.email = "An email is required to sign up.";
  } else if (!EMAIL_PATTERN.test(form.email.trim())) {
    errors.email = "That doesn't look like a valid email.";
  }

  return errors;
}

export default function Footer() {
  const [form, setForm] = useState<SignupForm>({ name: "", email: "" });
  const [errors, setErrors] = useState<SignupErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof SignupErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validationErrors = validate(form);
    setErrors(validationErrors);

    const hasErrors = Object.keys(validationErrors).length > 0;
    if (hasErrors) {
      setSubmitted(false);
      return;
    }

    setSubmitted(true);
  }

  function handleReset() {
    setForm({ name: "", email: "" });
    setErrors({});
    setSubmitted(false);
  }

  return (
    <footer className="mt-10 border-t border-gold/40 pt-6">
      <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-start">
        <div className="text-center sm:text-left">
          <p className="text-goldBright font-serif text-base sm:text-lg font-bold mb-1">
            JS vs TS Quest
          </p>
          <p className="text-parchmentDark text-xs sm:text-sm max-w-sm mx-auto sm:mx-0">
            Make sure you enter your email below to stay up to date with all
            our new updates and possibly more questions to solve!
          </p>
        </div>

        <div className="w-full sm:w-72 bg-emeraldDark border-2 border-gold rounded-lg p-4 text-left">
          {submitted ? (
            <div className="text-center py-2">
              <p className="text-goldBright font-semibold mb-3 text-sm">
                Thanks, {form.name}! You're on the list! :D
              </p>
              <button
                onClick={handleReset}
                className="bg-gold text-ink px-4 py-1.5 rounded text-xs font-semibold hover:bg-goldBright"
              >
                Sign up with another email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-3">
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-parchmentDark mb-1">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={
                    "w-full px-3 py-1.5 rounded bg-parchment text-ink text-sm outline-none border-2 " +
                    (errors.name ? "border-danger" : "border-gold")
                  }
                />
                {errors.name && (
                  <p className="text-danger text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-parchmentDark mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={
                    "w-full px-3 py-1.5 rounded bg-parchment text-ink text-sm outline-none border-2 " +
                    (errors.email ? "border-danger" : "border-gold")
                  }
                />
                {errors.email && (
                  <p className="text-danger text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-gold text-ink font-semibold px-4 py-2 rounded text-sm hover:bg-goldBright"
              >
                Join the Quest
              </button>
            </form>
          )}
        </div>
      </div>

      <p className="text-center text-parchmentDark/70 text-xs mt-6">
        TQuest - Build for the best learning experience ;)
      </p>
    </footer>
  );
}

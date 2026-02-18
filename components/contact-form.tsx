"use client";

import { FormEvent, useState } from "react";
import { contactSchema, type ContactPayload } from "@/lib/contact-schema";
import { cn } from "@/lib/utils";

const budgetOptions = [
  { value: "under-1500", label: "Under $1,500" },
  { value: "1500-3000", label: "$1,500 - $3,000" },
  { value: "3000-7000", label: "$3,000 - $7,000" },
  { value: "7000-plus", label: "$7,000+" }
] as const;

const timelineOptions = [
  { value: "asap", label: "ASAP" },
  { value: "2-4-weeks", label: "2-4 weeks" },
  { value: "1-2-months", label: "1-2 months" },
  { value: "flexible", label: "Flexible" }
] as const;

const initialValues: ContactPayload = {
  name: "",
  email: "",
  company: "",
  budget: "under-1500",
  timeline: "2-4-weeks",
  message: "",
  website: ""
};

type FieldErrors = Partial<Record<keyof ContactPayload, string>>;

export function ContactForm({ className }: { className?: string }) {
  const [values, setValues] = useState<ContactPayload>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState("idle");
    setFeedback("");

    const result = contactSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        company: fieldErrors.company?.[0],
        budget: fieldErrors.budget?.[0],
        timeline: fieldErrors.timeline?.[0],
        message: fieldErrors.message?.[0],
        website: fieldErrors.website?.[0]
      });
      return;
    }

    setErrors({});
    setState("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data)
      });

      const body = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(body.message || "Unable to submit the form right now.");
      }

      setValues(initialValues);
      setState("success");
      setFeedback(body.message ?? "Thanks! Your message has been sent.");
    } catch (error) {
      setState("error");
      setFeedback(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)} noValidate>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-[hsl(var(--foreground))]">
            Name
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => setValues((previous) => ({ ...previous, name: event.target.value }))}
            className="h-11 w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-3 text-sm text-[hsl(var(--foreground))] outline-none transition focus:border-[hsl(var(--accent))] focus:ring-2 focus:ring-[hsl(var(--accent-soft))]"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name ? (
            <p id="name-error" className="text-xs text-[hsl(var(--danger))]">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-[hsl(var(--foreground))]">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => setValues((previous) => ({ ...previous, email: event.target.value }))}
            className="h-11 w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-3 text-sm text-[hsl(var(--foreground))] outline-none transition focus:border-[hsl(var(--accent))] focus:ring-2 focus:ring-[hsl(var(--accent-soft))]"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email ? (
            <p id="email-error" className="text-xs text-[hsl(var(--danger))]">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="company" className="text-sm font-medium text-[hsl(var(--foreground))]">
            Company (optional)
          </label>
          <input
            id="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={(event) => setValues((previous) => ({ ...previous, company: event.target.value }))}
            className="h-11 w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-3 text-sm text-[hsl(var(--foreground))] outline-none transition focus:border-[hsl(var(--accent))] focus:ring-2 focus:ring-[hsl(var(--accent-soft))]"
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? "company-error" : undefined}
          />
          {errors.company ? (
            <p id="company-error" className="text-xs text-[hsl(var(--danger))]">
              {errors.company}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label htmlFor="budget" className="text-sm font-medium text-[hsl(var(--foreground))]">
            Budget
          </label>
          <select
            id="budget"
            value={values.budget}
            onChange={(event) =>
              setValues((previous) => ({
                ...previous,
                budget: event.target.value as ContactPayload["budget"]
              }))
            }
            className="h-11 w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-3 text-sm text-[hsl(var(--foreground))] outline-none transition focus:border-[hsl(var(--accent))] focus:ring-2 focus:ring-[hsl(var(--accent-soft))]"
            aria-invalid={Boolean(errors.budget)}
            aria-describedby={errors.budget ? "budget-error" : undefined}
          >
            {budgetOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.budget ? (
            <p id="budget-error" className="text-xs text-[hsl(var(--danger))]">
              {errors.budget}
            </p>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="timeline" className="text-sm font-medium text-[hsl(var(--foreground))]">
          Preferred timeline
        </label>
        <select
          id="timeline"
          value={values.timeline}
          onChange={(event) =>
            setValues((previous) => ({
              ...previous,
              timeline: event.target.value as ContactPayload["timeline"]
            }))
          }
          className="h-11 w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-3 text-sm text-[hsl(var(--foreground))] outline-none transition focus:border-[hsl(var(--accent))] focus:ring-2 focus:ring-[hsl(var(--accent-soft))]"
          aria-invalid={Boolean(errors.timeline)}
          aria-describedby={errors.timeline ? "timeline-error" : undefined}
        >
          {timelineOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.timeline ? (
          <p id="timeline-error" className="text-xs text-[hsl(var(--danger))]">
            {errors.timeline}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-[hsl(var(--foreground))]">
          Project details
        </label>
        <textarea
          id="message"
          rows={6}
          value={values.message}
          onChange={(event) => setValues((previous) => ({ ...previous, message: event.target.value }))}
          className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-3 py-2.5 text-sm text-[hsl(var(--foreground))] outline-none transition focus:border-[hsl(var(--accent))] focus:ring-2 focus:ring-[hsl(var(--accent-soft))]"
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message ? (
          <p id="message-error" className="text-xs text-[hsl(var(--danger))]">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => setValues((previous) => ({ ...previous, website: event.target.value }))}
        />
      </div>

      <div className="space-y-3">
        <button
          type="submit"
          disabled={state === "submitting"}
          className="inline-flex h-11 items-center justify-center rounded-lg bg-[hsl(var(--accent))] px-6 text-sm font-semibold text-[hsl(var(--accent-foreground))] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {state === "submitting" ? "Sending..." : "Send project brief"}
        </button>

        {feedback ? (
          <p
            className={cn(
              "text-sm",
              state === "success" && "text-emerald-600 dark:text-emerald-400",
              state === "error" && "text-[hsl(var(--danger))]"
            )}
            role="status"
          >
            {feedback}
          </p>
        ) : null}
      </div>
    </form>
  );
}

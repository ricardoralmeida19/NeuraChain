"use client";

import { useState } from "react";
import { CONTACT } from "./content";

type Status = { state: "idle" | "sending" | "sent" | "error"; message?: string };

async function send(kind: string, form: HTMLFormElement): Promise<Status> {
  const data = Object.fromEntries(new FormData(form).entries());
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, ...data }),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) return { state: "error", message: body.error };
    return { state: "sent" };
  } catch {
    return { state: "error" };
  }
}

function ErrorLine({ message }: { message?: string }) {
  return (
    <p className="form-error" role="alert">
      {message ?? "The form didn't go through."} You can also email{" "}
      <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
    </p>
  );
}

export function AssessmentForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ state: "sending" });
    setStatus(await send("assessment", e.currentTarget));
  }

  if (status.state === "sent") {
    return (
      <div className="form-done" role="status">
        <h3>Request received</h3>
        <p>
          Ricardo will reply by email to set a time for the assessment. If it's urgent, call{" "}
          {CONTACT.phone}.
        </p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate={false}>
      <div className="field">
        <label htmlFor="f-name">Your name</label>
        <input id="f-name" name="name" required autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="f-company">Company</label>
        <input id="f-company" name="company" required autoComplete="organization" />
      </div>
      <div className="field">
        <label htmlFor="f-email">Work email</label>
        <input id="f-email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="f-phone">
          Phone <span className="opt">(optional)</span>
        </label>
        <input id="f-phone" name="phone" type="tel" autoComplete="tel" />
      </div>
      <div className="field">
        <label htmlFor="f-size">Employees</label>
        <select id="f-size" name="employees" required defaultValue="">
          <option value="" disabled>
            Choose one
          </option>
          <option>10–49</option>
          <option>50–99</option>
          <option>100–249</option>
          <option>250–500</option>
          <option>Over 500</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="f-focus">What's costing you the most right now?</label>
        <select id="f-focus" name="focus" required defaultValue="">
          <option value="" disabled>
            Choose one
          </option>
          <option>Part and material prices</option>
          <option>Late or unreliable suppliers</option>
          <option>Bottlenecks and low throughput</option>
          <option>Machine downtime</option>
          <option>Not sure yet</option>
        </select>
      </div>
      <div className="field field-wide">
        <label htmlFor="f-msg">
          Anything we should know <span className="opt">(optional)</span>
        </label>
        <textarea id="f-msg" name="message" rows={4} />
      </div>
      <div className="hp" aria-hidden="true">
        <label htmlFor="f-web">Leave this empty</label>
        <input id="f-web" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="field-wide form-actions">
        <button className="btn btn-solid" type="submit" disabled={status.state === "sending"}>
          {status.state === "sending" ? "Sending request…" : "Request my free assessment"}
        </button>
        {status.state === "error" && <ErrorLine message={status.message} />}
      </div>
    </form>
  );
}

export function WaitlistForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ state: "sending" });
    setStatus(await send("early-access", e.currentTarget));
  }

  if (status.state === "sent") {
    return (
      <p className="form-done-inline" role="status">
        You're on the early-access list. We'll write when the beta opens.
      </p>
    );
  }

  return (
    <form className="waitlist" onSubmit={onSubmit}>
      <label htmlFor="w-email">Work email</label>
      <div className="waitlist-row">
        <input id="w-email" name="email" type="email" required autoComplete="email" />
        <button className="btn btn-line" type="submit" disabled={status.state === "sending"}>
          {status.state === "sending" ? "Joining…" : "Join early access"}
        </button>
      </div>
      <div className="hp" aria-hidden="true">
        <input name="website" tabIndex={-1} autoComplete="off" />
      </div>
      {status.state === "error" && <ErrorLine message={status.message} />}
    </form>
  );
}

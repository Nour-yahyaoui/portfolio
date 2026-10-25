"use client";

import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { ArrowUpRight, CheckCircle2, TriangleAlert } from "lucide-react";
import {
  AUTHOR_EMAIL,
  GITHUB_HANDLE,
  GITHUB_URL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  LINKEDIN_HANDLE,
  LINKEDIN_URL,
} from "@/lib/site";

/**
 * Contact, in the Paper & Ink style. The form follows frontend-craft's
 * "button law": it disables while sending, shows progress in the button,
 * times out instead of hanging, and always tells you what happened —
 * in human words, with your text kept safe if sending fails.
 */

type Status = "idle" | "sending" | "sent" | "error";

const SEND_TIMEOUT_MS = 15000;

const contactRows = [
  { term: "Email", value: AUTHOR_EMAIL, href: `mailto:${AUTHOR_EMAIL}` },
  { term: "Phone", value: "+216 58 923 247", href: "tel:+21658923247" },
  { term: "WhatsApp", value: "+216 58 923 247", href: "https://wa.me/21658923247" },
  { term: "Location", value: "Kasserine Sbiba, Tunisia" },
  { term: "GitHub", value: GITHUB_HANDLE, href: GITHUB_URL },
  { term: "LinkedIn", value: LINKEDIN_HANDLE, href: LINKEDIN_URL },
  { term: "Instagram", value: INSTAGRAM_HANDLE, href: INSTAGRAM_URL },
];

export default function ContactClient() {
  const [status, setStatus] = useState<Status>("idle");
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const inFlight = useRef(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inFlight.current) return; // no double submits
    inFlight.current = true;
    setStatus("sending");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), SEND_TIMEOUT_MS);

    try {
      const response = await fetch("https://formsubmit.co/ajax/nourryahyaoui@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...formData, _template: "table" }),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setStatus("sent");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      // Never show the raw error — the visitor keeps their typed message and
      // gets a plain explanation plus another way to reach me.
      setStatus("error");
    } finally {
      clearTimeout(timeout);
      inFlight.current = false;
    }
  };

  const sending = status === "sending";

  return (
    <main className="mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6 sm:pt-20 lg:px-8">
      <header className="border-b-2 border-ink pb-8">
        <p className="label-mono">Contact</p>
        <h1 className="h-display mt-5 text-ink">Tell me what you&apos;re building.</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-mute">
          A few sentences is enough: what it is, who it&apos;s for, and what
          &ldquo;done&rdquo; looks like. I reply to every serious message.
        </p>
      </header>

      <div className="grid gap-12 pt-12 lg:grid-cols-12">
        <section className="lg:col-span-5" aria-labelledby="details-title">
          <h2 id="details-title" className="h-section text-ink">
            Directly, if you prefer
          </h2>
          <dl className="mt-5 border-t border-line">
            {contactRows.map((row) => (
              <div key={row.term} className="grid grid-cols-[7rem_1fr] items-baseline gap-3 border-b border-linesoft py-1">
                <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-mute">{row.term}</dt>
                <dd>
                  {row.href ? (
                    <a
                      href={row.href}
                      target={row.href.startsWith("http") ? "_blank" : undefined}
                      rel={row.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="inline-flex min-h-11 items-center gap-1.5 break-all text-[15px] text-ink underline decoration-linestrong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                    >
                      {row.value}
                      {row.href.startsWith("http") && <ArrowUpRight size={13} aria-hidden="true" className="shrink-0" />}
                    </a>
                  ) : (
                    <span className="inline-flex min-h-11 items-center text-[15px] text-ink">{row.value}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 max-w-md text-sm leading-6 text-mute">
            Prefer email in your own client? The address above works — the
            form on this page reaches the same inbox.
          </p>
        </section>

        <section className="lg:col-span-7" aria-labelledby="form-title">
          <h2 id="form-title" className="h-section text-ink">
            Send a message
          </h2>

          {status === "sent" && (
            <div role="status" className="mt-5 flex items-start gap-3 border border-ok bg-surface p-4">
              <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-ok" aria-hidden="true" />
              <div>
                <p className="font-semibold text-ink">Message sent.</p>
                <p className="mt-1 text-sm leading-6 text-mute">
                  Thank you — it&apos;s in my inbox. I&apos;ll get back to you
                  soon, usually within a day.
                </p>
              </div>
            </div>
          )}

          {status === "error" && (
            <div role="alert" className="mt-5 flex items-start gap-3 border border-err bg-surface p-4">
              <TriangleAlert size={20} className="mt-0.5 shrink-0 text-err" aria-hidden="true" />
              <div>
                <p className="font-semibold text-ink">That didn&apos;t send.</p>
                <p className="mt-1 text-sm leading-6 text-mute">
                  Nothing was lost — your message is still in the form below.
                  Check your connection and try again, or email me directly at{" "}
                  <a href="mailto:nourryahyaoui@gmail.com" className="font-medium text-accent underline underline-offset-4">
                    nourryahyaoui@gmail.com
                  </a>
                  .
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5" aria-describedby="form-note">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="label-mono block">
                  Your name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Amine Ben Salah"
                  required
                  disabled={sending}
                  className="field mt-2"
                />
              </div>
              <div>
                <label htmlFor="email" className="label-mono block">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  disabled={sending}
                  className="field mt-2"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="label-mono block">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g. A booking app for my clinic"
                required
                disabled={sending}
                className="field mt-2"
              />
            </div>

            <div>
              <label htmlFor="message" className="label-mono block">
                Your message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                placeholder="What are you building, who is it for, and what does done look like?"
                required
                disabled={sending}
                className="field mt-2"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button type="submit" disabled={sending} aria-busy={sending} className="btn btn-primary">
                {sending ? "Sending…" : "Send message"}
                {!sending && <ArrowUpRight size={16} aria-hidden="true" />}
              </button>
              <p id="form-note" className="text-sm leading-6 text-mute">
                Goes straight to my inbox. No account, no newsletter.
              </p>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

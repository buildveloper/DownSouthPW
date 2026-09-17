"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { CtaButton, CtaLink } from "@/components/Button";
import {
  IconCheck,
  IconClose,
  IconMail,
  IconPhone,
  IconTrash,
  IconUpload,
} from "@/components/Icons";
import { PRESELECT_EVENT } from "@/components/QuoteLink";
import { Section, SectionHeading } from "@/components/Section";
import { services, site } from "@/lib/site";

type Values = {
  name: string;
  phone: string;
  email: string;
  service: string;
  town: string;
  message: string;
  /** Honeypot. Real people never see it; naive bots fill it in. */
  company: string;
};

type Errors = Partial<Record<keyof Values | "photos", string>>;
type Status = "idle" | "submitting" | "success" | "error";

const MAX_FILES = 3;
const MAX_BYTES = 5 * 1024 * 1024;

const EMPTY: Values = {
  name: "",
  phone: "",
  email: "",
  service: "",
  town: "",
  message: "",
  company: "",
};

const SERVICE_OPTIONS = [
  ...services.map((s) => ({ value: s.id, label: s.title })),
  { value: "not-sure", label: "Not sure yet — help me figure it out" },
];

function validate(values: Values, photos: File[]): Errors {
  const errors: Errors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }

  const digits = values.phone.replace(/\D/g, "");
  if (digits.length < 10) {
    errors.phone = "Enter a phone number we can reach you on (10 digits).";
  }

  if (
    values.email.trim() &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())
  ) {
    errors.email = "That email address does not look right.";
  }

  if (!values.service) {
    errors.service = "Pick the job closest to what you need.";
  }

  for (const file of photos) {
    if (file.size > MAX_BYTES) {
      errors.photos = "Each photo needs to be under 5MB.";
      break;
    }
    if (!file.type.startsWith("image/")) {
      errors.photos = "Photos only, please — JPEG, PNG or HEIC.";
      break;
    }
  }

  return errors;
}

const labelClass = "block text-[0.8125rem] font-semibold text-silver-200";
const fieldClass =
  "mt-2 w-full rounded-md border border-line-strong bg-ink-950 px-3.5 py-3 text-[0.9375rem] text-silver-100 placeholder:text-fg-faint transition-colors duration-200 hover:border-ink-500 focus:border-accent";
const errorClass = "mt-2 text-[0.8125rem] font-medium text-[#ff9f9f]";

export function QuoteForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [photos, setPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<{ url: string; name: string }[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const fileRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  /* Service cards can pre-select the dropdown via a custom event. */
  useEffect(() => {
    const onPreselect = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      setValues((prev) => ({ ...prev, service: detail }));
      setErrors((prev) => ({ ...prev, service: undefined }));
    };
    window.addEventListener(PRESELECT_EVENT, onPreselect);
    return () => window.removeEventListener(PRESELECT_EVENT, onPreselect);
  }, []);

  /* Object URLs for the previews, revoked whenever the selection changes. */
  useEffect(() => {
    const next = photos.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setPreviews(next);
    return () => next.forEach((preview) => URL.revokeObjectURL(preview.url));
  }, [photos]);

  const update = (key: keyof Values, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    setPhotos([...photos, ...Array.from(incoming)].slice(0, MAX_FILES));
    setErrors((prev) => ({ ...prev, photos: undefined }));
    if (fileRef.current) fileRef.current.value = "";
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const found = validate(values, photos);
    setErrors(found);

    const firstBad = Object.keys(found)[0];
    if (firstBad) {
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${firstBad}"]`)
        ?.focus();
      return;
    }

    setStatus("submitting");
    setServerMessage("");

    const body = new FormData();
    Object.entries(values).forEach(([key, value]) => body.append(key, value));
    photos.forEach((file) => body.append("photos", file));

    try {
      const response = await fetch("/api/quote", { method: "POST", body });
      const data: { ok?: boolean; message?: string } = await response
        .json()
        .catch(() => ({}));

      if (!response.ok || !data.ok) {
        setStatus("error");
        setServerMessage(
          data.message ??
            "That did not go through. Call or text and we will sort it out the old way.",
        );
        return;
      }

      setStatus("success");
      setValues(EMPTY);
      setPhotos([]);
    } catch {
      setStatus("error");
      setServerMessage(
        "The connection dropped. Call or text and we will sort it out the old way.",
      );
    }
  };

  return (
    <Section id="quote" tone="dark" className="bg-surface">
      <SectionHeading
        eyebrow="Free quote"
        title="Snap a pic, get a fast estimate."
        lede="Send a photo of the surface or area you want cleaned. It is the fastest route to a real price — no measuring, and no waiting on a callback just to book a look."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <ul className="flex flex-col gap-5">
            {[
              {
                title: "Photos speed it up",
                body: "A picture or two usually tells us everything: the surface, the size, and how heavy the buildup is.",
              },
              {
                title: "You get a firm price",
                body: "Not a range. If something changes once we are on site, you hear it before we start.",
              },
              {
                title: "You keep the proof",
                body: "Before-and-after photos of the finished job, same as everything else on this page.",
              },
            ].map((item) => (
              <li key={item.title} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-sm border border-line bg-ink-950 text-accent"
                >
                  <IconCheck className="size-3.5" />
                </span>
                <span>
                  <span className="block text-[0.9375rem] font-semibold text-silver-100">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-[0.875rem] leading-relaxed text-fg-muted">
                    {item.body}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-9 rounded-lg border border-line bg-ink-950 p-5">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-fg-faint">
              Rather just talk?
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <a
                href={site.phone.href}
                className="inline-flex items-center gap-3 text-[0.9375rem] font-semibold text-silver-100 transition-colors hover:text-accent"
              >
                <IconPhone className="size-4 text-accent" />
                {site.phone.display}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-3 text-[0.9375rem] text-silver-300 transition-colors hover:text-accent"
              >
                <IconMail className="size-4 text-accent" />
                <span className="break-all">{site.email}</span>
              </a>
            </div>
            <p className="mt-4 text-[0.8125rem] leading-relaxed text-fg-faint">
              Serving {site.serviceArea.short.toLowerCase()}.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7"><div className="relative rounded-xl border border-line bg-ink-950 p-5 shadow-lift md:p-7">
          <span
            aria-hidden="true"
            className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent md:inset-x-7"
          />

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="py-1"
            >
              <span className="grid size-12 place-items-center rounded-sm border border-accent/40 bg-accent/10 text-accent">
                <IconCheck className="size-5" />
              </span>
              <h3 className="text-h3 mt-5 text-fg-strong">Request sent.</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg-muted">
                Thanks — that landed. You will get a price back, and sending
                photos makes it quicker.
              </p>

              <ol className="mt-6 flex flex-col gap-3 border-t border-line pt-6">
                {[
                  "We look at what you sent and price the job.",
                  "You get a firm number and a day that suits you.",
                  "We show up, clean it, and leave the proof behind.",
                ].map((line, i) => (
                  <li
                    key={line}
                    className="flex items-start gap-3 text-[0.875rem] text-silver-300"
                  >
                    <span className="mt-0.5 font-display text-[0.9375rem] leading-none text-accent">
                      {`0${i + 1}`}
                    </span>
                    {line}
                  </li>
                ))}
              </ol>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <CtaLink href={site.phone.href} size="md">
                  <IconPhone className="size-4" />
                  Call {site.phone.display}
                </CtaLink>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="text-[0.875rem] font-semibold text-silver-300 underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                >
                  Send another request
                </button>
              </div>

              <p className="mt-6 text-[0.8125rem] leading-relaxed text-fg-faint">
                Nothing back the same day? Call or text the number above — email
                can be slow out here, and the phone never is.
              </p>
            </motion.div>
          ) : (
            <form
              ref={formRef}
              onSubmit={onSubmit}
              noValidate
              className="flex flex-col gap-5"
            >
              {status === "error" ? (
                <div
                  role="alert"
                  className="rounded-md border border-[#7c3234] bg-[#2a1416] p-4"
                >
                  <p className="text-[0.875rem] font-semibold text-[#ffa8a8]">
                    That did not send.
                  </p>
                  <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-silver-300">
                    {serverMessage}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.8125rem] font-semibold">
                    <a
                      href={site.phone.href}
                      className="text-accent underline underline-offset-4"
                    >
                      Call {site.phone.display}
                    </a>
                    <a
                      href={site.phone.sms}
                      className="text-accent underline underline-offset-4"
                    >
                      Text us
                    </a>
                    <a
                      href={`mailto:${site.email}?subject=${encodeURIComponent(
                        `Quote request — ${
                          SERVICE_OPTIONS.find(
                            (option) => option.value === values.service,
                          )?.label ?? "pressure washing"
                        }`,
                      )}&body=${encodeURIComponent(
                        `${values.message}\n\nName: ${values.name}\nPhone: ${values.phone}\nTown: ${values.town}`,
                      )}`}
                      className="text-accent underline underline-offset-4"
                    >
                      Email instead
                    </a>
                  </div>
                </div>
              ) : null}

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="q-name">
                    Name
                  </label>
                  <input
                    id="q-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={values.name}
                    onChange={(e) => update("name", e.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "q-name-error" : undefined}
                    className={fieldClass}
                    placeholder="First and last name"
                  />
                  {errors.name ? (
                    <p id="q-name-error" className={errorClass}>
                      {errors.name}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label className={labelClass} htmlFor="q-phone">
                    Phone
                  </label>
                  <input
                    id="q-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    value={values.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "q-phone-error" : undefined}
                    className={fieldClass}
                    placeholder="(910) 000-0000"
                  />
                  {errors.phone ? (
                    <p id="q-phone-error" className={errorClass}>
                      {errors.phone}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="q-service">
                    Service needed
                  </label>
                  <select
                    id="q-service"
                    name="service"
                    required
                    value={values.service}
                    onChange={(e) => update("service", e.target.value)}
                    aria-invalid={Boolean(errors.service)}
                    aria-describedby={
                      errors.service ? "q-service-error" : undefined
                    }
                    className={`${fieldClass} appearance-none bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10`}
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' fill='none' stroke='%2398a3ab' stroke-width='1.6'%3E%3Cpath d='m2 4 4 4 4-4'/%3E%3C/svg%3E\")",
                    }}
                  >
                    <option value="">Choose the closest match…</option>
                    {SERVICE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.service ? (
                    <p id="q-service-error" className={errorClass}>
                      {errors.service}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label className={labelClass} htmlFor="q-town">
                    Town or area{" "}
                    <span className="font-normal text-fg-faint">(optional)</span>
                  </label>
                  <input
                    id="q-town"
                    name="town"
                    type="text"
                    autoComplete="address-level2"
                    value={values.town}
                    onChange={(e) => update("town", e.target.value)}
                    className={fieldClass}
                    placeholder="Wade, Stedman, Fayetteville…"
                  />
                </div>
              </div>

              <div>
                <label className={labelClass} htmlFor="q-email">
                  Email{" "}
                  <span className="font-normal text-fg-faint">(optional)</span>
                </label>
                <input
                  id="q-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={(e) => update("email", e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "q-email-error" : undefined}
                  className={fieldClass}
                  placeholder="Only if you want the quote by email"
                />
                {errors.email ? (
                  <p id="q-email-error" className={errorClass}>
                    {errors.email}
                  </p>
                ) : null}
              </div>

              <div>
                <span className={labelClass} id="q-photos-label">
                  Photos of the area{" "}
                  <span className="font-normal text-fg-faint">
                    (optional, up to {MAX_FILES})
                  </span>
                </span>

                <div className="mt-2 flex flex-wrap items-center gap-4">
                  <label
                    htmlFor="q-photos"
                    className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-md border border-dashed border-line-strong px-4 text-[0.875rem] font-medium text-silver-300 transition-colors duration-200 hover:border-accent/70 hover:text-accent focus-within:border-accent"
                  >
                    <IconUpload className="size-4" />
                    Add photos
                  </label>
                  <input
                    id="q-photos"
                    name="photos"
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="sr-only"
                    onChange={(e) => addFiles(e.target.files)}
                    aria-labelledby="q-photos-label"
                    aria-describedby="q-photos-help"
                    disabled={photos.length >= MAX_FILES}
                  />
                  <span
                    id="q-photos-help"
                    className="text-[0.8125rem] text-fg-faint"
                  >
                    JPEG, PNG or HEIC · 5MB each
                  </span>
                </div>

                {previews.length > 0 ? (
                  <ul className="mt-4 flex flex-wrap gap-3">
                    {previews.map((preview, index) => (
                      <li key={preview.url} className="relative">
                        {/* Object URLs from a file input cannot go through next/image. */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={preview.url}
                          alt={`Selected photo ${index + 1}: ${preview.name}`}
                          className="size-20 rounded-md border border-line object-cover"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setPhotos(photos.filter((_, i) => i !== index))
                          }
                          className="absolute -right-2 -top-2 grid size-6 place-items-center rounded-full border border-line-strong bg-ink-900 text-silver-300 transition-colors hover:border-accent hover:text-accent"
                        >
                          <IconTrash className="size-3" />
                          <span className="sr-only">
                            Remove {preview.name}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {errors.photos ? (
                  <p className={errorClass} role="alert">
                    {errors.photos}
                  </p>
                ) : null}
              </div>

              <div>
                <label className={labelClass} htmlFor="q-message">
                  Anything else?{" "}
                  <span className="font-normal text-fg-faint">(optional)</span>
                </label>
                <textarea
                  id="q-message"
                  name="message"
                  rows={4}
                  value={values.message}
                  onChange={(e) => update("message", e.target.value)}
                  className={`${fieldClass} resize-y`}
                  placeholder="Rough size, stains you are worried about, best days to come out…"
                />
              </div>

              {/*
                Honeypot. Kept off-screen rather than display:none, because
                basic bots skip anything they cannot see.
              */}
              <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="q-company">Company</label>
                <input
                  id="q-company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.company}
                  onChange={(e) => update("company", e.target.value)}
                />
              </div>

              <div className="mt-1 flex flex-col gap-4 border-t border-line pt-6">
                <CtaButton
                  type="submit"
                  size="lg"
                  full
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "Sending…" : "Get My Free Quote"}
                </CtaButton>

                <p className="text-[0.8125rem] leading-relaxed text-fg-faint">
                  Your details are only used to quote and schedule this job. No
                  lists, no spam, nothing sold. If you do not hear back the same
                  day,{" "}
                  <a
                    href={site.phone.sms}
                    className="font-medium text-silver-300 underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                  >
                    text {site.phone.display}
                  </a>{" "}
                  and it will get sorted.
                </p>
              </div>
            </form>
          )}
        </div></div>
      </div>
    </Section>
  );
}
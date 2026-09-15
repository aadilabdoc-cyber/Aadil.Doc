"use client";

import { useId, useState, type ChangeEvent, type FormEvent } from "react";
import PhoneInput, {
  isValidPhoneNumber,
  parsePhoneNumber,
  Country,
} from "react-phone-number-input";
import enLabels from "react-phone-number-input/locale/en.json";
import "react-phone-number-input/style.css";
import "./phone-input.css";
import { site } from "@/data/site";

type FormValues = {
  name: string;
  email: string;
  country: string;
  phone: string;
  subject: string;
  eventName: string;
  eventVenue: string;
  eventDate: string;
  eventDetails: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const subjects = [
  "General Inquiry",
  "Commercial Booking",
  "Personal Project",
  "Print Inquiry",
  "Other",
];

const initialValues: FormValues = {
  name: "",
  email: "",
  country: "India",
  phone: "",
  subject: "",
  eventName: "",
  eventVenue: "",
  eventDate: "",
  eventDetails: "",
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) errors.name = "Please enter your name.";

  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.country.trim()) errors.country = "Please enter your country.";

  if (!values.phone) {
    errors.phone = "Please enter your phone number.";
  } else if (!isValidPhoneNumber(values.phone)) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!values.subject) errors.subject = "Please choose a subject.";

  if (!values.eventName.trim())
    errors.eventName = "Please enter the event name.";

  if (!values.eventVenue.trim())
    errors.eventVenue = "Please enter the event venue.";

  if (!values.eventDate) errors.eventDate = "Please choose the event date.";

  if (!values.eventDetails.trim()) {
    errors.eventDetails = "Please enter some event details.";
  } else if (values.eventDetails.trim().length < 10) {
    errors.eventDetails = "Event details should be at least 10 characters.";
  }

  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formId = useId();

  const handleChange =
    (field: keyof FormValues) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleCountryChange = (value: Country) => {
    if (!value) return;
    const name = enLabels[value];
    console.log("Country input changed:", value, name);
    setValues((prev) => ({ ...prev, country: name ?? "" }));
  };

  const handlePhoneChange = (value?: string) => {
    console.log("Phone input changed:", value);
    setValues((prev) => ({ ...prev, phone: value ?? "" }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitError(null);
    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = (await response.json()) as { success: boolean; error?: string };

      if (!response.ok || !result.success) {
        setSubmitError(
          result.error ?? "Something went wrong sending your enquiry. Please try again.",
        );
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong sending your enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        role="status"
        className="border border-weathered-silver/40 p-6 text-sm text-aged-silver"
      >
        <p className="text-aged-ivory">
          Thank you, {values.name.split(" ")[0]}.
        </p>
        <p className="mt-3">
          Your enquiry has been sent — {site.photographer} will get back to
          you shortly. You can also reach out directly at{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-aged-ivory underline decoration-weathered-silver underline-offset-4"
          >
            {site.email}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
      <p className="text-xs text-weathered-silver">
        Fields marked * are required.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor={`${formId}-name`}
            className="block text-xs uppercase tracking-[0.15em] text-aged-silver"
          >
            Name *
          </label>
          <input
            id={`${formId}-name`}
            type="text"
            value={values.name}
            onChange={handleChange("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${formId}-name-error` : undefined}
            className="mt-2 w-full border-b border-weathered-silver bg-transparent py-2 text-aged-ivory outline-none focus:border-aged-ivory"
          />
          {errors.name && (
            <p
              id={`${formId}-name-error`}
              className="mt-1 text-xs text-rose-600"
            >
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={`${formId}-email`}
            className="block text-xs uppercase tracking-[0.15em] text-aged-silver"
          >
            Email *
          </label>
          <input
            id={`${formId}-email`}
            type="email"
            value={values.email}
            onChange={handleChange("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={
              errors.email ? `${formId}-email-error` : undefined
            }
            className="mt-2 w-full border-b border-weathered-silver bg-transparent py-2 text-aged-ivory outline-none focus:border-aged-ivory"
          />
          {errors.email && (
            <p
              id={`${formId}-email-error`}
              className="mt-1 text-xs text-rose-600"
            >
              {errors.email}
            </p>
          )}
        </div>

        {/* <div>
          <label
            htmlFor={`${formId}-country`}
            className="block text-xs uppercase tracking-[0.15em] text-aged-silver"
          >
            Country *
          </label>
          <input
            id={`${formId}-country`}
            type="text"
            value={values.country}
            onChange={handleChange("country")}
            aria-invalid={Boolean(errors.country)}
            aria-describedby={errors.country ? `${formId}-country-error` : undefined}
            className="mt-2 w-full border-b border-weathered-silver bg-transparent py-2 text-aged-ivory outline-none focus:border-aged-ivory"
          />
          {errors.country && (
            <p id={`${formId}-country-error`} className="mt-1 text-xs text-rose-600">
              {errors.country}
            </p>
          )}
        </div> */}

        <div>
          <label
            htmlFor={`${formId}-phone`}
            className="block text-xs uppercase tracking-[0.15em] text-aged-silver"
          >
            Phone *
          </label>
          <div className="mt-2">
            <PhoneInput
              id={`${formId}-phone`}
              international
              defaultCountry="IN"
              value={values.phone}
              onCountryChange={handleCountryChange}
              onChange={handlePhoneChange}
              className="w-full border-b border-weathered-silver bg-transparent py-2 text-aged-ivory outline-none focus:border-aged-ivory"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={
                errors.phone ? `${formId}-phone-error` : undefined
              }
            />
          </div>
          {errors.phone && (
            <p
              id={`${formId}-phone-error`}
              className="mt-1 text-xs text-rose-600"
            >
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor={`${formId}-subject`}
          className="block text-xs uppercase tracking-[0.15em] text-aged-silver"
        >
          Subject *
        </label>
        <select
          id={`${formId}-subject`}
          value={values.subject}
          onChange={handleChange("subject")}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={
            errors.subject ? `${formId}-subject-error` : undefined
          }
          className="mt-2 w-full border-b border-weathered-silver bg-obsidian py-2 text-aged-ivory outline-none focus:border-aged-ivory"
        >
          <option value="">Choose one</option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
        {errors.subject && (
          <p
            id={`${formId}-subject-error`}
            className="mt-1 text-xs text-rose-600"
          >
            {errors.subject}
          </p>
        )}
      </div>

      <div className="border-t border-weathered-silver/20 pt-6">
        <p className="text-xs uppercase tracking-[0.15em] text-weathered-silver">
          Event Details
        </p>

        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor={`${formId}-event-name`}
              className="block text-xs uppercase tracking-[0.15em] text-aged-silver"
            >
              Event Name *
            </label>
            <input
              id={`${formId}-event-name`}
              type="text"
              value={values.eventName}
              onChange={handleChange("eventName")}
              aria-invalid={Boolean(errors.eventName)}
              aria-describedby={
                errors.eventName ? `${formId}-event-name-error` : undefined
              }
              className="mt-2 w-full border-b border-weathered-silver bg-transparent py-2 text-aged-ivory outline-none focus:border-aged-ivory"
            />
            {errors.eventName && (
              <p
                id={`${formId}-event-name-error`}
                className="mt-1 text-xs text-rose-600"
              >
                {errors.eventName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor={`${formId}-event-venue`}
              className="block text-xs uppercase tracking-[0.15em] text-aged-silver"
            >
              Event Venue *
            </label>
            <input
              id={`${formId}-event-venue`}
              type="text"
              value={values.eventVenue}
              onChange={handleChange("eventVenue")}
              aria-invalid={Boolean(errors.eventVenue)}
              aria-describedby={
                errors.eventVenue ? `${formId}-event-venue-error` : undefined
              }
              className="mt-2 w-full border-b border-weathered-silver bg-transparent py-2 text-aged-ivory outline-none focus:border-aged-ivory"
            />
            {errors.eventVenue && (
              <p
                id={`${formId}-event-venue-error`}
                className="mt-1 text-xs text-rose-600"
              >
                {errors.eventVenue}
              </p>
            )}
          </div>

          <div className="sm:col-span-2 sm:max-w-xs">
            <label
              htmlFor={`${formId}-event-date`}
              className="block text-xs uppercase tracking-[0.15em] text-aged-silver"
            >
              Event Date *
            </label>
            <input
              id={`${formId}-event-date`}
              type="date"
              value={values.eventDate}
              onChange={handleChange("eventDate")}
              aria-invalid={Boolean(errors.eventDate)}
              aria-describedby={
                errors.eventDate ? `${formId}-event-date-error` : undefined
              }
              className="mt-2 w-full scheme-dark border-b border-weathered-silver bg-obsidian py-2 text-aged-ivory outline-none focus:border-aged-ivory"
            />
            {errors.eventDate && (
              <p
                id={`${formId}-event-date-error`}
                className="mt-1 text-xs text-rose-600"
              >
                {errors.eventDate}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <label
            htmlFor={`${formId}-event-details`}
            className="block text-xs uppercase tracking-[0.15em] text-aged-silver"
          >
            Event Details *
          </label>
          <textarea
            id={`${formId}-event-details`}
            rows={5}
            value={values.eventDetails}
            onChange={handleChange("eventDetails")}
            aria-invalid={Boolean(errors.eventDetails)}
            aria-describedby={
              errors.eventDetails ? `${formId}-event-details-error` : undefined
            }
            className="mt-2 w-full resize-none border-b border-weathered-silver bg-transparent py-2 text-aged-ivory outline-none focus:border-aged-ivory"
          />
          {errors.eventDetails && (
            <p
              id={`${formId}-event-details-error`}
              className="mt-1 text-xs text-rose-600"
            >
              {errors.eventDetails}
            </p>
          )}
        </div>
      </div>

      {submitError && (
        <p role="alert" className="text-xs text-rose-600">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="self-start border border-aged-ivory px-6 py-3 text-xs uppercase tracking-[0.2em] text-aged-ivory transition-colors hover:bg-aged-ivory hover:text-obsidian disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? "Sending…" : "Send Enquiry"}
      </button>
    </form>
  );
}

"use client";

import { useState } from "react";
import { useLang } from "@/components/providers/LangProvider";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Field";
import { FormShell, FormSuccess } from "@/components/ui/FormShell";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { TOPICS, type Topic } from "@/lib/options";
import { businessSchema } from "@/lib/schemas";

export function BusinessForm() {
  const { d } = useLang();
  const { errors, status, submit } = useFormSubmit(
    "/api/business",
    businessSchema,
  );

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState<Topic>("partnership");
  const [message, setMessage] = useState("");

  const topicLabels: Record<Topic, string> = {
    partnership: d.business.topicPartnership,
    sponsorship: d.business.topicSponsorship,
    media: d.business.topicMedia,
    other: d.business.topicOther,
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await submit({ name, company, email, topic, message });
  };

  return (
    <FormShell
      id="apply"
      title={d.business.title}
      sub={d.business.sub}
      className="bg-slate-50 border-t border-slate-200"
    >
      {status === "done" ? (
        <FormSuccess title={d.form.success} sub={d.form.successSub} />
      ) : (
        <form onSubmit={onSubmit} noValidate className="relative z-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label={d.business.name}
              value={name}
              onChange={(event) => setName(event.target.value)}
              error={errors.name}
              autoComplete="name"
              required
            />
            <Input
              label={d.business.company}
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              error={errors.company}
              autoComplete="organization"
              hint={d.form.optional}
            />
          </div>

          <Input
            label={d.business.email}
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={errors.email}
            placeholder="you@company.com"
            autoComplete="email"
            required
          />

          <Select
            label={d.business.topic}
            value={topic}
            onChange={(event) => setTopic(event.target.value as Topic)}
            error={errors.topic}
          >
            {TOPICS.map((option) => (
              <option key={option} value={option}>
                {topicLabels[option]}
              </option>
            ))}
          </Select>

          <Textarea
            label={d.business.message}
            rows={4}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            error={errors.message}
            required
          />

          {errors.form ? (
            <p className="text-sm text-rose-600 font-medium text-center">
              {errors.form}
            </p>
          ) : null}

          <Button variant="submit" type="submit" disabled={status === "sending"}>
            {status === "sending" ? d.form.sending : d.business.submit}
          </Button>
        </form>
      )}
    </FormShell>
  );
}

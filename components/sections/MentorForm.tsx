"use client";

import { useState } from "react";
import { useLang } from "@/components/providers/LangProvider";
import { Button } from "@/components/ui/Button";
import { ChipGroup } from "@/components/ui/ChipGroup";
import { Input, Select } from "@/components/ui/Field";
import { FormShell, FormSuccess } from "@/components/ui/FormShell";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import {
  AVAILABILITY,
  EXPERTISE,
  STAGES,
  type Availability,
  type Expertise,
  type Stage,
} from "@/lib/options";
import { mentorSchema } from "@/lib/schemas";

export function MentorForm() {
  const { d } = useLang();
  const { errors, status, submit } = useFormSubmit(
    "/api/join-mentor",
    mentorSchema,
  );

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [expertise, setExpertise] = useState<Expertise[]>([]);
  const [industries, setIndustries] = useState("");
  const [supports, setSupports] = useState<Stage[]>([]);
  const [linkedin, setLinkedin] = useState("");
  const [availability, setAvailability] = useState<Availability | "">("");

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await submit({
      fullName,
      email,
      role,
      expertise,
      industries,
      supports,
      linkedin,
      availability: availability || undefined,
    });
  };

  return (
    <FormShell
      id="join-mentor"
      title={d.formMentor.title}
      sub={d.formMentor.sub}
      className="bg-white/60 backdrop-blur-sm border-t border-white/30"
    >
      {status === "done" ? (
        <FormSuccess title={d.form.success} sub={d.form.successSub} />
      ) : (
        <form onSubmit={onSubmit} noValidate className="relative z-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label={d.formMentor.fullName}
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              error={errors.fullName}
              autoComplete="name"
              required
            />
            <Input
              label={d.formMentor.email}
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              error={errors.email}
              placeholder="you@company.com"
              autoComplete="email"
              required
            />
          </div>

          <Input
            label={d.formMentor.role}
            value={role}
            onChange={(event) => setRole(event.target.value)}
            error={errors.role}
            placeholder={d.formMentor.rolePlaceholder}
            hint={d.form.optional}
          />

          <ChipGroup
            label={d.formMentor.expertise}
            options={EXPERTISE}
            labels={d.options.expertise}
            value={expertise}
            onChange={setExpertise}
            error={errors.expertise}
          />

          <Input
            label={d.formMentor.industries}
            value={industries}
            onChange={(event) => setIndustries(event.target.value)}
            error={errors.industries}
            placeholder={d.formMentor.industriesPlaceholder}
            hint={d.form.optional}
          />

          <ChipGroup
            label={d.formMentor.supports}
            options={STAGES}
            labels={d.options.stage}
            value={supports}
            onChange={setSupports}
            error={errors.supports}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label={d.formMentor.linkedin}
              type="url"
              value={linkedin}
              onChange={(event) => setLinkedin(event.target.value)}
              error={errors.linkedin}
              placeholder="https://www.linkedin.com/in/..."
              hint={d.form.optional}
            />
            <Select
              label={d.formMentor.availability}
              value={availability}
              onChange={(event) =>
                setAvailability(event.target.value as Availability | "")
              }
              error={errors.availability}
              required
            >
              <option value="" disabled>
                {d.formMentor.availabilityPlaceholder}
              </option>
              {AVAILABILITY.map((option) => (
                <option key={option} value={option}>
                  {d.options.availability[option]}
                </option>
              ))}
            </Select>
          </div>

          {errors.form ? (
            <p className="text-sm text-rose-600 font-medium text-center">
              {errors.form}
            </p>
          ) : null}

          <Button variant="submit" type="submit" disabled={status === "sending"}>
            {status === "sending" ? d.form.sending : d.formMentor.submit}
          </Button>
        </form>
      )}
    </FormShell>
  );
}

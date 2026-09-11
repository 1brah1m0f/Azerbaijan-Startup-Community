"use client";

import { useState } from "react";
import { useLang } from "@/components/providers/LangProvider";
import { Button } from "@/components/ui/Button";
import { ChipGroup } from "@/components/ui/ChipGroup";
import { Input, Select, Textarea } from "@/components/ui/Field";
import { FormShell, FormSuccess } from "@/components/ui/FormShell";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import {
  MAX_DESCRIPTION,
  NEEDS,
  SECTORS,
  STAGES,
  type Need,
  type Sector,
  type Stage,
} from "@/lib/options";
import { startupSchema } from "@/lib/schemas";

export function StartupForm() {
  const { d } = useLang();
  const { errors, status, submit } = useFormSubmit(
    "/api/join-startup",
    startupSchema,
  );

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [startupName, setStartupName] = useState("");
  const [stage, setStage] = useState<Stage | "">("");
  const [sector, setSector] = useState<Sector | "">("");
  const [description, setDescription] = useState("");
  const [needs, setNeeds] = useState<Need[]>([]);

  // A startup name is only optional while the founder is still at idea stage.
  const nameOptional = stage === "" || stage === "Idea";

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await submit({
      fullName,
      email,
      startupName,
      stage: stage || undefined,
      sector: sector || undefined,
      description,
      needs,
    });
  };

  return (
    <FormShell
      id="join-startup"
      title={d.formStartup.title}
      sub={d.formStartup.sub}
      className="bg-slate-50 border-t border-slate-200"
    >
      {status === "done" ? (
        <FormSuccess title={d.form.success} sub={d.form.successSub} />
      ) : (
        <form onSubmit={onSubmit} noValidate className="relative z-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label={d.formStartup.fullName}
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              error={errors.fullName}
              autoComplete="name"
              required
            />
            <Input
              label={d.formStartup.email}
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              error={errors.email}
              placeholder="you@startup.az"
              autoComplete="email"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label={d.formStartup.startupName}
              hint={nameOptional ? d.form.optional : undefined}
              value={startupName}
              onChange={(event) => setStartupName(event.target.value)}
              error={errors.startupName}
            />
            <Select
              label={d.formStartup.stage}
              value={stage}
              onChange={(event) => setStage(event.target.value as Stage | "")}
              error={errors.stage}
              required
            >
              <option value="" disabled>
                {d.formStartup.stagePlaceholder}
              </option>
              {STAGES.map((option) => (
                <option key={option} value={option}>
                  {d.options.stage[option]}
                </option>
              ))}
            </Select>
          </div>

          <Select
            label={d.formStartup.sector}
            value={sector}
            onChange={(event) => setSector(event.target.value as Sector | "")}
            error={errors.sector}
            hint={d.form.optional}
          >
            <option value="">{d.formStartup.sectorPlaceholder}</option>
            {SECTORS.map((option) => (
              <option key={option} value={option}>
                {d.options.sector[option]}
              </option>
            ))}
          </Select>

          <Textarea
            label={d.formStartup.description}
            rows={4}
            maxLength={MAX_DESCRIPTION}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            error={errors.description}
            placeholder={d.formStartup.descriptionPlaceholder}
            hint={d.form.optional}
          />

          <ChipGroup
            label={d.formStartup.needs}
            hint={d.formStartup.needsHint}
            options={NEEDS}
            labels={d.options.needs}
            value={needs}
            onChange={setNeeds}
            error={errors.needs}
          />

          {errors.form ? (
            <p className="text-sm text-rose-600 font-medium text-center">
              {errors.form}
            </p>
          ) : null}

          <Button variant="submit" type="submit" disabled={status === "sending"}>
            {status === "sending" ? d.form.sending : d.formStartup.submit}
          </Button>
        </form>
      )}
    </FormShell>
  );
}

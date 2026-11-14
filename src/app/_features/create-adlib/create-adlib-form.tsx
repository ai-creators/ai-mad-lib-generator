"use client";

import { useForm } from "@tanstack/react-form";
import { Info, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { z } from "zod";
import { routerConfig } from "~/app/router-config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { Field, FieldError, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { Slider } from "~/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { api } from "~/trpc/react";
import CreateAdlibTone from "./create-adlib-tone/create-adlib-tone";

const createAdlibSchema = z.object({
  prompt: z.string().min(1).max(100),
  temperature: z.number().min(0).max(2),
  toneId: z.string().optional(),
});

const createAdlibDefaultValues: z.input<typeof createAdlibSchema> = {
  prompt: "",
  temperature: 1,
  toneId: "",
};

function useCreateAdlibForm(
  onSubmit: (value: z.infer<typeof createAdlibSchema>) => void,
) {
  return useForm({
    defaultValues: createAdlibDefaultValues,
    validators: {
      onSubmit: createAdlibSchema,
    },
    onSubmit: ({ value }) => onSubmit(value),
  });
}

export type CreateAdlibFormApi = ReturnType<typeof useCreateAdlibForm>;

export default function CreateAdlibForm() {
  const router = useRouter();
  const utils = api.useUtils();

  const createAdlib = api.adlib.create.useMutation({
    onMutate: () => {
      toast("Generating adlib...");
    },
    onSuccess: async (data: string | undefined) => {
      toast("Adlib generated!");
      await utils.adlib.invalidate();

      if (!data) {
        toast.error("Error creating adlib. Please try again later.");
        return;
      }

      router.push(routerConfig.adlibPlay.execute({ id: data }));
    },
    onError: (error) => {
      toast("Error generating adlib", {
        description: error.message,
      });
    },
  });

  const form = useCreateAdlibForm((value) => createAdlib.mutate(value));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void form.handleSubmit();
      }}
      className="space-y-4 pb-4"
    >
      <form.Field name="prompt">
        {(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>Prompt</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                aria-invalid={isInvalid}
                placeholder="Mystery at the manor..."
                data-cy="prompt-input"
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      </form.Field>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>More Options</AccordionTrigger>
          <AccordionContent>
            <form.Field name="temperature">
              {(field) => (
                <Field>
                  <FieldLabel
                    htmlFor={field.name}
                    className="flex items-center gap-3"
                  >
                    Temperature{" "}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="cursor-pointer">
                            <Info className="h-4 w-4" />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          Temperature controls the randomness in the adlib.
                          Lower values produce more predictable output, while
                          higher values yield more varied responses.
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>{" "}
                  </FieldLabel>
                  <p className="font-semiobold">{field.state.value}</p>
                  <Slider
                    id={field.name}
                    min={0}
                    max={2}
                    step={0.1}
                    value={[field.state.value]}
                    onValueChange={(value) => field.handleChange(value[0]!)}
                    className="py-3"
                  />
                </Field>
              )}
            </form.Field>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <ul className="flex items-center gap-3">
        <li>
          <Button
            className="w-28"
            disabled={createAdlib.isPending}
            data-cy="prompt-submit-btn"
          >
            {createAdlib.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate"
            )}
          </Button>
        </li>
        <li>
          <CreateAdlibTone form={form} disabled={createAdlib.isPending} />
        </li>
        {/* <li>
            <Button
              className="w-34"
              variant="secondary"
              disabled={createAdlib.isPending}
            >
              Generate Random
            </Button>
          </li> */}
      </ul>
    </form>
  );
}

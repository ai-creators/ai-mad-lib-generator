"use client";

import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Field, FieldError, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/trpc/react";

const commentSchema = z.object({
  body: z.string().trim().min(1).max(1000),
  authorName: z
    .string()
    .trim()
    .max(50)
    .optional()
    .transform((value) => (value === "" ? undefined : value)),
});

type Props = {
  adlibId: string;
};

export default function AdlibCommentForm({ adlibId }: Props) {
  const router = useRouter();

  const createComment = api.comments.create.useMutation({
    onSuccess: () => {
      toast.success("Comment posted");
      router.refresh();
      form.reset();
    },
    onError: (error) => {
      toast.error("Error posting comment", {
        description: error.message,
      });
    },
  });

  const commentDefaultValues: z.input<typeof commentSchema> = {
    body: "",
    authorName: "",
  };

  const form = useForm({
    defaultValues: commentDefaultValues,
    validators: {
      onSubmit: commentSchema,
    },
    onSubmit: ({ value }) => {
      const parsed = commentSchema.parse(value);
      createComment.mutate({
        adlibId,
        body: parsed.body,
        authorName: parsed.authorName,
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void form.handleSubmit();
      }}
      className="space-y-3"
    >
      <form.Field name="authorName">
        {(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>Name (optional)</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                aria-invalid={isInvalid}
                placeholder="Anonymous"
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      </form.Field>
      <form.Field name="body">
        {(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>Comment</FieldLabel>
              <Textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                aria-invalid={isInvalid}
                placeholder="Share your thoughts..."
                data-cy="comment-body-input"
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      </form.Field>
      <Button
        type="submit"
        disabled={createComment.isPending}
        data-cy="comment-submit-btn"
      >
        Post Comment
      </Button>
    </form>
  );
}

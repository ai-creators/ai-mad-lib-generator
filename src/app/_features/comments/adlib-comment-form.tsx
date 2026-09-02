"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { toast } from "sonner";

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
  const utils = api.useUtils();
  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      body: "",
      authorName: "",
    },
  });

  const createComment = api.comments.create.useMutation({
    onSuccess: async () => {
      toast.success("Comment posted");
      await utils.comments.getByAdlibId.invalidate({ adlibId });
      form.reset();
    },
    onError: (error) => {
      toast.error("Error posting comment", {
        description: error.message,
      });
    },
  });

  function onSubmit(values: z.infer<typeof commentSchema>) {
    createComment.mutate({
      adlibId,
      body: values.body,
      authorName: values.authorName,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="authorName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name (optional)</FormLabel>
              <FormControl>
                <Input placeholder="Anonymous" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share your thoughts..."
                  data-cy="comment-body-input"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={createComment.isPending}
          data-cy="comment-submit-btn"
        >
          Post Comment
        </Button>
      </form>
    </Form>
  );
}

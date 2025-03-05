/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
import { Button } from "~/components/ui/button";
import {
  AccordionTrigger,
  Accordion,
  AccordionItem,
  AccordionContent,
} from "~/components/ui/accordion";
import { Slider } from "~/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Info } from "lucide-react";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { routerConfig } from "~/app/router-config";

const createAdlibSchema = z.object({
  prompt: z.string().min(1).max(100),
  temperature: z.number().min(0).max(2),
});

export default function CreateAdlibForm() {
  const router = useRouter();
  const utils = api.useUtils();
  const form = useForm<z.infer<typeof createAdlibSchema>>({
    resolver: zodResolver(createAdlibSchema),
    defaultValues: {
      prompt: "",
      temperature: 1,
    },
  });

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

  function onSubmit(values: z.infer<typeof createAdlibSchema>) {
    createAdlib.mutate(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem className="px-5">
              <FormLabel>Prompt</FormLabel>
              <FormControl>
                <Input placeholder="Mystery at the manor..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Accordion type="single" collapsible className="px-5">
          <AccordionItem value="item-1">
            <AccordionTrigger>More Options</AccordionTrigger>
            <AccordionContent>
              <FormField
                control={form.control}
                name="temperature"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-3">
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
                    </FormLabel>
                    <p className="font-semiobold">{field.value}</p>
                    <FormControl>
                      <Slider
                        min={0}
                        max={2}
                        step={0.1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        className="py-3"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <ul className="flex items-center gap-3 px-5 pb-5">
          <li>
            <Button className="w-28" disabled={createAdlib.isPending}>
              Generate
            </Button>
          </li>
          <li>
            <Button
              className="w-34"
              variant="secondary"
              disabled={createAdlib.isPending}
            >
              Generate Random
            </Button>
          </li>
        </ul>
      </form>
    </Form>
  );
}

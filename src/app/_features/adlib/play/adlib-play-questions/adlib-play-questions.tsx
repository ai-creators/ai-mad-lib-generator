"use client";

import { type inferProcedureOutput } from "@trpc/server";
import { Loader2 } from "lucide-react";
import React, { memo, useState } from "react";
import { type AppRouter } from "~/server/api/root";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { parseAdlib } from "../parseAdlib";

type Adlib = inferProcedureOutput<AppRouter["adlib"]["getAdlibByIdPlay"]>;

interface AdlibPlayQuestionsProps {
  adlib: Adlib;
  onSubmit: (answers: string[]) => void;
  isSubmitting?: boolean;
}

function AdlibPlayQuestions({
  adlib,
  onSubmit,
  isSubmitting,
}: AdlibPlayQuestionsProps) {
  const parsedAdlib = parseAdlib(adlib.text ?? "");
  const [answers, setAnswers] = useState<string[]>(
    Array(parsedAdlib.placeholders.length).fill(""),
  );

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(answers);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{adlib.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {parsedAdlib.placeholders.map((placeholder, index) => (
            <div key={index} className="flex flex-col gap-2">
              <label
                htmlFor={`answer-${index}`}
                className="text-sm font-medium"
              >
                {placeholder.type}
              </label>
              <Input
                id={`answer-${index}`}
                value={answers[index]}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                placeholder={`Enter a ${placeholder.type}`}
                data-cy="adlib-answer-input"
                required
              />
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            disabled={isSubmitting}
            data-cy="generate-story-btn"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Story"
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

export default memo(AdlibPlayQuestions);

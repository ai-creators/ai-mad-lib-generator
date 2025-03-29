"use client";

import { type inferProcedureOutput } from "@trpc/server";
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
}

function AdlibPlayQuestions({ adlib, onSubmit }: AdlibPlayQuestionsProps) {
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
    <Card>
      <CardHeader>
        <CardTitle>{adlib.title}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
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
                required
              />
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button type="submit">Generate Story</Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default memo(AdlibPlayQuestions);

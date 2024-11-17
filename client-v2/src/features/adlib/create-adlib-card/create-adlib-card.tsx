"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import React, { FormEvent, useState } from "react";
import { AdlibLables } from "../adlib-labels/adlib-labels";
import { Slider } from "@/components/ui/slider";

type CreateAdlibConfig = {
  temperature: number;
};

const CreateAdlibCard = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [config, setConfig] = useState<CreateAdlibConfig>({
    temperature: 0.7,
  });

  const onChangeConfig = (key: keyof CreateAdlibConfig, value: number) => {
    setConfig((curr) => ({ ...curr, [key]: value }));
  };

  const createAdlib = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <Card className="rounded-none md:rounded-lg p-5">
      <h3 className="text-2xl font-semibold mb-3">Generate an Adlib</h3>
      <form className="flex flex-col gap-5" onSubmit={createAdlib}>
        <div className="flex flex-col gap-3">
          <Label
            htmlFor="prompt"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground"
          >
            Enter a prompt to generate an adlib
          </Label>
          <Input
            id="prompt"
            name="prompt"
            placeholder="Mystery at the manor..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>More Options</AccordionTrigger>
            <AccordionContent>
              <ul className="flex flex-col gap-5">
                <li>
                  <div className="flex items-center gap-2 mb-2">
                    <Label
                      htmlFor="temperature"
                      className="text-muted-foreground"
                    >
                      Temperature
                    </Label>
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger asChild type="button">
                          <Info size={16} />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-lg">
                          <p>{AdlibLables.TEMPERATURE_TOOLTIPS}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="mb-3">{config.temperature}</p>
                  <Slider
                    defaultValue={[config.temperature]}
                    max={2}
                    step={0.1}
                    value={[config.temperature]}
                    onValueChange={(value: number[]) =>
                      onChangeConfig("temperature", value[0])
                    }
                  />
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <ul className="flex items-center gap-3">
          <li>
            <Button type="submit">Generate</Button>
          </li>
          <li>
            <Button variant="secondary" type="submit">
              Generate Random
            </Button>
          </li>
        </ul>
      </form>
    </Card>
  );
};

export default CreateAdlibCard;

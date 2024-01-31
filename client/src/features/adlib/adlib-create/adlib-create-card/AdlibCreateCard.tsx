import { Accordion } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AdlibLables } from "../../adlib-labels/AdlibLabels";
import { Info } from "lucide-react";
import { useAdlibCreateCard } from "./AdlibCreateCard.hooks";
import ErrorAlert from "@/errors/ErrorAlert";
import LoaderAlert from "@/components/loader/loader-alert/LoaderAlert";

const AdlibCreateCard = () => {
  const {
    config,
    changeConfig,
    generate,
    error,
    isLoading,
    prompt,
    changePrompt,
  } = useAdlibCreateCard();

  return (
    <>
      {isLoading ? (
        <LoaderAlert title="Loading" description="Keep them doggies loading" />
      ) : null}
      <Card className="p-5">
        <ErrorAlert error={error} className="mb-3" />
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">Generate an Adlib</h2>
          <form className="flex flex-col gap-3">
            <Label htmlFor="adlib" className="text-zinc-600 dark:text-zinc-400">
              Enter a prompt to generate an adlib
            </Label>
            <Input
              type="text"
              id="adlib"
              placeholder="The Rock fighting Kevin Hart..."
              value={prompt}
              onChange={changePrompt}
            />
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-semibold">
                  More Options
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-5">
                    <div className="grid w-full max-w-sm items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <Label
                          htmlFor="temperature"
                          className="text-zinc-600 dark:text-zinc-400"
                        >
                          Temperature
                        </Label>
                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info size={16} />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-lg">
                              <p>{AdlibLables.TEMPERATURE_TOOLTIPS}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <p>{config.temperature}</p>
                      <Slider
                        defaultValue={[config.temperature]}
                        max={1}
                        step={0.1}
                        value={[config.temperature]}
                        onValueChange={(value: number[]) =>
                          changeConfig("temperature", value[0])
                        }
                      />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <Label
                          htmlFor="temperature"
                          className="text-zinc-600 dark:text-zinc-400"
                        >
                          Top P
                        </Label>
                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info size={16} />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-lg">
                              <p>{AdlibLables.TOP_P_TOOLTIPS}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <p>{config.topP}</p>
                      <Slider
                        defaultValue={[config.topP]}
                        max={1}
                        step={0.1}
                        onValueChange={(value: number[]) =>
                          changeConfig("topP", value[0])
                        }
                        value={[config.topP]}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <Button type="submit" disabled={isLoading} onClick={generate}>
                {isLoading ? "Loading..." : "Generate"}
              </Button>
              <Button variant="secondary" disabled={isLoading}>
                {isLoading ? "Loading..." : "Generate Random"}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </>
  );
};

export default AdlibCreateCard;

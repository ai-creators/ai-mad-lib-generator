import { AdlibLables } from "../../../labels/AdlibLabels";
import Accordion from "../../accordion/Accordion";
import ButtonPrimary from "../../button/button-primary/ButtonPrimary";
import Card from "../../card/Card";
import ErrorAlert from "../../errors/ErrorAlert";
import Tablist from "../../tablist/Tablist";
import Tooltip from "../../tooltip/Tooltip";
import { AdlibLengths } from "../AdlibLengths";
import { useAdlibCreate } from "./AdlibCreate.hooks";

const AdlibCreate = () => {
  const {
    prompt,
    changePrompt,
    error,
    isLoading,
    generate,
    temperature,
    changeTemperature,
    topP,
    changeTopP,
    length,
    changeLength,
  } = useAdlibCreate();
  return (
    <div className="flex flex-col gap-5">
      <ErrorAlert error={error} />
      <Card className="flex flex-col gap-5">
        <div>
          <h2 className="text-2xl font-semibold">Create an Adlib</h2>
          <p className="text-zinc-500">Enter a prompt to generate an adlib.</p>
        </div>
        <form onSubmit={generate} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label
              className="text-zinc-500 after:content-['*'] after:ml-1 after:text-red-700"
              htmlFor="prompt"
            >
              Prompt
            </label>
            <input
              id="prompt"
              className="border border-zinc-300 p-3 rounded w-full focus:outline outline-2 outline-offset-2"
              placeholder="The Rock fighting paper"
              value={prompt}
              onChange={changePrompt}
            />
          </div>
          <Accordion header="Adlib Options" className="flex flex-col gap-0">
            <div className="flex flex-col gap-2">
              <div className="flex gap-3">
                <label className="text-zinc-500" htmlFor="temperature">
                  Temperature
                </label>
                <Tooltip
                  id="temperautre-tooltip"
                  text={AdlibLables.TEMPERATURE_TOOLTIPS}
                  width="w-60"
                />
              </div>

              <p>{temperature}</p>
              <input
                id="temperature"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={temperature}
                className="my-2 w-full h-2 bg-zinc-300 rounded-lg appearance-none cursor-pointer accent-indigo-700"
                onChange={changeTemperature}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-3">
                <label className="text-zinc-500" htmlFor="temperature">
                  Top P
                </label>
                <Tooltip
                  id="temperautre-tooltip"
                  text={AdlibLables.TEMPERATURE_TOOLTIPS}
                  width="w-60"
                />
              </div>

              <p>{topP}</p>
              <input
                id="temperature"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={topP}
                className="my-2 w-full h-2 bg-zinc-300 rounded-lg appearance-none cursor-pointer accent-indigo-700"
                onChange={changeTopP}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-3">
                <label className="text-zinc-500" htmlFor="temperature">
                  Length
                </label>
              </div>
              <Tablist
                options={[
                  AdlibLengths.SHORT,
                  AdlibLengths.MEDIUM,
                  AdlibLengths.LONG,
                ]}
                currentOption={length}
                changeOption={changeLength}
              />
            </div>
          </Accordion>
          <div>
            <ButtonPrimary disabled={isLoading || !prompt.length}>
              {isLoading ? "Loading..." : "Generate Adlib"}
            </ButtonPrimary>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AdlibCreate;

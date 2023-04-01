import { Api } from "./Api";

export class MadLibApi extends Api {
  constructor() {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    if (!baseUrl) {
      throw new Error("No base url has been provided");
    }
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    super(baseUrl, headers);
  }

  async generate(prompt) {
    const path = "/generate/madlib";
    const options = {
      method: "POST",
      body: JSON.stringify({ data: prompt }),
    };
    return this.fetchJson(path, options, {});
  }
}

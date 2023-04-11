const limit = import.meta.env.VITE_MAX_REQUEST_LIMIT;
const requestTimeout = import.meta.env.VITE_MAX_REQUEST_TIMEOUT;

export class Api {
  baseUrl;
  headers;

  constructor(baseUrl, headers) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  async fetchJson(path, options, onCancel) {
    try {
      const response = await fetch(this.baseUrl + path, {
        headers: this.headers,
        ...options,
      });
      if (response.status === 429) {
        return Promise.reject({
          message: `You can only make ${limit} ad-lib request every  ${
            parseInt(requestTimeout) / 60000
          } minutes. Please try again later.`,
        });
      }
      if (response.status === 204) {
        return onCancel;
      }
      const payload = await response.json();
      if (payload.error) {
        return Promise.reject({ message: payload.error });
      }
      return payload.data;
    } catch (error) {
      if (error.name !== "AbortError") {
        throw error;
      }
      return Promise.resolve(onCancel);
    }
  }
}

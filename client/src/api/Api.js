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

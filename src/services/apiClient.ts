class APIClient {
  private baseURL: string;

  constructor(baseURL?: string) {
    this.baseURL = baseURL || '/api';
  }

  async request(url: string, options: RequestInit) {
    const sendingUrl = `${this.baseURL}${url}`;
    console.log('request', sendingUrl, options);

    const response = await fetch(sendingUrl, options);
    const responseJson = await response.json();
    console.log('response', responseJson);

    if (response.ok) {
      responseJson.isSuccess = true;
      return responseJson;
    } else {
      console.error(responseJson);
      responseJson.isSuccess = false;
      return responseJson;
    }
  }

  get(url: string) {
    return this.request(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  post(url: string, data: any) {
    return this.request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  // You can add more methods (put, delete, etc.) here as needed
}

export const apiClient = new APIClient(process.env.BASE_API_URL);

export class HTTPError extends Error {
  status: number;
  response: any;

  constructor(message: string, status: number, response: any) {
    super(message);
    this.status = status;
    this.response = response;
  }
}

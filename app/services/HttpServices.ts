import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export abstract class HttpServices {
  protected static async get(endpoint: string): Promise<AxiosResponse> {
    return this.handleRequest(endpoint, 'GET');
  }

  protected static async post(
    endpoint: string,
    data: Record<string, unknown>,
  ): Promise<AxiosResponse> {
    return this.handleRequest(endpoint, 'POST', data);
  }

  protected static async put(
    endpoint: string,
    data: Record<string, unknown>,
  ): Promise<AxiosResponse> {
    return this.handleRequest(endpoint, 'PUT', data);
  }

  protected static async delete(endpoint: string): Promise<AxiosResponse> {
    return this.handleRequest(endpoint, 'DELETE');
  }

  private static async handleRequest(
    endpoint: string,
    method: string,
    data?: Record<string, unknown>,
  ): Promise<AxiosResponse> {
    try {
      const baseUrl = 'https://mole-hunt.netlify.app';
      const url = `${baseUrl}${endpoint}`;
      const options: AxiosRequestConfig = {
        method,
        url,
        headers: {
          'Content-Type': 'application/json',
        },
        data,
      };

      const response = await axios(options);

      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }
}

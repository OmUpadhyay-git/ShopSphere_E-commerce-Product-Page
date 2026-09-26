import axios, { AxiosError, AxiosInstance } from 'axios';
import type { Product } from '../types/product';

const defaultConfig = {
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
  rateLimit: {
    auth: {
      perIp: { limit: 5, windowMs: 60000 },
      perAccount: { limit: 3, windowMs: 60000 },
    },
    public: { limit: 30, windowMs: 60000 },
    userActions: { limit: 100, windowMs: 60000 },
  },
} as const;

let apiClient: AxiosInstance;

function createClient(baseURL: string = defaultConfig.baseURL): AxiosInstance {
  const client = axios.create({
    baseURL,
    timeout: defaultConfig.timeout,
  });

  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 429) {
        const message = 'Too many requests. Please try again later.';
        error.response!.data = { message };
        error.response!.status = 429;
      }

      const genericMessage = error.response?.data?.message || 'An unexpected error occurred';
      error.response!.data = { message: genericMessage };
      return Promise.reject(new Error(genericMessage));
    }
  );

  return client;
}

if (!apiClient) {
  apiClient = createClient();
}

export function setBaseURL(url: string) {
  apiClient = createClient(url);
}

export async function getProducts(): Promise<Product[]> {
  const response = await apiClient.get<Product[]>('/products');
  return response.data;
}

export async function getProductById(id: number): Promise<Product> {
  const response = await apiClient.get<Product>(`/products/${id}`);
  return response.data;
}

export async function getCategories(): Promise<string[]> {
  const response = await apiClient.get<string[]>('/products/categories');
  return response.data;
}

export async function getProductsByCategory(
  category: string,
): Promise<Product[]> {
  const response = await apiClient.get<Product[]>(
    `/products/category/${category}`,
  );
  return response.data;
}

export { apiClient };
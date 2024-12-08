import { APIResponse, AccountInfo, NDFactResponse } from '@/types';

const API_URL = "https://mobile-pre.at.dz/api";

export class APIClient {
  private async fetchWithHeaders(url: string, options: RequestInit) {
    const headers = {
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0",
      "Accept-Encoding": "gzip",
      ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    return response.json();
  }

  async login(nd: string, password: string): Promise<APIResponse> {
    const url = `${API_URL}/auth/login_new`;
    const payload = { nd, password, lang: "fr" };
    
    return this.fetchWithHeaders(url, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  async getAccountInfo(token: string): Promise<AccountInfo> {
    const url = `${API_URL}/compte_augmentation_debit`;
    
    return this.fetchWithHeaders(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async checkNdFact(nd: string): Promise<NDFactResponse> {
    const url = `${API_URL}/epay/checkNdFact`;
    const payload = {
      nd,
      nfact: "",
      service: "Dus",
    };
    
    return this.fetchWithHeaders(url, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }
}
import { ILanguageService } from "application/interfaces/language_service_interface";
import { Language } from "../../domain/entities/language";

interface LanguageUrlResponse {
  count: number,
  results: Array<{
    index: string;
    name: string;
    url: string;
  }>;
}

interface LanguageResponse {
  index: string,
  name: string,
  type: string,
  typical_speakers: Array<string>
  script: string,
  url: string
}

class LanguageService implements ILanguageService {
  private cachedLanguages: Language[] | null = null;
  constructor() {}

  async getLanguages(): Promise<Language[]> {
    if (this.cachedLanguages) {
      return this.cachedLanguages
    }

    const urls = await this.getUrls()
    return await this.fetchLanguages(urls);
  }

  private async getUrls(): Promise<string[]> {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch("https://www.dnd5eapi.co/api/languages", requestOptions);
      const result = (await response.json()) as LanguageUrlResponse;
      return result.results.map((language) => language.url);
    } catch (error) {
      console.error("Error fetching languages url:", error);
      return [];
    }
  }

  private async fetchLanguages(urls: string[]): Promise<Language[]> {
    const languageList: Language[] = []

    for (const url of urls) {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      const requestOptions: RequestInit = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      try {
        const response = await fetch(`https://www.dnd5eapi.co${url}`, requestOptions);        
        const result = (await response.json()) as LanguageResponse;
        languageList.push(new Language(result.index, result.name));
      } catch (error) {
        console.error("Error fetching language:", error);
      }
    }

    this.cachedLanguages = languageList
    return languageList
  }
}

export const LanguageServiceInstance = new LanguageService()
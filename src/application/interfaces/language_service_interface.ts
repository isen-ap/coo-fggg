import { Language } from "../../domain/entities/language";

export interface ILanguageService {
  getLanguages(): Promise<Language[]>
}
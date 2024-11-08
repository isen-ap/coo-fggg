import { ISkillService } from "application/interfaces/skill_service_interface";
import { Proficiencies } from "../../domain/entities/proficiencies";

interface SkillUrlResponse {
  count: number;
  results: Array<{
    index: string;
    name: string;
    url: string;
  }>;
}

interface SkillResponse {
  index: string;
  name: string;
  desc: string[];
  ability_score: {
    index: string,
    name: string,
    url: string
  }
  url: string;
}

class SkillService implements ISkillService {
  private cachedSkills: Proficiencies[] | null = null;

  constructor() {}

  async getSkills(): Promise<Proficiencies[]> {
    if (this.cachedSkills) {
      return this.cachedSkills;
    }

    const urls = await this.getUrls();
    return await this.fetchSkills(urls);
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
      const response = await fetch("https://www.dnd5eapi.co/api/proficiencies", requestOptions);
      const result = (await response.json()) as SkillUrlResponse;
      return result.results.map((skill) => skill.index);
    } catch (error) {
      console.error("Error fetching skills url:", error);
      return [];
    }
  }

  private async fetchSkills(skillsUrls: string[]): Promise<Proficiencies[]> {
    const skillsList: Proficiencies[] = [];

    for (const url of skillsUrls) {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      const requestOptions: RequestInit = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      try {
        console.log(`https://www.dnd5eapi.co/api/proficiencies/${url}`);
        const response = await fetch(`https://www.dnd5eapi.co/api/proficiencies/${url}`, requestOptions);
        const result = (await response.json()) as SkillResponse;
        skillsList.push(new Proficiencies(result.index, result.name));
      } catch (error) {
        console.error("Error fetching skill:", error);
      }
    }

    this.cachedSkills = skillsList;
    return skillsList;
  }
}

export const SkillServiceInstance = new SkillService();
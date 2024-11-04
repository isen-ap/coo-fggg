import { ISkillService } from "application/interfaces/skill_service_interface";
import { Skill } from "../../domain/entities/skill";

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
  private cachedSkills: Skill[] | null = null;

  constructor() {}

  async getSkills(): Promise<Skill[]> {
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
      const response = await fetch("https://www.dnd5eapi.co/api/skills", requestOptions);
      const result = (await response.json()) as SkillUrlResponse;
      return result.results.map((skill) => skill.index);
    } catch (error) {
      console.error("Error fetching skills url:", error);
      return [];
    }
  }

  private async fetchSkills(skillsUrls: string[]): Promise<Skill[]> {
    const skillsList: Skill[] = [];

    for (const url of skillsUrls) {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      const requestOptions: RequestInit = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      try {
        const response = await fetch(`https://www.dnd5eapi.co/api/skills/${url}`, requestOptions);
        const result = (await response.json()) as SkillResponse;
        skillsList.push(new Skill(url, result.name, result.desc[0]));
      } catch (error) {
        console.error("Error fetching skill:", error);
      }
    }

    this.cachedSkills = skillsList;
    return skillsList;
  }
}

export const SkillServiceInstance = new SkillService();
import { IAlignmentService } from "../interfaces/alignment_service_interface";
import * as console from "console";

interface AlignmentResponse {
  count: number;
  results: Array<{
    index: string;
    name: string;
    url: string;
  }>;
}

export class AlignmentService implements IAlignmentService {
  private cachedAlignments: string[] | null = null;
  constructor() {}
  getAlignments(): string[] {
    if (this.cachedAlignments) {
      return this.cachedAlignments;
    }
    this.fetchAlignments();
    return [""];
  }

  private async fetchAlignments(): Promise<void> {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch("https://www.dnd5eapi.co/api/alignments", requestOptions);
      const result = (await response.json()) as AlignmentResponse;
      console.log(result);
      this.cachedAlignments = result.results.map((alignment) => alignment.name);
    } catch (error) {
      console.error("Error fetching alignments:", error);
      this.cachedAlignments = [""];
    }
  }
}

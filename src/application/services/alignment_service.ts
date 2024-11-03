import { IAlignmentService } from "../interfaces/alignment_service_interface";
import * as console from "console";
import AlignmentResponse from "interface/api/rest/dto/response/get_alignments_response";
import SpecificAlignmentResponse from "interface/api/rest/dto/response/get_specific_alignment_response";

export class AlignmentService implements IAlignmentService {
  private cachedAlignments: string[] | null = null;

  async getAlignments(): Promise<string[]> {
    if (this.cachedAlignments) {
      return this.cachedAlignments;
    }
    await this.fetchAlignments();
    return this.cachedAlignments || ["Error loading alignments"];
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
      this.cachedAlignments = result.results.map((alignment) => alignment.name);
    } catch (error) {
      this.cachedAlignments = [""];
    }
  }

  async getSpecificAlignments(index: string): Promise<SpecificAlignmentResponse> {
    const alignment = await this.fetchSpecificAlignment(index);

    if (alignment) {
      return alignment;
    } else {
      return { index: "", name: "", abbreviation: "", desc: "", url: "" };
    }
  }

  private async fetchSpecificAlignment(index: string): Promise<SpecificAlignmentResponse | null> {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(`https://www.dnd5eapi.co/api/alignments/${index}`, requestOptions);
      if (!response.ok) {
        throw new Error(`Error fetching alignment: ${response.statusText}`);
      }
      const result = (await response.json()) as SpecificAlignmentResponse;
      return result;
    } catch (error) {
      console.error("Error fetching alignments:", error);
      return null;
    }
  }
}

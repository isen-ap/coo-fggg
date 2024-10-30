import SpecificAlignmentResponse from "interface/api/rest/dto/response/get_specific_alignment_response";

export interface IAlignmentService {
  getAlignments(): Promise<string[]>;
  getSpecificAlignments(index: string): Promise<SpecificAlignmentResponse>;
}

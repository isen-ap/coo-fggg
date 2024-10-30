export default interface AlignmentResponse {
  count: number;
  results: Array<{
    index: string;
    name: string;
    url: string;
  }>;
}


export enum ThreatLevel {
  SAFE = 'Safe',
  SUSPICIOUS = 'Suspicious',
  HIGH_RISK = 'High Risk'
}

export interface AssessmentResult {
  threatLevel: ThreatLevel;
  reasoning: string;
  redFlags: string[];
  nextSteps: string[];
}

export interface AnalysisRequest {
  text?: string;
  imageData?: string;
  mimeType?: string;
}

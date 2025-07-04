export interface Provider {
  id: string;
  name: string;
  specialty: string;
  rating: number;
}
// src/types/provider.ts
export type Provider = {
  id: string;
  name: string;
  specialty: string;
  city?: string;
  rating: number;
  score?: number;      // komt uit match_provider
};
export type Provider = {
  id: string;
  name: string;
  specialty: string;
  city?: string;
  rating: number;
  score?: number;  // uit match_provider
};
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      provider: {
        Row: {
          id: string
          created_at?: string
          name: string | null
          specialty: string | null
          city: string | null
          rating: number | null
          description: string | null
          modality_default: string | null
          embedding: unknown | null
        }
        Insert: {
          id?: string
          created_at?: string
          name?: string | null
          specialty?: string | null
          city?: string | null
          rating?: number | null
          description?: string | null
          modality_default?: string | null
          embedding?: unknown | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string | null
          specialty?: string | null
          city?: string | null
          rating?: number | null
          description?: string | null
          modality_default?: string | null
          embedding?: unknown | null
        }
      }
      slot: {
        Row: {
          id: string
          created_at?: string
          provider_id: string | null
          start_at: string | null
          end_at: string | null
          price_eur: number | null
          is_booked: boolean | null
          modality: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          provider_id?: string | null
          start_at?: string | null
          end_at?: string | null
          price_eur?: number | null
          is_booked?: boolean | null
          modality?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          provider_id?: string | null
          start_at?: string | null
          end_at?: string | null
          price_eur?: number | null
          is_booked?: boolean | null
          modality?: string | null
        }
      }
      booking: {
        Row: {
          id: string
          created_at?: string
          slot_id: string | null
          customer_name: string | null
          customer_email: string | null
          status: string | null
          intake_json: Json | null
          pdf_url: string | null
          payment_intent_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          slot_id?: string | null
          customer_name?: string | null
          customer_email?: string | null
          status?: string | null
          intake_json?: Json | null
          pdf_url?: string | null
          payment_intent_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          slot_id?: string | null
          customer_name?: string | null
          customer_email?: string | null
          status?: string | null
          intake_json?: Json | null
          pdf_url?: string | null
          payment_intent_id?: string | null
        }
      }
    }
  }
}
// src/types/supabase.ts

export type Database = {
  public: {
    Tables: {
      provider: {
        Row: {
          id: string;
          name: string;
          specialty: string;
          city: string | null;
          rating: number;
          // ... voeg andere kolommen toe
        };
        Insert: {};  // later invullen als je row inserts typed wilt hebben
        Update: {};  // idem voor updates
      };
    };
  };
};// Als dit bestand leeg is, zet er minimaal dit in:
export type Database = unknown;
// -óf- plak hier de uit Supabase-Codegen verkregen types
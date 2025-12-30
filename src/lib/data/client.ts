// Abstract data client interface for easy backend switching
export interface DataClient {
  fetchSettings(key: string): Promise<any>;
  fetchResearchAreas(): Promise<any[]>;
  fetchCertifications(): Promise<any[]>;
}

// Supabase implementation
import { createClient, SupabaseClient } from '@supabase/supabase-js';

class SupabaseDataClient implements DataClient {
  private client: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase environment variables');
    }

    this.client = createClient(supabaseUrl, supabaseAnonKey);
  }

  async fetchSettings(key: string): Promise<any> {
    const { data, error } = await this.client
      .from('site_settings')
      .select('value')
      .eq('key', key)
      .single();

    if (error) {
      console.error(`Error fetching setting ${key}:`, error);
      return null;
    }
    return data?.value;
  }

  async fetchResearchAreas(): Promise<any[]> {
    const { data, error } = await this.client
      .from('research_areas')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching research areas:', error);
      return [];
    }
    return data || [];
  }

  async fetchCertifications(): Promise<any[]> {
    const { data, error } = await this.client
      .from('certifications')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching certifications:', error);
      return [];
    }
    return data || [];
  }

  // Direct access to Supabase client for custom queries
  get supabase() {
    return this.client;
  }
}

// Export singleton instance
export const dataClient: DataClient = new SupabaseDataClient();

// Also export the Supabase client directly for backwards compatibility
export const supabase = (dataClient as SupabaseDataClient).supabase;

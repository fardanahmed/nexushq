// Abstract data client interface for easy backend switching
export interface DataClient {
  fetchSettings(key: string): Promise<any>;
  fetchResearchAreas(): Promise<any[]>;
  fetchCertifications(): Promise<any[]>;
}

// Neon serverless implementation
import { neon } from '@neondatabase/serverless';

class NeonDataClient implements DataClient {
  private sql: ReturnType<typeof neon>;

  constructor() {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
      throw new Error('Missing DATABASE_URL environment variable');
    }

    this.sql = neon(databaseUrl);
  }

  async fetchSettings(key: string): Promise<any> {
    try {
      const result = await this.sql`
        SELECT value FROM site_settings WHERE key = ${key}
      ` as any[];
      
      return result[0]?.value || null;
    } catch (error) {
      console.error(`Error fetching setting ${key}:`, error);
      return null;
    }
  }

  async fetchResearchAreas(): Promise<any[]> {
    try {
      const result = await this.sql`
        SELECT * FROM research_areas ORDER BY created_at ASC
      ` as any[];
      
      return result || [];
    } catch (error) {
      console.error('Error fetching research areas:', error);
      return [];
    }
  }

  async fetchCertifications(): Promise<any[]> {
    try {
      const result = await this.sql`
        SELECT * FROM certifications ORDER BY created_at ASC
      ` as any[];
      
      return result || [];
    } catch (error) {
      console.error('Error fetching certifications:', error);
      return [];
    }
  }

  // Direct access to Neon SQL client for custom queries
  get neonSql() {
    return this.sql;
  }
}

// Export singleton instance
export const dataClient: DataClient = new NeonDataClient();

// Also export the Neon SQL client directly for custom queries
export const neonSql = (dataClient as NeonDataClient).neonSql;

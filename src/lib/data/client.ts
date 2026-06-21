// Abstract data client interface for easy backend switching
import type { ResearchArea, Certification } from '@/types';

export interface DataClient {
  fetchSettings<T = unknown>(key: string): Promise<T | null>;
  fetchResearchAreas(): Promise<ResearchArea[]>;
  fetchCertifications(): Promise<Certification[]>;
}

// Neon serverless implementation
import { neon } from '@neondatabase/serverless';

class NeonDataClient implements DataClient {
  private _sql?: ReturnType<typeof neon>;

  private get sql(): ReturnType<typeof neon> {
    if (!this._sql) {
      const databaseUrl = import.meta.env.DATABASE_URL || process.env.DATABASE_URL;

      if (!databaseUrl) {
        throw new Error('Missing DATABASE_URL environment variable');
      }

      this._sql = neon(databaseUrl);
    }
    return this._sql;
  }

  async fetchSettings<T = unknown>(key: string): Promise<T | null> {
    try {
      const result = await this.sql`
        SELECT value FROM site_settings WHERE key = ${key}
      `;

      const rows = result as { value: T }[];
      return rows[0]?.value ?? null;
    } catch (error) {
      console.error(`Error fetching setting ${key}:`, error);
      return null;
    }
  }

  async fetchResearchAreas(): Promise<ResearchArea[]> {
    try {
      const result = await this.sql`
        SELECT * FROM research_areas ORDER BY created_at ASC
      `;

      return (result as unknown as ResearchArea[]) || [];
    } catch (error) {
      console.error('Error fetching research areas:', error);
      return [];
    }
  }

  async fetchCertifications(): Promise<Certification[]> {
    try {
      const result = await this.sql`
        SELECT * FROM certifications ORDER BY created_at ASC
      `;

      return (result as unknown as Certification[]) || [];
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

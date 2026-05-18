/** Google Sheets — jolie_products */
export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  composition: string;
  usage_method: string;
  capacity: string;
  image_url: string;
  active: boolean;
}

/** Google Sheets — jolie_settings */
export interface SiteSettings {
  site_enabled: boolean;
  maintenance_mode: boolean;
  maintenance_text: string;
  hero_title: string;
  hero_subtitle: string;
  intro_video: string;
}

/** Google Sheets — jolie_verification */
export interface VerificationRecord {
  serial: string;
  status: string;
  product_name: string;
  notes: string;
}

export interface ProductsApiResponse {
  site: string;
  products: Product[];
  degraded?: boolean;
  error?: string;
}

export interface SettingsApiResponse {
  site: string;
  settings: SiteSettings;
  degraded?: boolean;
  error?: string;
}

export interface VerificationCheckResponse {
  ok: boolean;
  serial: string;
  status?: string;
  product_name?: string;
  notes?: string;
  degraded?: boolean;
  error?: string;
}

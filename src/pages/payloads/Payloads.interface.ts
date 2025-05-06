export interface IOrbitParams {
    reference_system: string;
    regime: string;
    longitude: number | null;
    semi_major_axis_km: number | null;
    eccentricity: number | null;
    periapsis_km: number | null;
    apoapsis_km: number | null;
    inclination_deg: number | null;
    period_min: number | null;
    lifespan_years: number | null;
  }
  
  export interface IPayload {
    payload_id: string;
    norad_id: number[]; 
    reused: boolean;
    customers: string[];
    nationality: string;
    manufacturer: string;
    payload_type: string;
    payload_mass_kg: number | null;
    payload_mass_lbs: number | null;
    orbit: string;
    orbit_params: IOrbitParams;
  }
  
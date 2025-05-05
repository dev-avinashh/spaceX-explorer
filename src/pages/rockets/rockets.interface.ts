export interface IRocket {
  id: number;
  active: boolean;
  stages: number;
  boosters: number;
  cost_per_launch: number;
  success_rate_pct: number;
  first_flight: string;
  country: string;
  company: string;
  height: Dimension;
  diameter: Dimension;
  mass: Mass;
  payload_weights: PayloadWeight[];
  first_stage: FirstStage;
  second_stage: SecondStage;
  engines: Engines;
  landing_legs: LandingLegs;
  flickr_images: string[];
  wikipedia: string;
  description: string;
  rocket_id: string;
  rocket_name: string;
  rocket_type: string;
}

interface Dimension {
  meters: number;
  feet: number;
}

interface Mass {
  kg: number;
  lb: number;
}

interface PayloadWeight {
  id: string;
  name: string;
  kg: number;
  lb: number;
}

interface FirstStage {
  reusable: boolean;
  engines: number;
  fuel_amount_tons: number;
  burn_time_sec: number;
  thrust_sea_level: Thrust;
  thrust_vacuum: Thrust;
}

interface SecondStage {
  reusable: boolean;
  engines: number;
  fuel_amount_tons: number;
  burn_time_sec: number;
  thrust: Thrust;
  payloads: Payloads;
}

interface Payloads {
  option_1: string;
  composite_fairing: {
    height: Dimension;
    diameter: Dimension;
  };
}

interface Engines {
  number: number;
  type: string;
  version: string;
  layout: string;
  isp: {
    sea_level: number;
    vacuum: number;
  };
  engine_loss_max: number;
  propellant_1: string;
  propellant_2: string;
  thrust_sea_level: Thrust;
  thrust_vacuum: Thrust;
  thrust_to_weight: number;
}

interface Thrust {
  kN: number;
  lbf: number;
}

interface LandingLegs {
  number: number;
  material: string | null;
}

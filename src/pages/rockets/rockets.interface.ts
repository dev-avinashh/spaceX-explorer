export interface IRockets {
  id: number;
  active: boolean;
  stages: number;
  boosters: number;
  cost_per_launch: number;
  success_rate_pct: number;
  first_flight: string;
  country: string;
  company: string;
  height: IDimension;
  diameter: IDimension;
  mass: IMass;
  payload_weights: IPayloadWeight[];
  first_stage: IFirstStage;
  second_stage: ISecondStage;
  engines: IEngines;
  landing_legs: ILandingLegs;
  wikipedia: string;
  description: string;
  rocket_id: string;
  rocket_name: string;
  rocket_type: string;
}

export interface IDimension {
  meters: number;
  feet: number;
}

export interface IMass {
  kg: number;
  lb: number;
}

export interface IPayloadWeight {
  id: string;
  name: string;
  kg: number;
  lb: number;
}

export interface IFirstStage {
  reusable: boolean;
  engines: number;
  fuel_amount_tons: number;
  burn_time_sec: number;
  thrust_sea_level: IThrust;
  thrust_vacuum: IThrust;
}

export interface ISecondStage {
  engines: number;
  fuel_amount_tons: number;
  burn_time_sec: number;
  thrust: IThrust;
  payloads: {
    option_1: string;
    composite_fairing: {
      height: IDimension;
      diameter: IDimension;
    };
  };
}

export interface IEngines {
  number: number;
  type: string;
  version: string;
  layout: string;
  engine_loss_max: number;
  propellant_1: string;
  propellant_2: string;
  thrust_sea_level: IThrust;
  thrust_vacuum: IThrust;
  thrust_to_weight: number;
}

export interface IThrust {
  kN: number;
  lbf: number;
}

export interface ILandingLegs {
  number: number;
  material: string | null;
}

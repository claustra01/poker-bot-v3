import settings from '../../application-settings.json';

export class Config {
  commandPrefix: string;
  permittedRole: string;
  initialRate: number;
  baseWeightedCoefficient: number;
  stackWeightedCoefficient: number;
  rateIgnoreingGameCount: number;

  constructor() {
    this.commandPrefix = './';
    this.permittedRole = 'admin';
    this.initialRate = 1500;
    this.baseWeightedCoefficient = 4;
    this.stackWeightedCoefficient = 1.5;
    this.rateIgnoreingGameCount = 3;
  }

  load(): void {
    this.commandPrefix = settings.commandPrefix;
    this.permittedRole = settings.permittedRole;
    this.initialRate = settings.initialRate;
    this.baseWeightedCoefficient = settings.baseWeightedCoefficient;
    this.stackWeightedCoefficient = settings.stackWeightedCoefficient;
    this.rateIgnoreingGameCount = settings.rateIgnoreingGameCount;
    console.log('Config Loaded Successfully');
  }
}

export const config = new Config();

import settings from '../../application-settings.json';

export class Config {
  commandPrefix: string;
  permittedRole: string;
  initialRate: number;
  BaseWeightedCoefficient: number;
  StackWeightedCoefficient: number;
  rateIgnoreingGameCount: number;

  constructor() {
    this.commandPrefix = './';
    this.permittedRole = 'admin';
    this.initialRate = 1500;
    this.BaseWeightedCoefficient = 4;
    this.StackWeightedCoefficient = 1.5;
    this.rateIgnoreingGameCount = 3;
  }

  load(): void {
    this.commandPrefix = settings.commandPrefix;
    this.permittedRole = settings.permittedRole;
    this.initialRate = settings.initialRate;
    this.BaseWeightedCoefficient = settings.BaseWeightedCoefficient;
    this.StackWeightedCoefficient = settings.StackWeightedCoefficient;
    this.rateIgnoreingGameCount = settings.rateIgnoreingGameCount;
    console.log('Config Loaded Successfully');
  }
}

export const config = new Config();

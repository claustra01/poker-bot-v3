import settings from '../../application-settings.json';

export class Config {
  commandPrefix: string;
  initialRate: number;
  weightedCoefficient: number;
  calculatingGameCount: number;

  constructor() {
    this.commandPrefix = './';
    this.initialRate = 1500;
    this.weightedCoefficient = 4;
    this.calculatingGameCount = 3;
  }

  load(): void {
    this.commandPrefix = settings.commandPrefix;
    this.initialRate = settings.initialRate;
    this.weightedCoefficient = settings.weightedCoefficient;
    this.calculatingGameCount = settings.calculatingGameCount;
    console.log('Config Loaded Successfully');
  }
}

export const config = new Config();
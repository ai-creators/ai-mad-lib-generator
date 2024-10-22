export type TemperatureEssentialProperties = Readonly<
  Required<{
    temperature: number;
  }>
>;

export type TemperatureProperties = TemperatureEssentialProperties;

export interface Temperature {
  getTemperature(): number;
  setTemperature(temp: number): void;
}

export class TemperatureImplementation implements Temperature {
  private temperature: number;

  constructor(properties: TemperatureProperties) {
    this.setTemperature(properties.temperature);
  }

  getTemperature(): number {
    return this.temperature;
  }

  setTemperature(temp: number) {
    if (temp < 0 || temp > 1) {
      throw new Error('Temperature must beteween the values of 0 and 1');
    }

    this.temperature = temp;
  }
}

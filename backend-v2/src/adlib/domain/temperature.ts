export type TemperatureEssentialProperties = Readonly<
  Required<{
    temperature: number;
  }>
>;

export type TemperatureProperties = TemperatureEssentialProperties;

export interface Temperature {
  toNumber(): number;
  set(temp: number): void;
}

export class TemperatureImplementation implements Temperature {
  private temperature: number;

  constructor(properties: TemperatureProperties) {
    this.set(properties.temperature);
  }

  toNumber(): number {
    return this.temperature;
  }

  set(temp: number) {
    if (temp < 0 || temp > 1) {
      throw new Error('Temperature must beteween the values of 0 and 1');
    }

    this.temperature = temp;
  }
}

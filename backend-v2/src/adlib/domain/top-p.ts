export type TopPEssentialProperties = Readonly<
  Required<{
    topP: number;
  }>
>;

export type TopPProperties = TopPEssentialProperties;

export interface TopP {
  toNumber(): number;
  set(topP: number): void;
}

export class TopPImplementation implements TopP {
  private topP: number;

  constructor(properties: TopPProperties) {
    this.set(properties.topP);
  }

  toNumber(): number {
    return this.topP;
  }

  set(topP: number) {
    if (topP < 0 || topP > 1) {
      throw new Error('topP must beteween the values of 0 and 1');
    }

    this.topP = topP;
  }
}

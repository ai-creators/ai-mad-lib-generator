import { AdlibValidator } from './adlib-validator';

describe('Adlib Validation', () => {
  let validator: AdlibValidator;

  beforeEach(() => {
    validator = new AdlibValidator();
  });

  it('should be defined', () => {
    expect(new AdlibValidator()).toBeDefined();
  });

  it('should validate a correct adlib with more than four inputs and complete sentences', () => {
    const adlibText =
      'The [adjective] fox jumps over the [noun], then [verb] under a [adjective_2] tree.';
    expect(validator.isValidAdlib(adlibText)).toBe(true);
  });

  it('should return false for adlibs with no mad lib inputs', () => {
    const adlibText = 'The fox jumps over the lazy dog.';
    expect(validator.isValidAdlib(adlibText)).toBe(false);
  });

  it('should return false for adlibs with fewer than four mad lib inputs', () => {
    const adlibText = 'The [adjective] fox jumps over a log.';
    expect(validator.isValidAdlib(adlibText)).toBe(false);
  });

  it('should return false for adlibs that contain inputs with spaces instead of underscores', () => {
    const adlibText =
      'The [adjective two] fox jumps over the [compound noun], then [verb] under a [adjective two] tree.';
    expect(validator.isValidAdlib(adlibText)).toBe(false);
  });
});

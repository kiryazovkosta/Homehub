import { FinanceTypePipe } from './finance-type-pipe';

describe('FinanceTypePipe', () => {
  let pipe: FinanceTypePipe;

  beforeEach(() => {
    pipe = new FinanceTypePipe();
  });

  it('should return "Приход" for value 1', () => {
    expect(pipe.transform(1)).toBe('Приход');
  });

  it('should return "Разход" for value 0', () => {
    expect(pipe.transform(0)).toBe('Разход');
  });

  it('should return "Разход" for any value other than 1', () => {
    expect(pipe.transform(-1)).toBe('Разход');
    expect(pipe.transform(2)).toBe('Разход');
  });
});
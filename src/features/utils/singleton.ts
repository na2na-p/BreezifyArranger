type Getter<T> = () => T;
type Factory<T> = () => T;

export const singleton = <T>(factory: Factory<T>): Getter<T> =>
  ((): Getter<T> => {
    let memo: T | null = null;

    return () => (memo ? memo : (memo = factory()));
  })();

export default singleton;

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it('not identical', () => {
    const factory = () => ({});

    const x = factory();
    const y = factory();

    expect(x).not.toBe(y);
  });
  it('with singleton, identical', () => {
    const factory = () => ({});
    const getter = singleton(factory);

    const x = getter();
    const y = getter();

    expect(x).toBe(y);
  });
}

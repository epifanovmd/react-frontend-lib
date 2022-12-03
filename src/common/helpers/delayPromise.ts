/**
 * @param millis
 * @param value
 */
export const delayPromise = <T>(millis: number, value?: T): Promise<T> =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(value as any);
    }, millis);
  });

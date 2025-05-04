export const createAbortSignalFactory = () => {
  const abortControllers: Partial<Record<string, AbortController>> = {};

  const getAbortSignal = (key: string) => {
    abortControllers[key]?.abort();
    abortControllers[key] = new AbortController();

    return abortControllers[key]?.signal;
  };

  return getAbortSignal;
};

/* eslint-disable @typescript-eslint/naming-convention */
import { enableMapSet } from "immer";
import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/react/shallow";
import { StateCreator } from "zustand/vanilla";

import { IS_DEV } from "./const/env";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TAnyObject = Record<string, any>;

type TMods = [["zustand/immer", never]];

enableMapSet();

export const createStore = <
  INITIAL_STATE extends TAnyObject,
  ADDITIONAL_STATE extends TAnyObject,
>(
  initialState: INITIAL_STATE,
  additionalStateCreator: StateCreator<
    INITIAL_STATE,
    TMods,
    TMods,
    ADDITIONAL_STATE
  >,
  storeName?: string,
) => {
  const storeCreator = immer(combine(initialState, additionalStateCreator));

  if (IS_DEV) {
    return create(devtools(storeCreator, { name: storeName }));
  }

  return create(storeCreator);
};

export { useShallow };

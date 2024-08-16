import {
  getKey,
  keyLocalStorage,
  removeKey,
  setKey,
} from "@/utils/local_storage";
import { proxy, subscribe, useSnapshot } from "@umijs/max";

export const creationBranchState = proxy<TCreationBranch>(
  JSON.parse(getKey(keyLocalStorage.CREATION_BRANCH) as string) || {}
);

subscribe(creationBranchState, () => {
  setKey(keyLocalStorage.CREATION_BRANCH, JSON.stringify(creationBranchState));
});

export const useCreationBranch = () => {
  return useSnapshot(creationBranchState);
};

export const setCreationBranch = (state: TCreationBranch) => {
  Object.assign(creationBranchState, state);
};

export const clearCreationBranch = () => {
  removeKey(keyLocalStorage.CREATION_BRANCH);
};

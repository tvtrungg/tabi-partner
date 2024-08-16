import {
  getKey,
  keyLocalStorage,
  removeKey,
  setKey,
} from "@/utils/local_storage";
import { proxy, subscribe, useSnapshot } from "@umijs/max";

export const creationHostState = proxy<TSignUpHSTRequest>(
  JSON.parse(getKey(keyLocalStorage.CREATION_HOST) as string) || {}
);

subscribe(creationHostState, () => {
  setKey(keyLocalStorage.CREATION_HOST, JSON.stringify(creationHostState));
});

export const useCreationHost = () => {
  return useSnapshot(creationHostState);
};

export const setCreationHost = (state: TSignUpHSTRequest) => {
  Object.assign(creationHostState, state);
};

export const clearCreationHost = () => {
  removeKey(keyLocalStorage.CREATION_HOST);
};

import {
  getKey,
  keyLocalStorage,
  removeKey,
  setKey,
} from "@/utils/local_storage";
import { proxy, subscribe, useSnapshot, ref } from "@umijs/max";

export let creationRoomState = proxy<TCreationRoom>(
  JSON.parse(getKey(keyLocalStorage.CREATION_ROOM) as string) || {
    reservation_reduction: ref([]),
  }
);

export type TCreationRoomSnapshot = {
  readonly [K in keyof TCreationRoom]: TCreationRoom[K] extends Array<
    infer U extends object
  >
    ? ReadonlyArray<{
        readonly [K in keyof U]: U[K];
      }>
    : TCreationRoom[K];
};

subscribe(creationRoomState, () => {
  setKey(keyLocalStorage.CREATION_ROOM, JSON.stringify(creationRoomState));
});

export const useCreationRoom = (): TCreationRoomSnapshot => {
  return useSnapshot(creationRoomState);
};

export const setCreationRoom = (state: TCreationRoom) => {
  Object.assign(creationRoomState, state);
};

export const clearCreationRoom = () => {
  creationRoomState = proxy<TCreationRoom>({} as TCreationRoom);
  removeKey(keyLocalStorage.CREATION_ROOM);
};

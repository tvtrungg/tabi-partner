import { proxy, useSnapshot } from "@umijs/max";
import { useEffect } from "react";

const transparentBackgroundState = proxy({
  isTransparent: false,
});

export const useBackground = () => {
  return useSnapshot(transparentBackgroundState);
};

export const useTransparentBackground = () => {
  useEffect(() => {
    transparentBackgroundState.isTransparent = true;
    return () => {
      transparentBackgroundState.isTransparent = false;
    };
  }, []);
};

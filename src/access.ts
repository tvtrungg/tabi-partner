import { BRANCH_MANAGER, HOST, REPRESENTATIVE_ROLE } from "./constants/auth";

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function (initialState: TMeResponse | undefined) {
  const { role } = initialState ?? {};
  return {
    isRP: role === REPRESENTATIVE_ROLE,
    isBM: role === BRANCH_MANAGER,
    isHST: role === HOST,
  };
}

import { proxy, useSnapshot, subscribe } from "@umijs/max";
import {
  getKey,
  keyLocalStorage,
  removeKey,
  setKey,
} from "@/utils/local_storage";

const partnerInfo = proxy(
  JSON.parse(getKey(keyLocalStorage.PARTNER_INFO) as string) || {}
);

subscribe(partnerInfo, () => {
  setKey(keyLocalStorage.PARTNER_INFO, JSON.stringify(partnerInfo));
});

export const useGetPartnerInfo = () => {
  return useSnapshot(partnerInfo);
};

export const setPartnerAccountInfo = (account: TSignUpStep1Request) => {
  partnerInfo.username = account?.username || "";
  partnerInfo.full_name = account?.full_name || "";
  partnerInfo.paypal_support = account?.paypal_support || false;
  partnerInfo.email = account?.email || "";
  partnerInfo.phone = account?.phone || "";
  partnerInfo.password = account?.password || "";
  partnerInfo.reenterPassword = account?.reenterPassword || "";
};

export const setPartnerCompanyInfo = (company: TSignUpStep2Request) => {
  partnerInfo.company_name = company?.company_name || "";
  partnerInfo.short_name = company?.short_name || "";
  partnerInfo.description = company?.description || "";
  partnerInfo.tax_number = company?.tax_number || "";
  partnerInfo.website_url = company?.website_url || "";
};

export const setPartnerContractConfirmation = (isRead: boolean) => {
  partnerInfo.contractConfirmation = isRead;
};

export const clearPartnerInfo = () => {
  removeKey(keyLocalStorage.PARTNER_INFO);
};

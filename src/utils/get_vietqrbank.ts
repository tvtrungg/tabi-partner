export const getVietQRBank = (vietQRBanks: TVietQRBank[], bank_id: number) => {
  const bank = vietQRBanks.find((bank) => bank.id === bank_id);

  if (bank) {
    return {
      logo: bank.logo,
      shortName: bank.shortName,
    };
  }

  return null;
};

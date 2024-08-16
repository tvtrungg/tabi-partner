import "./BankCard.less";

type TBankCard = {
  shortBankName: string;
  branch: string;
  accountNumber: string;
  accountName: string;
  img: string;
};

function splitAccountNumber(accountNumber: string) {
  const chunks = accountNumber.match(/.{1,4}/g) || [];
  return chunks;
}

function BankCard({ branch, accountNumber, accountName, img }: TBankCard) {
  const accountNumberChunks = splitAccountNumber(accountNumber);

  return (
    <div className="relative flex flex-col w-[324px] h-[198px] rounded-xl overflow-hidden bank-bg text-gray-700 ">
      <div className="grow">
        <img
          src={img}
          alt="bank logo"
          className="max-w-[10rem] h-14 max-h-[3.5rem] object-cover"
        />
        <h1 className="text-center text-xl mt-9 mb-0 tracking-widest font-quantico">
          {accountNumberChunks.map((chunk: string, index: number) => (
            <span key={index}>{chunk} </span>
          ))}
        </h1>
      </div>
      <div className="flex flex-col px-5 pb-2">
        <span className="text-sm capitalize">{branch}</span>
        <h3 className="mb-0 text-base uppercase">{accountName}</h3>
      </div>
    </div>
  );
}

export default BankCard;

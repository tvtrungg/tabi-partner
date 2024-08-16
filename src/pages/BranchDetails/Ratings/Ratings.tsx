import { Button, Divider, Drawer, Empty, Rate } from "antd";
import { useState } from "react";
import LogoWithSlogan from "@/assets/logo/logo-with-slogan.png";
import { FormattedMessage } from "@umijs/max";

type RatingsProps = {
  data: TBranchDetails;
};

function Ratings({ data }: RatingsProps) {
  const [open, setOpen] = useState(false);
  const quantityDisplay = 5;
  return (
    <>
      <h1 className="text-lg mb-3 font-bold">
        <FormattedMessage id="pages.branch_details.ratings.title" />
      </h1>

      <div className="h-full overflow-x-scroll flex gap-5">
        {data.ratings.slice(0, quantityDisplay).map((rating) => (
          <div
            key={rating.id}
            className="flex-shrink-0 w-[400px] h-[90%] p-5 my-2 shadow-custom-2 rounded-2xl"
          >
            <h3 className="flex justify-between items-center">
              <span className="capitalize">{rating.username}</span>
              <span>{rating.created_at}</span>
            </h3>
            <Rate disabled defaultValue={rating.rating} />
            <p className="mt-5 text-justify leading-tight">{rating.comment}</p>
          </div>
        ))}
        {data.ratings.length > quantityDisplay && (
          <div className="flex-shrink-0 w-[400px] h-[90%] p-5 my-2 shadow-custom-2 rounded-2xl flex flex-col justify-center items-center">
            <img className="max-h-[110px]" src={LogoWithSlogan} alt="Logo" />
            <div className="text-center mt-8">
              <h2>
                <FormattedMessage id="pages.branch_details.ratings.read_more_title" />
              </h2>
              <Button type="primary" onClick={() => setOpen(true)}>
                <FormattedMessage id="pages.branch_details.see_more" />
              </Button>
            </div>
          </div>
        )}
        {data.ratings.length === 0 && (
          <div className="w-full h-full flex justify-center items-center">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <FormattedMessage id="pages.branch_details.ratings.no_data" />
              }
            />
          </div>
        )}
      </div>
      <Drawer
        placement="right"
        title={<FormattedMessage id="pages.branch_details.ratings.title" />}
        onClose={() => setOpen(false)}
        open={open}
        width={480}
      >
        {data.ratings.map((rating) => (
          <div key={rating.id} className="">
            <h3 className="flex justify-between items-center">
              <span className="capitalize">{rating.username}</span>
              <span>{rating.created_at}</span>
            </h3>
            <Rate disabled defaultValue={rating.rating} />
            <p className="mt-2 text-justify text-grey-darker">
              {rating.comment}
            </p>
            <Divider />
          </div>
        ))}
      </Drawer>
    </>
  );
}

export default Ratings;

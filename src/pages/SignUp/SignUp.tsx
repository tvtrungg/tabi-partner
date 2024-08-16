import { FormattedMessage, Outlet, useLocation, useNavigate } from "@umijs/max";
import "./SignUp.less";
import { Card, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";
import { BsBuildingsFill, BsFillHousesFill } from "react-icons/bs";
import { SIGN_UP, SIGN_UP_RP_STEP1 } from "@/constants/link";
const bgImage = require("@/assets/images/bg-landing.jpg");
const hotelsImg = require("@/assets/images/hotels.jpg");
const hotelImg = require("@/assets/images/hotel.png");

function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  if (pathname === SIGN_UP) {
    return (
      <div className="-translate-y-20">
        <div className="mb-5">
          <h2>
            <FormattedMessage id="signUp.select_manage_branch.title" />
          </h2>
          <p>
            <FormattedMessage id="signUp.select_manage_branch.subTitle" />
          </p>
        </div>
        <div className="flex items-center gap-6">
          <Card
            onClick={() => {
              navigate("/sign-up/hst");
            }}
            hoverable
            className="max-w-[350px] overflow-hidden"
            cover={
              <img src={hotelImg} alt="hotel" className="h-52 object-cover" />
            }
          >
            <div className="flex  gap-3">
              <BsBuildingsFill className="text-3xl text-primary-dominant-light" />
              <Meta
                className="custom-meta"
                title={
                  <FormattedMessage id="signUp.manage_single_branch.label" />
                }
                description={
                  <FormattedMessage id="signUp.manage_single_branch.description" />
                }
              />
            </div>
          </Card>
          <Card
            onClick={() => {
              navigate(SIGN_UP_RP_STEP1);
            }}
            hoverable
            className="max-w-[350px] overflow-hidden"
            cover={
              <img src={hotelsImg} alt="hotels" className="h-52 object-cover" />
            }
          >
            <div className="flex gap-3">
              <BsFillHousesFill className="text-3xl text-primary-dominant-light" />
              <Meta
                className="custom-meta"
                title={
                  <FormattedMessage id="signUp.manage_multi_branch.label" />
                }
                description={
                  <FormattedMessage id="signUp.manage_multi_branch.description" />
                }
              />
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <Row className="h-full">
      <Col span={8} className="flex justify-center items-center">
        <img src={bgImage} alt="bg-landing" className="w-full px-5" />
      </Col>
      <Col
        span={16}
        className="h-full w-full bg-white flex flex-col items-start justify-start pt-8 px-8"
      >
        <Outlet />
      </Col>
    </Row>
  );
}

export default SignUp;

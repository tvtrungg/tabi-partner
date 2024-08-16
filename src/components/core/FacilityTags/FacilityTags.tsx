import ViewMore from "@/components/common/ViewMore";
import { Col, Modal, Row, Tag } from "antd";
import { useState } from "react";
type TFacilityTagsProps = {
  data: TFacilityModel[];
  isVN: boolean;
  display_quantity: number;
};

function FacilityTags({ data, isVN, display_quantity }: TFacilityTagsProps) {
  const [showModal, setShowModal] = useState<boolean>(false);

  const renderFacilities = (facilities: TFacilityModel[], isVN: boolean) => {
    const dist: { [x: string]: string[] } = {};
    facilities.forEach((facility) => {
      const classFacility = isVN ? facility.class_vi : facility.class_en;
      if (!dist[classFacility]) {
        dist[classFacility] = [];
      }
      dist[classFacility].push(isVN ? facility.name_vi : facility.name_en);
    });
    return (
      <Row gutter={[16, 16]} justify="start" wrap>
        {Object.keys(dist).map((key) => {
          const faci = dist[key];
          return (
            <Col span={8} key={key}>
              <span className="font-semibold">{key}</span>
              <ul className="list-disc pl-3">
                {faci.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </Col>
          );
        })}
      </Row>
    );
  };
  const renderFacilityTags = (
    facilities: TFacilityModel[],
    isVN: boolean,
    quantity: number
  ) => {
    const tmp =
      facilities.length > quantity ? facilities.slice(0, quantity) : facilities;
    return tmp.map((facility) => {
      return (
        <Tag key={facility.id} color="#F5566C" className="p-1 text-xs">
          {isVN ? facility.name_vi : facility.name_en}
        </Tag>
      );
    });
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex flex-1 overflow-x-hidden items-center">
          {renderFacilityTags(data || [], isVN, display_quantity)}
        </div>
        {data && data.length > 5 && <ViewMore setShowModal={setShowModal} />}
      </div>
      <Modal
        open={showModal}
        okText=""
        closable={false}
        onCancel={() => setShowModal(false)}
        okButtonProps={{
          className: "hidden",
        }}
        cancelButtonProps={{
          className: "hidden",
        }}
        width={648}
      >
        {renderFacilities(data || [], isVN)}
      </Modal>
    </>
  );
}

export default FacilityTags;

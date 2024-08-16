import { Collapse } from "antd";
import "./CollapseInfo.less";

interface ICollapseInfo {
  isActive: boolean;
  children: React.ReactNode;
  className?: string;
}

const CollapseInfo = ({ isActive, children, className }: ICollapseInfo) => {
  return (
    <div className="collapse-info-wrapper">
      <Collapse
        className={`collapse-info ${className}`}
        bordered={false}
        expandIcon={() => undefined}
        activeKey={isActive ? 0 : 1}
        items={[
          {
            children,
          },
        ]}
      />
    </div>
  );
};

export default CollapseInfo;

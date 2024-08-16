import { Button, Typography } from "antd";
import { useEffect, useState } from "react";
import { setRoomFacilitiesAddState } from "@/hooks/useRoomFacilities";
import { TRTMDFacilityItem } from "@/services/roomType/typing";

interface IRoomTypeFacilitiesProps {
  dataRoomFacilities: TFacilityResponse[] | undefined;
  widgets: TRTMDFacilityItem[];
  setWidgets: React.Dispatch<React.SetStateAction<TRTMDFacilityItem[]>>;
}

const RoomTypeFacilities: React.FC<IRoomTypeFacilitiesProps> = ({
  dataRoomFacilities,
  widgets,
  setWidgets,
}) => {
  const [isDragLeave, setIsDragLeave] = useState(false);

  useEffect(() => {
    setRoomFacilitiesAddState(widgets.map((widget) => widget.id));
  }, [widgets]);

  function handleOnDrag(
    e: React.DragEvent,
    widgetType: string,
    widgetTypeID: string
  ) {
    e.dataTransfer.setData("widgetType", widgetType);
    e.dataTransfer.setData("widgetTypeID", widgetTypeID);
  }

  function handleOnDrop(e: React.DragEvent, className: string) {
    const widgetType = e.dataTransfer.getData("widgetType") as string;
    const widgetTypeID = e.dataTransfer.getData("widgetTypeID") as string;
    if (
      !widgets.some(
        (widget) =>
          widget.className === className &&
          widget.name === widgetType &&
          widget.id === Number(widgetTypeID)
      )
    ) {
      setWidgets([
        ...widgets,
        { className: className, name: widgetType, id: Number(widgetTypeID) },
      ]);
    }
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  function handleDragLeave() {
    setIsDragLeave(true);
  }

  function handleDragEnd(
    e: React.DragEvent,
    className: string,
    widgetType: string,
    widgetTypeID: string
  ) {
    if (isDragLeave) {
      if (
        widgets.some(
          (widget) =>
            widget.className === className &&
            widget.name === widgetType &&
            widget.id === Number(widgetTypeID)
        )
      ) {
        const updatedWidgets = widgets.filter(
          (widget) => widget.name !== widgetType
        );
        setWidgets(updatedWidgets);
      }
    }
    setIsDragLeave(false);
  }

  return (
    <div className="h-auto flex flex-col items-center justify-center gap-5 w-full">
      {dataRoomFacilities?.map((roomFacilities, index) => (
        <div
          className="w-full h-full flex flex-col items-start justify-center"
          key={index}
        >
          <Typography.Title level={5}>{roomFacilities.class}</Typography.Title>
          <div className="w-full flex flex-row items-center justify-start gap-5">
            <div className="w-[50%] h-[180px] rounded-lg flex items-center justify-center shadow-lg p-2">
              <div className="w-full min-h-[150px] max-h-[150px] overflow-y-scroll p-1">
                {roomFacilities.items.map((item) => (
                  <Button
                    key={item.id}
                    className="w-full h-[32px] mt-1 rounded-md"
                    draggable
                    onDragStart={(e) =>
                      handleOnDrag(e, item.name, String(item.id))
                    }
                  >
                    <Typography.Text ellipsis={true}>
                      {item.name}
                    </Typography.Text>
                  </Button>
                ))}
              </div>
            </div>
            <div
              className="w-[50%] h-[180px] rounded-lg flex items-center justify-center shadow-lg p-2 bg-neutral-200"
              onDrop={(e) => handleOnDrop(e, roomFacilities.class)}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <div className="w-full min-h-[150px] max-h-[150px] overflow-y-scroll p-1">
                {widgets.map(
                  (widget, index) =>
                    widget.className === roomFacilities.class && (
                      <Button
                        className="w-full h-[32px] mt-1 rounded-md"
                        key={index}
                        draggable
                        onDragStart={(e) =>
                          handleOnDrag(e, widget.name, String(widget.id))
                        }
                        onDragEnd={(e) =>
                          handleDragEnd(
                            e,
                            roomFacilities.class,
                            widget.name,
                            String(widget.id)
                          )
                        }
                      >
                        <Typography.Text ellipsis={true}>
                          {widget.name}
                        </Typography.Text>
                      </Button>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomTypeFacilities;

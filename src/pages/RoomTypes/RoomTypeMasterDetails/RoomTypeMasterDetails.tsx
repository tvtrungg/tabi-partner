import { useParams, getLocale } from "@umijs/max";
import { Button, Typography, message } from "antd";
import { useState } from "react";
import { useUpdateRoomTypeByID } from "@/services/roomType/services";
import { TRTMDFacilityItem } from "@/services/roomType/typing";
import { EN_LOCALE } from "@/constants/locale";

interface IRoomTypeMasterDetailsProps {
  dataRoomType: TRoomTypeBM;
  data: TFacilityModel[];
  dataRoomFacilities: TFacilityResponse[] | undefined;
  refetchRoomTypeOfBranch: () => void;
}

const RoomTypeMasterDetails: React.FC<IRoomTypeMasterDetailsProps> = ({
  dataRoomType,
  data,
  dataRoomFacilities,
  refetchRoomTypeOfBranch,
}) => {
  const { id } = useParams();
  const locale = getLocale();
  const roomTypeFacilities = data.map((item) => ({
    className: locale === EN_LOCALE ? item.class_en : item.class_vi,
    name: locale === EN_LOCALE ? item.name_en : item.name_vi,
    id: item.id,
  }));
  const [widgets, setWidgets] =
    useState<TRTMDFacilityItem[]>(roomTypeFacilities);
  const [isDragLeave, setIsDragLeave] = useState(false);

  const { mutate: mutateUpdateRoomTypeFacilities } = useUpdateRoomTypeByID();

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

  function handleSave() {
    mutateUpdateRoomTypeFacilities(
      {
        ...dataRoomType,
        branch_id: Number(id),
        room_facilities: widgets.map((widget) => widget.id),
      },
      {
        onSuccess: () => {
          refetchRoomTypeOfBranch();
          message.success("Room type facilities updated successfully");
        },
      }
    );
  }

  return (
    <div className="w-full h-auto flex flex-row flex-wrap items-center justify-start gap-5">
      {dataRoomFacilities?.map((roomFacilities, index) => (
        <div
          className="w-[500px] h-full flex flex-col items-start justify-start ms-16"
          key={index}
        >
          <Typography.Title level={5}>{roomFacilities.class}</Typography.Title>
          <div className="w-full flex flex-row items-center justify-start gap-5">
            <div className="w-[225px] h-[175px] flex items-center justify-center rounded-sm shadow-lg p-5">
              <div className="w-[200px] min-h-[150px] max-h-[150px] flex flex-col overflow-y-scroll p-1">
                {roomFacilities.items.map((item, idx) => (
                  <Button
                    key={idx}
                    className="w-full max-w-[170px] h-[32px] mt-0.5 rounded-sm"
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
              className="w-[225px] h-[175px] flex items-center justify-center rounded-sm shadow-lg p-5 bg-neutral-300"
              onDrop={(e) => handleOnDrop(e, roomFacilities.class)}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <div className="w-[200px] min-h-[150px] max-h-[150px] flex flex-col overflow-y-scroll p-1">
                {widgets.map(
                  (widget, idx) =>
                    widget.className === roomFacilities.class && (
                      <Button
                        className="w-full max-w-[170px] h-[32px] mt-0.5 rounded-sm"
                        key={idx}
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
      <div className="w-full flex items-center justify-end mt-3 me-14">
        <Button
          type="primary"
          size="middle"
          className="w-[75px]"
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default RoomTypeMasterDetails;

import Note from "@/components/common/Note";
import CollapseInfo from "@/components/core/CollapseInfo";
import { setCreationRoom, TCreationRoomSnapshot } from "@/hooks/useCreateRoom";
import { formatCurrency, removeComma } from "@/utils/common";
import { timeUnits } from "@/utils/timeUnits";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { FormattedMessage, useIntl } from "@umijs/max";
import {
  Button,
  Col,
  Divider,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
  Typography,
} from "antd";
import { Fragment, useEffect, useState } from "react";

interface IPricingStepProps {
  form: FormInstance<any>;
  snapshot?: TCreationRoomSnapshot;
  horizontal?: boolean;
}

const CollapseEstimatedValue = ({
  reductionValue,
  maxPrice,
  className,
}: {
  reductionValue?: number;
  maxPrice: number;
  className?: string;
}) => {
  return (
    <CollapseInfo isActive={typeof reductionValue === "number" && maxPrice > 0}>
      <div
        className={`p-1 flex justify-between items-center text-neutral-500 ${className}`}
      >
        <Typography.Paragraph
          ellipsis={{
            rows: 1,
            symbol: "...",
          }}
          className="text-neutral-600 w-[30%] ant-typo-mb-0"
        >
          <FormattedMessage id="pages.createRoom.form.estimatedPrice" />:
        </Typography.Paragraph>
        <span className="w-[69%]">
          {formatCurrency(
            String(
              reductionValue ? (1 - reductionValue / 100) * maxPrice : maxPrice
            )
          )}{" "}
          VND
        </span>
      </div>
    </CollapseInfo>
  );
};

function getPercentValue(value: number) {
  return value / 100;
}

function formula(maxPrice: number, reductions: number[]) {
  const reductionTotal = getPercentValue(reductions.reduce((a, b) => a + b, 0));
  return maxPrice - maxPrice * reductionTotal;
}

function renderListPrices(
  name: number,
  reductions: { [x: string]: any },
  maxPrice: number
) {
  const reductionHoliday = reductions["holiday"];
  const hasHoliday = typeof reductionHoliday === "number";

  const reductionNormalDay = reductions["normal_day"];
  const hasNormalDay = typeof reductionNormalDay === "number";

  const reductionWeekend = reductions["weekend"];
  const hasWeekend = typeof reductionWeekend === "number";

  const reduction = reductions[name + "reduction"] as number;

  const hasRoomPrices = hasHoliday || hasNormalDay || hasWeekend;

  if (!hasRoomPrices) return;

  const priceHoliday = formula(maxPrice, [reductionHoliday, reduction]);

  const priceNormalDay = formula(maxPrice, [reductionNormalDay, reduction]);

  const priceWeekend = formula(maxPrice, [reductionWeekend, reduction]);

  return (
    <div>
      <FormattedMessage id="pages.createRoom.form.estimatedRoomPriceIn" />:
      <ul className="list-disc">
        {hasHoliday && (
          <li>
            <FormattedMessage id="pages.createRoom.form.holiday" />:{" "}
            {formatCurrency(String(priceHoliday))} VND
          </li>
        )}
        {hasNormalDay && (
          <li>
            {" "}
            <FormattedMessage id="pages.createRoom.form.normalDay" />:{" "}
            {formatCurrency(String(priceNormalDay))} VND
          </li>
        )}
        {hasWeekend && (
          <li>
            {" "}
            <FormattedMessage id="pages.createRoom.form.weekend" />:{" "}
            {formatCurrency(String(priceWeekend))} VND
          </li>
        )}
      </ul>
    </div>
  );
}

function PricingStep({ form, snapshot, horizontal }: IPricingStepProps) {
  const intl = useIntl();
  const [maxPrice, setMaxPrice] = useState(0);
  const [reductions, setReductions] = useState<{ [x: string]: number | any }>(
    {}
  );

  useEffect(() => {
    if (snapshot) {
      if (snapshot.max_price) {
        setMaxPrice(Number(removeComma(snapshot.max_price)));
      }

      const tmpReductions: { [x: string]: number | any } = {};

      Object.keys(snapshot).forEach((key) => {
        if (
          [
            "online_method",
            "on_cash_method",
            "holiday",
            "normal_day",
            "weekend",
          ].includes(key)
        ) {
          tmpReductions[key] = Number(
            snapshot[key as keyof TCreationRoomSnapshot]
          );
        }

        if (key === "reservation_reduction") {
          for (let i = 0; i < snapshot.reservation_reduction.length; i++) {
            const item = snapshot.reservation_reduction[i];
            if (!item || item === null) {
              setCreationRoom({
                reservation_reduction:
                  [] as TCreationRoom["reservation_reduction"],
              } as TCreationRoom);
            }
            tmpReductions[i + "quantity"] = Number(item.quantity);
            tmpReductions[i + "time_unit"] = item.time_unit;
            tmpReductions[i + "reduction"] = Number(item.reduction);

            const label = timeUnits.find(
              (unit) => unit.value === item.time_unit
            )?.label;

            tmpReductions[i + "time_unit_label"] = label;
          }
        }
      });

      setReductions(tmpReductions);
    } else {
      if (form.getFieldValue("max_price")) {
        setMaxPrice(Number(removeComma(form.getFieldValue("max_price"))));
      }
      const tmpReductions: { [x: string]: number | any } = {};

      Object.keys(form.getFieldsValue()).forEach((key) => {
        if (
          [
            "online_method",
            "on_cash_method",
            "holiday",
            "normal_day",
            "weekend",
          ].includes(key)
        ) {
          tmpReductions[key] = Number(form.getFieldValue(key));
        }

        if (key === "reservation_reduction") {
          for (
            let i = 0;
            i < form.getFieldValue("reservation_reduction").length;
            i++
          ) {
            const item = form.getFieldValue("reservation_reduction")[i];
            tmpReductions[i + "quantity"] = Number(item.quantity);
            tmpReductions[i + "time_unit"] = item.time_unit;
            tmpReductions[i + "reduction"] = Number(item.reduction);

            const label = timeUnits.find(
              (unit) => unit.value === item.time_unit
            )?.label;
            tmpReductions[i + "time_unit_label"] = label;
          }
        }
      });

      setReductions(tmpReductions);
    }
  }, []);

  const onChangeValue = (key: string) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const newReductions = { ...reductions };
      newReductions[key] = Number(value);
      setReductions(newReductions);
    };
  };

  return (
    <Row
      justify="space-between"
      className={`flex ${horizontal ? "" : "flex-col"}`}
    >
      <div className="basis-[59%]">
        <Note>
          <FormattedMessage id="pages.createRoom.note.maxPrice" />{" "}
          <i className="text-neutral-800 font-medium">
            <FormattedMessage id="pages.createRoom.note.formula.maxPrice" />
          </i>{" "}
          x (
          <i className="text-neutral-800 font-medium">
            <FormattedMessage id="pages.createRoom.note.formula.reductionDay" />
          </i>{" "}
          +{" "}
          <i className="text-neutral-800 font-medium">
            <FormattedMessage id="pages.createRoom.note.formula.reductionReservation" />
          </i>
          ).
        </Note>
        <Note>
          <FormattedMessage id="pages.createRoom.note.multipleDay" />
        </Note>
        <Col>
          <Form.Item
            name="max_price"
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: "pages.createRoom.form.required",
                }),
              },
            ]}
            label={intl.formatMessage({
              id: "pages.createRoom.form.maxPriceLabel",
            })}
          >
            <Input
              min={1}
              placeholder="0.00"
              className="px-2 py-1"
              suffix="VND"
              onChange={(e) => {
                const value = removeComma(e.target.value);
                setMaxPrice(Number(value));
                form.setFieldsValue({
                  max_price: formatCurrency(value),
                });
              }}
            />
          </Form.Item>
        </Col>
        <Divider orientation="left">
          {" "}
          <FormattedMessage id="pages.createRoom.divider.reductionPaymentMethod" />
        </Divider>
        <Note>
          <FormattedMessage id="pages.createRoom.note.paymentMethod" />
        </Note>
        {!horizontal ? (
          <>
            <Col>
              <Form.Item
                name="online_method"
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      id: "pages.createRoom.form.required",
                    }),
                  },
                ]}
                label={intl.formatMessage({
                  id: "pages.createRoom.form.onlineLabel",
                })}
              >
                <Input
                  min={0}
                  placeholder="0.0"
                  className="px-2 py-1"
                  suffix="%"
                  type="number"
                  onChange={onChangeValue("online_method")}
                />
              </Form.Item>
              <CollapseEstimatedValue
                maxPrice={maxPrice}
                reductionValue={reductions["online_method"]}
              />
            </Col>
            <Col>
              <Form.Item
                name="on_cash_method"
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      id: "pages.createRoom.form.required",
                    }),
                  },
                ]}
                label={intl.formatMessage({
                  id: "pages.createRoom.form.onCashLabel",
                })}
              >
                <Input
                  min={0}
                  placeholder="0.0"
                  className="px-2 py-1"
                  suffix="%"
                  type="number"
                  onChange={onChangeValue("on_cash_method")}
                />
              </Form.Item>
              <CollapseEstimatedValue
                maxPrice={maxPrice}
                reductionValue={reductions["on_cash_method"]}
              />
            </Col>
          </>
        ) : (
          <>
            <Row gutter={[24, 0]}>
              <Col span={13}>
                <Form.Item
                  name="online_method"
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({
                        id: "pages.createRoom.form.required",
                      }),
                    },
                  ]}
                  label={intl.formatMessage({
                    id: "pages.createRoom.form.onlineLabel",
                  })}
                >
                  <Input
                    min={0}
                    placeholder="0.0"
                    className="px-2 py-1"
                    suffix="%"
                    type="number"
                    onChange={onChangeValue("online_method")}
                  />
                </Form.Item>
              </Col>
              <Col span={11}>
                <CollapseEstimatedValue
                  maxPrice={maxPrice}
                  reductionValue={reductions["online_method"]}
                />
              </Col>
            </Row>
            <Row gutter={[24, 0]}>
              <Col span={13}>
                <Form.Item
                  name="on_cash_method"
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({
                        id: "pages.createRoom.form.required",
                      }),
                    },
                  ]}
                  label={intl.formatMessage({
                    id: "pages.createRoom.form.onCashLabel",
                  })}
                >
                  <Input
                    min={0}
                    placeholder="0.0"
                    className="px-2 py-1"
                    suffix="%"
                    type="number"
                    onChange={onChangeValue("on_cash_method")}
                  />
                </Form.Item>
              </Col>
              <Col span={11}>
                <CollapseEstimatedValue
                  maxPrice={maxPrice}
                  reductionValue={reductions["on_cash_method"]}
                />
              </Col>
            </Row>
          </>
        )}

        <Divider orientation="left">
          <FormattedMessage id="pages.createRoom.divider.reductionForDateType" />
        </Divider>
        <Note>
          <FormattedMessage id="pages.createRoom.note.dateType" />
        </Note>
        {["holiday", "normal_day", "weekend"].map((type, index) => (
          <Fragment key={index}>
            {!horizontal ? (
              <Col>
                <Form.Item
                  name={type}
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({
                        id: "pages.createRoom.form.required",
                      }),
                    },
                  ]}
                  label={intl.formatMessage({
                    id: `pages.createRoom.form.${
                      type === "normal_day" ? "normalDay" : type
                    }`,
                  })}
                >
                  <Input
                    min={0}
                    placeholder="0.0"
                    className="px-2 py-1"
                    suffix="%"
                    type="number"
                    onChange={onChangeValue(type)}
                  />
                </Form.Item>
                <CollapseEstimatedValue
                  maxPrice={maxPrice}
                  reductionValue={reductions[type]}
                  className="mb-2"
                />
              </Col>
            ) : (
              <Row gutter={[24, 0]}>
                <Col span={13}>
                  <Form.Item
                    name={type}
                    rules={[
                      {
                        required: true,
                        message: intl.formatMessage({
                          id: "pages.createRoom.form.required",
                        }),
                      },
                    ]}
                    label={intl.formatMessage({
                      id: `pages.createRoom.form.${
                        type === "normal_day" ? "normalDay" : type
                      }`,
                    })}
                  >
                    <Input
                      min={0}
                      placeholder="0.0"
                      className="px-2 py-1"
                      suffix="%"
                      type="number"
                      onChange={onChangeValue(type)}
                    />
                  </Form.Item>
                </Col>
                <Col span={11}>
                  <CollapseEstimatedValue
                    maxPrice={maxPrice}
                    reductionValue={reductions[type]}
                    className="mb-2"
                  />
                </Col>
              </Row>
            )}
          </Fragment>
        ))}
      </div>
      <div className="basis-[39%] overflow-y-auto overflow-x-hidden max-h-[584px]">
        <Divider orientation="left">
          <FormattedMessage id="pages.createRoom.divider.reductionForReservationTime" />
        </Divider>
        <Note>
          <FormattedMessage id="pages.createRoom.note.bookingTime" />
        </Note>
        <Row gutter={16} justify="start" className="w-full mb-2">
          <Col span={7} className="flex justify-center font-medium">
            <FormattedMessage id="pages.createRoom.form.quantity" />
          </Col>
          <Col span={7} className="flex justify-center font-medium">
            <FormattedMessage id="pages.createRoom.form.timeUnit" />
          </Col>
          <Col span={7} className="flex justify-center font-medium">
            <FormattedMessage id="pages.createRoom.form.reduction" />
          </Col>
          <Col span={3} />
        </Row>
        <Form.List
          name="reservation_reduction"
          rules={[
            {
              validator: async (_, items) => {
                if (!items || items.length < 1) {
                  return Promise.reject(
                    new Error(
                      intl.formatMessage({
                        id: "pages.createRoom.form.atLeast1Item",
                      })
                    )
                  );
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <Row className="flex flex-col w-full">
              {fields.map(({ key, name, ...restField }) => {
                const quantity = reductions[key + "quantity"];
                const timeUnit = reductions[key + "time_unit"] as string;
                const timeUnitLabel = reductions[key + "time_unit_label"];
                const reduction = reductions[key + "reduction"] as number;
                const hasExample = quantity && timeUnit && reduction;
                return (
                  <div key={key}>
                    <Row gutter={16}>
                      <Col span={7}>
                        <Form.Item
                          {...restField}
                          name={[name, "quantity"]}
                          rules={[
                            {
                              required: true,
                              message: intl.formatMessage({
                                id: "pages.createRoom.form.required",
                              }),
                            },
                          ]}
                        >
                          <Input
                            placeholder="1,2,3,..."
                            className="px-2 py-1 h-8"
                            type="number"
                            min={1}
                            onChange={onChangeValue(key + "quantity")}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={7}>
                        <Form.Item
                          {...restField}
                          name={[name, "time_unit"]}
                          rules={[
                            {
                              required: true,
                              message: intl.formatMessage({
                                id: "pages.createRoom.form.required",
                              }),
                            },
                          ]}
                        >
                          <Select
                            placeholder={intl.formatMessage({
                              id: "pages.createRoom.form.selectTimeUnit",
                            })}
                            options={timeUnits}
                            onChange={(value) => {
                              const label = timeUnits.find(
                                (unit) => unit.value === value
                              )?.label;

                              const newReductions = { ...reductions };
                              newReductions[key + "time_unit"] = value;
                              newReductions[key + "time_unit_label"] = label;
                              setReductions(newReductions);
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={7}>
                        <Form.Item
                          {...restField}
                          name={[name, "reduction"]}
                          rules={[
                            {
                              required: true,
                              message: intl.formatMessage({
                                id: "pages.createRoom.form.required",
                              }),
                            },
                          ]}
                        >
                          <Input
                            placeholder="1%, 2%, ..."
                            className="px-2 py-1 h-8"
                            suffix="%"
                            type="number"
                            min={1}
                            onChange={onChangeValue(key + "reduction")}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={3} className="flex justify-center items-start">
                        <MinusCircleOutlined
                          onClick={() => {
                            remove(name);
                            delete reductions[key + "quantity"];
                            delete reductions[key + "time_unit"];
                            delete reductions[key + "reduction"];
                          }}
                          className="text-xl h-8 text-primary-dominant-dark"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <CollapseInfo
                          isActive={hasExample && maxPrice}
                          className="mb-2"
                        >
                          <div className="px-2 py-1 text-neutral-600 text-[13px] flex flex-col items-start justify-start">
                            <span>
                              <FormattedMessage id="pages.createRoom.note.ifUserBook" />{" "}
                              {quantity} {timeUnitLabel}
                              <FormattedMessage id="pages.createRoom.note.inAdvance" />{" "}
                              <FormattedMessage id="pages.createRoom.note.beReduced" />{" "}
                              {reduction}%.
                            </span>
                            {renderListPrices(key, reductions, maxPrice)}
                          </div>
                        </CollapseInfo>
                      </Col>
                    </Row>
                  </div>
                );
              })}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                  danger={errors.length > 0}
                >
                  {intl.formatMessage({
                    id: "pages.createRoom.form.addFieldBtn",
                  })}
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </Row>
          )}
        </Form.List>
      </div>
    </Row>
  );
}

export default PricingStep;

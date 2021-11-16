import React, { FC, useState } from "react";
import { InputNumber, Slider, Typography, Button, Space } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { filtering, filterState, resetFilter } from "./filterSlice";

const Filter: FC = () => {
  const { rangeRoom, minPrice, maxPrice } = useAppSelector(filterState);
  
  const dispatch = useAppDispatch();

  const [inputRangeRoom, setCountRoom] = useState<[number, number]>(rangeRoom);
  const [inputMinPrice, setInputMinPrice] = useState<number>(minPrice);
  const [inputMaxPrice, setInputMaxPrice] = useState<number>(maxPrice);

  const { Title } = Typography;

  const handleActive = () => {
    dispatch(
      filtering({
        filterOn: true,
        rangeRoom: inputRangeRoom,
        minPrice: inputMinPrice,
        maxPrice: inputMaxPrice,
      })
    );
  };

  const handleReset = () => {
    dispatch(resetFilter());
    setCountRoom([1, 5]);
    setInputMinPrice(0);
    setInputMaxPrice(0);
  };

  return (
    <div style={{ width: "100%" }}>
      <Title level={3}>Фильтр</Title>
      <Title level={5}>Количество мест</Title>
      <Slider
        range
        min={1}
        max={5}
        marks={{ 1: "1", 2: "2", 3: "3", 4: "4", 5: "5" }}
        onChange={setCountRoom}
        value={inputRangeRoom}
        defaultValue={rangeRoom}
      />
      <Space direction="vertical">
        <Title level={5}>Диапозон цен</Title>
        <Space>
          <InputNumber
            onChange={(value) => setInputMinPrice(Number(value))}
            style={{ width: "120px" }}
            placeholder="Мин. цена"
            value={minPrice}
            defaultValue={minPrice}
          />
          -
          <InputNumber
            onChange={(value) => setInputMaxPrice(Number(value))}
            style={{ width: "120px" }}
            placeholder="Макс. цена"
            value={maxPrice}
            defaultValue={maxPrice}
          />
        </Space>
        <Space>
          <Button onClick={handleActive} type="primary">
            Отфильтровать
          </Button>
          <Button onClick={handleReset}>Сбросить</Button>
        </Space>
      </Space>
    </div>
  );
};

export default Filter;

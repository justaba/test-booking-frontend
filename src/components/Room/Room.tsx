import React, { FC } from "react";
import { Button, Card, Space, Typography } from "antd";
import { useAppDispatch } from "../../store/hooks";
import { reservation } from '../Modal/modalSlice';
import './room.css';
import { IRoom } from "../App/appSlice";

const Room: FC<IRoom> = ({title, photo, price, id}) => {

  const { Title, Text } = Typography;

  const dispatch = useAppDispatch();

  return (
    <Card
      hoverable
      style={{ width: 280, height: 400 }}
      cover={
        <img alt={title} src={photo} className="card-image" />
      }
    >
      <Space style={{ width: '100%'}} direction="vertical" align="center">
        <Title level={5}>{title}</Title>
        <Text>{price} руб/ночь</Text>
        <Text mark>Осталось номеров: 5</Text>
        <Button onClick={() => dispatch(reservation(id))}>Забронировать</Button>
      </Space>
    </Card>
  );
};

export default Room;

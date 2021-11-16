import React, { useEffect } from "react";
import "./App.css";
import Room from "../Room";
import Modal from "../Modal";
import { Layout, Button, Empty } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { filteringOn } from "../Modal/modalSlice";
import { filterState } from "../Filter/filterSlice";
import { appState, fetchRooms, IRoom } from "./appSlice";

function App() {
  const { Header, Footer, Content } = Layout;

  const { filterOn, rangeRoom, minPrice, maxPrice } =
    useAppSelector(filterState);
  const { rooms } = useAppSelector(appState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const renderRoom = (data: IRoom[]) => {
    return data.map((room: IRoom) => (
      <Room
        key={room.id}
        id={room.id}
        title={room.title}
        photo={room.photo}
        price={room.price}
        countRoom={room.countRoom}
      />
    ));
  };

  const filterData = () => {
    const checkCountRoom = (count: number) =>
      count >= rangeRoom[0] && count <= rangeRoom[1];
    const checkPriceRoom = (price: number) =>
      price >= minPrice && price <= maxPrice;
    return rooms.filter((room: IRoom) => {
      return checkCountRoom(room.countRoom) && checkPriceRoom(room.price);
    });
  };

  return (
    <div className="App">
      <Layout style={{ minHeight: "100vh" }}>
        <Header>
          <div className="container">
            <h1 style={{ color: "white" }}>Grand Hotel</h1>
          </div>
        </Header>
        <Content>
          <div className="container">
            <div className="filter">
              <Button onClick={() => dispatch(filteringOn())} type="primary">
                Фильтр
              </Button>
            </div>
            <div className="rooms-list">
              {!!rooms.length ? (
                filterOn ? (
                  renderRoom(filterData())
                ) : (
                  renderRoom(rooms)
                )
              ) : (
                <Empty />
              )}
            </div>
          </div>
        </Content>
        <Footer></Footer>
      </Layout>
      <Modal />
    </div>
  );
}

export default App;

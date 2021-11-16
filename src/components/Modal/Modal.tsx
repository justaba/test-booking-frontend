import React, { FC } from "react";
import { Modal as ModalBlock } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { modalState, toggleVisible } from "./modalSlice";
import Reservation from "../Reservation";
import Filter from "../Filter";

const Modal: FC = () => {
  const { isVisible, option, reserveId } = useAppSelector(modalState);

  const dispatch = useAppDispatch();

  return (
    <ModalBlock visible={isVisible} onCancel={() => dispatch(toggleVisible())} footer={null}>
      {option === "reserve" && <Reservation id={reserveId} />}
      {option === "filter" && <Filter />}
    </ModalBlock>
  );
};

export default Modal;

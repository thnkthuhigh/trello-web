import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";
import {mapOrder} from "~/utils/sorts";

import {
  DndContext,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {arrayMove} from "@dnd-kit/sortable";
import {useEffect, useState} from "react";

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
  CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
};

const BoardContent = ({board}) => {
  //ket hop nhung co bat
  // const pointerSensor = useSensor(PointerSensor, {
  //   activationConstraint: {
  //     distance: 10,
  //   },
  // });
  //yeu cau di chuyen chuot 10px truoc khi kich hoat event
  //tren pc
  const mouseSensor = useSensor(MouseSensor, {
    //yeu cau di chuyen chuot 10px truoc khi kich hoat event
    activationConstraint: {
      distance: 10,
    },
  });
  // trnen dt
  //nhan giu 250mschenh lech di chuyen 5px
  const touchSensor = useSensor(TouchSensor, {
    //yeu cau di chuyen chuot 10px truoc khi kich hoat event
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });
  // const sensors = useSensors(pointerSensor);
  const sensors = useSensors(mouseSensor, touchSensor);

  const [ordereColumns, setOrdereColumns] = useState([]);

  //cung 1 thoi diem chi co 1 phan tu duoc keo la column hay card

  const [activeDragItemId, setActiveDragItemId] = useState([null]);
  const [activeDragItemType, setActiveDragItemType] = useState([null]);
  const [activeDragItemData, setActiveDragItemData] = useState([null]);

  useEffect(() => {
    setOrdereColumns(mapOrder(board?.columns, board?.columnOrderIds, "_id"));
  }, [board]);

  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id);
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );
    setActiveDragItemData(event?.active?.data?.current);
  };

  const handleDragEnd = (event) => {
    console.log(event);
    const {active, over} = event;

    //kiem tra neu ko ton tai over dung lai
    if (!over) return;

    if (active.id !== over.id) {
      // lay vi tri cu tu active
      const oldIndex = ordereColumns.findIndex((c) => c._id === active.id);
      // lay vi tri moi tu active
      const newIndex = ordereColumns.findIndex((c) => c._id === over.id);

      //dung arrayMove cua thang dnd-kit de sap xep lai mang dan dau cua column
      //code cua arrayMove o day
      const dndOrdereColumns = arrayMove(ordereColumns, oldIndex, newIndex);
      // const dndOrdereColumnsIds = dndOrdereColumns.map((c) => c._id);
      // console.log(dndOrdereColumns);
      // console.log(dndOrdereColumnsIds);

      setOrdereColumns(dndOrdereColumns);
    }
    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}>
      <Box
        sx={{
          backgroundColor: "primary.dark",
          width: "100%",
          height: (theme) => theme.trello.boardContentHeight,
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#2f3542" : "#5758BB",
        }}>
        <ListColumns columns={ordereColumns} />
      </Box>
    </DndContext>
  );
};

export default BoardContent;

import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";
import {mapOrder} from "~/utils/sorts";
//phan tu giu cho
import Column from "./ListColumns/Column/Column";
import Card from "./ListColumns/Column/ListCards/Card/Card";

import {
  DndContext,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {arrayMove, defaultAnimateLayoutChanges} from "@dnd-kit/sortable";
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

  const findColumnByCardId = (cardId) => {
    //tim columns theo card id
    return ordereColumns.find((column) =>
      column?.cards?.map((card) => card._id)?.includes(cardId)
    );
  };

  //khi bat dau keo 1 phan tu
  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id);
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );
    setActiveDragItemData(event?.active?.data?.current);
  };
  //qua trinh keo 1 phan tu
  const handleDragOver = (event) => {
    //ko lam gi khi keo column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;
    // console.log("ss", event);
    const {active, over} = event;
    //kiem tra neu ko ton tai over dung lai(keo linh tinh ra ngoai)
    if (!active || !over) return;

    // activeDraggingCardId la car ddang duoc keo
    const {
      id: activeDraggingCardId,
      data: {current: activeDraggingCardData},
    } = active;
    //overCardId la car tren duoi dang tuong tac voi ced duoc ke
    const {id: overCardId} = over;

    //tim 2 column cua 2 caed theo cardID
    const activeColumn = findColumnByCardId(activeDraggingCardId);
    const overColumn = findColumnByCardId(overCardId);
    //neu khong ton tai 1 trong 2 column dung lai
    if (!activeColumn || !overColumn) return;
    if (activeColumn._id !== overColumn._id) {
      setOrdereColumns((prevColumns) => {
        //tim vi tri active card sap duoc tha
        const overCardIndex = overColumn?.cards?.findIndex(
          (card) => card._id === overCardId
        );

        let newCardIndex;
        const isBelowOverItem =
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;
        const modifier = isBelowOverItem ? 1 : 0;
        newCardIndex =
          overCardIndex >= 0
            ? overCardIndex + modifier
            : overColumn?.cards?.length + 1;
        return [...prevColumns];
      });
    }
  };

  //khi jket thuc keo 1 phan tu
  const handleDragEnd = (event) => {
    console.log(event);

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      console.log("hanh dong keo tha card");
      return;
    }

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

  //animation khi tha phan tu
  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.5",
        },
      },
    }),
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
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
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemId &&
            activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
              <Column column={activeDragItemData} />
            )}
          {activeDragItemId &&
            activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
              <Card card={activeDragItemData} />
            )}
        </DragOverlay>
      </Box>
    </DndContext>
  );
};

export default BoardContent;

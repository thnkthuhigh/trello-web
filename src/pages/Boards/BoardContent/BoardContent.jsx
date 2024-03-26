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
  closestCorners,
} from "@dnd-kit/core";
import {arrayMove, defaultAnimateLayoutChanges} from "@dnd-kit/sortable";
import {useEffect, useState} from "react";
import {cloneDeep} from "lodash";

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
  CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
};

const BoardContent = ({board}) => {
  //ket hop nhung co bug
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
  const [oldColumnDrggingCard, setOldColumnDragingCard] = useState([null]);

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

    //neu la keo card thif set gia tri old column
    if (event?.active?.data?.current?.columnId) {
      setOldColumnDragingCard(findColumnByCardId(event?.active?.id));
    }
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
        //logic tinh toan cardindex moi tren hoac duoi cau card (lay tu thu vien)
        let newCardIndex;
        const isBelowOverItem =
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;
        const modifier = isBelowOverItem ? 1 : 0;
        newCardIndex =
          overCardIndex >= 0
            ? overCardIndex + modifier
            : overColumn?.cards?.length + 1;
        //clone oredcolumn sang 1 mang moi
        const nextColumns = cloneDeep(prevColumns);
        const nextActiveColumn = nextColumns.find(
          (column) => column._id === activeColumn._id
        );
        const nextOverColumn = nextColumns.find(
          (column) => column._id === overColumn._id
        );
        //column cu
        if (nextActiveColumn) {
          // xoa card tai column active
          nextActiveColumn.cards = nextActiveColumn.cards.filter(
            (card) => card._id !== activeDraggingCardId
          );

          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
            (card) => card._id
          );
        }
        // column moi
        if (nextOverColumn) {
          // kiem tra xem card dang keo co ton tai trong over column hay chua neu co roi thif can xoa truoc
          nextOverColumn.cards = nextOverColumn.cards.filter(
            (card) => card._id !== activeDraggingCardId
          );
          //them card ddang keo vi tri index moi
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(
            newCardIndex,
            0,
            activeDraggingCardData
          );
          //cap nhat lai mang cardorderIds cho chuan du lieu
          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
            (card) => card._id
          );
        }

        return nextColumns;
      });
    }
  };

  //khi jket thuc keo 1 phan tu
  const handleDragEnd = (event) => {
    const {active, over} = event;

    //kiem tra neu ko ton tai over dung lai
    if (!over) return;

    //xu ly keo tha card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
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
      //so sanh gia tri card cu va vi tris card sau khi keo
      if (oldColumnDrggingCard._id !== overColumn._id) {
        //keo tha card khac column
        console.log("keo tha card 2 col khac nhau");
      } else {
        //keo tha card cung column giong keo tha column

        //lay vi tri cu
        const oldCardIdex = oldColumnDrggingCard?.cards?.findIndex(
          (c) => c._id === activeDragItemId
        );
        // lay vi tri moi tu active
        const newCardIndex = overColumn?.cards?.findIndex(
          (c) => c._id === overCardId
        );
        //logic tuong tu keo column
        const dndOrdereCards = arrayMove(
          oldColumnDrggingCard?.cards,
          oldCardIdex,
          newCardIndex
        );
        console.log(dndOrdereCards);

        //clon mang cap nhat lai gia tri moi
        setOrdereColumns((prevColumns) => {
          const nextColumns = cloneDeep(prevColumns);
          //tim column dang tha
          const targetColumn = nextColumns.find(
            (c) => c._id === overColumn._id
          );

          //cap nhat lai 2 gia tri moi la card va cardOrdereIdstrong targetColumn
          targetColumn.cards = dndOrdereCards;
          targetColumn.cardOrderIds = dndOrdereCards.map((card) => card._id);
          return nextColumns;
        });
      }
    }

    //su ly keo tha column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      console.log("hanh dong keo tha column");
      if (active.id !== over.id) {
        // lay vi tri cu tu active
        const oldColumnIdex = ordereColumns.findIndex(
          (c) => c._id === active.id
        );
        // lay vi tri moi tu active
        const newColumnIndex = ordereColumns.findIndex(
          (c) => c._id === over.id
        );

        //dung arrayMove cua thang dnd-kit de sap xep lai mang dan dau cua column
        //code cua arrayMove o day
        const dndOrdereColumns = arrayMove(
          ordereColumns,
          oldColumnIdex,
          newColumnIndex
        );
        // const dndOrdereColumnsIds = dndOrdereColumns.map((c) => c._id);
        // console.log(dndOrdereColumns);
        // console.log(dndOrdereColumnsIds);

        setOrdereColumns(dndOrdereColumns);
      }
      //sau khi keo tha phai set ve gia tri ban dau
      setActiveDragItemId(null);
      setActiveDragItemType(null);
      setActiveDragItemData(null);
      setOldColumnDragingCard(null);
    }
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
      //thuat toan phat hien va cham(fix bug card lon khong an) khong dung center vi khong chay co tren doc
      collisionDetection={closestCorners}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      //cam bien
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

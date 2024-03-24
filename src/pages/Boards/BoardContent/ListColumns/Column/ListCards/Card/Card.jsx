import {Card as MuiCard} from "@mui/material";
import {useState} from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import GroupIcon from "@mui/icons-material/Group";
import CommentIcon from "@mui/icons-material/Comment";
import AttachmentIcon from "@mui/icons-material/Attachment";
import {Button, Typography} from "@mui/material";

import {mapOrder} from "~/utils/sorts";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

const Card = ({card}) => {
  const {attributes, listeners, setNodeRef, isDragging, transform, transition} =
    useSortable({id: card._id, data: {...card}});

  const dndKitCardStyles = {
    // touchAction: "none",
    transform: CSS.Translate.toString(transform), //translate not tranforming
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? "1px solid red" : undefined,
  };

  const shoudShowCardActions = () => {
    return (
      !!card?.memberIds?.length ||
      !!card?.comments?.length ||
      !!card?.attachments?.length
    );
  };

  return (
    <MuiCard
      ref={setNodeRef}
      style={dndKitCardStyles}
      {...attributes}
      {...listeners}
      sx={{
        cursor: "pointer",
        boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
        overflow: "unset",
      }}>
      {card?.cover && (
        <CardMedia sx={{height: 140}} image={card.cover} title='green iguana' />
      )}
      <CardContent sx={{p: 1.5, "&:last-child": {p: 1.5}}}>
        <Typography>{card.title}</Typography>
      </CardContent>
      {shoudShowCardActions() && (
        <CardActions sx={{p: "0 4px 8px 4px"}}>
          {!!card?.memberIds?.length && (
            <Button startIcon={<GroupIcon />} size='small'>
              {card?.memberIds?.length}
            </Button>
          )}
          {!!card?.comments?.length && (
            <Button startIcon={<CommentIcon />} size='small'>
              {card?.comments?.length}
            </Button>
          )}
          {!!card?.attachments?.length && (
            <Button startIcon={<AttachmentIcon />} size='small'>
              {card?.attachments?.length}
            </Button>
          )}
        </CardActions>
      )}
    </MuiCard>
  );
};

export default Card;

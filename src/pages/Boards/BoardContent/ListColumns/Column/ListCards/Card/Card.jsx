import {Card as MuiCard} from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import GroupIcon from "@mui/icons-material/Group";
import CommentIcon from "@mui/icons-material/Comment";
import AttachmentIcon from "@mui/icons-material/Attachment";
import {Button, Typography} from "@mui/material";

const Card = ({temporaryHideMedia}) => {
  if (temporaryHideMedia) {
    return (
      <MuiCard
        sx={{
          cursor: "pointer",
          boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
          overflow: "unset",
        }}>
        <CardContent sx={{p: 1.5, "&:last-child": {p: 1.5}}}>
          <Typography>Thanh thu high</Typography>
        </CardContent>
      </MuiCard>
    );
  }

  return (
    <MuiCard
      sx={{
        cursor: "pointer",
        boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
        overflow: "unset",
      }}>
      <CardMedia
        sx={{height: 140}}
        image='https://i.pinimg.com/736x/11/2c/e2/112ce265cfd07283bdc4f92f0800e60b.jpg'
        title='green iguana'
      />
      <CardContent sx={{p: 1.5, "&:last-child": {p: 1.5}}}>
        <Typography>Thanh thu high</Typography>
      </CardContent>
      <CardActions sx={{p: "0 4px 8px 4px"}}>
        <Button startIcon={<GroupIcon />} size='small'>
          20
        </Button>
        <Button startIcon={<CommentIcon />} size='small'>
          15
        </Button>
        <Button startIcon={<AttachmentIcon />} size='small'>
          20
        </Button>
      </CardActions>
    </MuiCard>
  );
};

export default Card;

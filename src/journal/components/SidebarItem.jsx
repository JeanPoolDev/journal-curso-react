import { TurnedInNot } from "@mui/icons-material";
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal/journalSlice";

export function SidebarItem({ id, title, body, date, imageUrl = [] }) {

  const dispatch = useDispatch();

  const newTitle = useMemo(() => {
    return title.length > 17
      ? title.slice(0, 17) + '...'
      : title;
  }, [title])

  const onNote = () => {
    dispatch(setActiveNote({ id, title, body, date, imageUrl }))
  }

  return (
    <ListItem key={id} disablePadding>
      <ListItemButton onClick={onNote} >
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
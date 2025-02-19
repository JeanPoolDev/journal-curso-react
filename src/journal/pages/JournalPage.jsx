import { Fab } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView } from "../view/NoteView";
import { NothingSelectedView } from "../view/NothingSelectedView";
import { AddOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { startNewNote } from "../../store/journal/thunks";

export function JournalPage() {

  const dispatch = useDispatch();
  const { isSaving, active } = useSelector((state) => state.journal);

  const onClickNewNote = () => {
    dispatch(startNewNote());
  }

  return (
    <JournalLayout>

      {
        active
          ? <NoteView />
          : <NothingSelectedView />
      }

      <Fab
        disabled={isSaving}
        onClick={onClickNewNote}
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          position: 'fixed',
          bottom: 20,
          right: 20
        }}
      >
        <AddOutlined />
      </Fab>


    </JournalLayout>
  );
};
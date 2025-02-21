import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { ImageGallery } from "../components/ImageGallery";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { startDeleteNote, startSaveNote, startUploadingFiles } from "../../store/journal/thunks";
import { useEffect, useRef } from "react";
import { setActiveNote } from "../../store/journal/journalSlice";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css'

export function NoteView() {

  const dispatch = useDispatch();
  const { active: note, messageSaved, isSaving } = useSelector((state) => state.journal);
  const { title, body, date, onInputChange, formState } = useForm(note);
  const inputFileRef = useRef();

  const fecha = () => {
    const newData = new Date(date);

    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(newData);
  };

  useEffect(() => {
    dispatch(setActiveNote(formState))
  }, [dispatch, formState]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire({
        title: messageSaved,
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })
    }
  }, [messageSaved])


  const onSaveNote = () => {
    dispatch(startSaveNote())
  }

  const onDelete = () => {
    dispatch(startDeleteNote())
  }

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;
    dispatch(startUploadingFiles(target.files));
  }

  return (
    <Grid container direction='row' justifyContent={'space-between'} sx={{ mb: 2 }} alignContent={'center'}>
      <Grid item>
        <Typography fontSize={39} fontWeight={'light'}>
          {fecha()}
        </Typography>
      </Grid>
      <Grid item>

        <input
          type="file"
          multiple
          ref={inputFileRef}
          onChange={onFileInputChange}
          style={{ display: 'none' }}
        />

        <IconButton
          color="primary"
          disabled={isSaving}
          onClick={() => inputFileRef.current.click()}
        >
          <UploadOutlined />
        </IconButton>

        <Button
          disabled={isSaving}
          onClick={onSaveNote}
          color="primary"
          sx={{ p: 2 }}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          variant="filled"
          type="text"
          placeholder="Ingrese un Titulo"
          label="Título"
          value={title}
          name="title"
          onChange={onInputChange}
          fullWidth
          sx={{ border: 'none', mb: 1 }}
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          value={body}
          name="body"
          onChange={onInputChange}
          multiline
          placeholder="¿Qué sucedió en el dia de hoy?"
          minRows={5}
        />
      </Grid>

      <Grid container justifyContent={'end'}>
        <Button
          onClick={onDelete}
          sx={{ mt: 2 }}
          color="error"
        >
          <DeleteOutline />
          Borrar
        </Button>
      </Grid>

      {/* Imagenes Gallery */}
      <ImageGallery images={note.imageUrl} />

    </Grid>
  );
};
import { Box, ImageList, ImageListItem } from "@mui/material";

export function ImageGallery({ images = [] }) {

  return (
    <Box sx={{ width: '100%', height: 500 }}>
      <ImageList variant="masonry" cols={4} gap={8}>
        {
          images.map(image => (
            <ImageListItem key={image}>
              <img
                src={image}
                loading="lazy"
                alt="imagen de la nota"
              />
            </ImageListItem>
          ))
        }
      </ImageList>
    </Box>
  );
}

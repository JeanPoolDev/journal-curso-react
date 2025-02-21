
export const fileUpload = async (files) => {

  if (!files) throw new Error('Los archivos no se encontraron');

  const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dphxj5ff2/upload';

  const formData = new FormData();

  formData.append('upload_preset', 'react-journal');
  formData.append('file', files);

  try {

    const resp = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: formData
    });

    if (!resp.ok) throw new Error('No se completo el fetch');

    const cloudResp = await resp.json();

    return cloudResp.secure_url;

  } catch (error) {
    console.log(error.message)
    throw new Error('No se completo el fetch');
  }

}

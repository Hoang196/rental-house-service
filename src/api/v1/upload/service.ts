const uploadImage = async (request: any) => {
  if (!request.file) {
    throw new Error('No file uploaded!');
  }

  return { url: request.file.path };
};

export { uploadImage };

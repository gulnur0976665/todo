namespace UPLOAD {
  type UploadFileTodosResponse = {
    name: string;
    url: string;
    format: string;
  };
  type UploadFileTodosRequest = FormData;
}

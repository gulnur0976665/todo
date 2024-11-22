namespace UPLOAD {
  export type UploadFileTodosResponse = {
    name: string;
    url: string;
    format: string;
  };
  export type UploadFileTodosRequest = FormData;
}

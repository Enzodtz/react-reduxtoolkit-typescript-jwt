export default function handleFormError(error: any) {
  if (error.response) {
    if (error.response.data) {
      if (error.response.data.detail) return error.response.data.detail;
      else return error.response.data;
    }
    if (error.response.message) return error.response.message;
  }

  if (error.message) return error.message;
}

const logAxiosError = (error) => {
  console.error(error.response.status, error.response.data.error)
}

export default logAxiosError

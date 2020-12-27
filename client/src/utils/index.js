export const errorHandler = (payload) => {
  if (payload && payload.status) {
    switch (payload.status) {
      case 500:
        return payload.data.message
      default:
        return payload.data.data.message
    }
  }
}

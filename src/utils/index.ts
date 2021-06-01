export const convertTime = (time?: Date) => {
  if (time) {
    return `${new Date(time).getDate()}/${
      new Date(time).getMonth() + 1
    }/${new Date(time).getFullYear()}`
  }
  return ''
}

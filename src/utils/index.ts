export const convertTime = (time?: Date) => {
  if (time) {
    return `${new Date(time).getDate()}/${
      new Date(time).getMonth() + 1
    }/${new Date(time).getFullYear()}`
  }
  return ''
}

export const convertToMoney = (amount?: number) => {
  let formatter = new Intl.NumberFormat('vi-VI', {
    style: 'currency',
    currency: 'VND',
  })
  return formatter.format(amount || 0)
}

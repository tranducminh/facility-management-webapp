export const getBase64 = (file: any) => {
  return new Promise((resolve) => {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
  })
}

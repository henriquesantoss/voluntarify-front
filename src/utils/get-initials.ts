export const getInitials = (name: string) => {
  const fullName = name.split(' ')
  return fullName[0][0] + fullName[fullName.length - 1][0]
}

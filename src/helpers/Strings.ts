function getInitialName(name) {
  const parts = name.split(' ')
  let initials = ''
  for (let i = 0; i < parts.length; i += 1) {
    if (parts[i].length > 0 && parts[i] !== '') {
      if (parts[i][0] === parts[i][0].toUpperCase()) {
        initials += parts[i][0]
      }
    }
  }
  return initials
}

const Strings = {
  getInitialName,
}

export default Strings

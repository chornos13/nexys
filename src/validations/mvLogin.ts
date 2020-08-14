import * as yup from 'yup'

const validation = yup.object().shape({
  username: yup.string().required('Username wajib diisi'),
  password: yup.string().required('Password wajib diisi'),
})

export default validation

import * as Yup from 'yup'

const schemaValidationUpdateUser = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string().email().required('Emaill required!'),
  old_password: Yup.string(),
  password: Yup.string()
})

export default schemaValidationUpdateUser

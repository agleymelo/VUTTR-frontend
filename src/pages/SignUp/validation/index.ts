import * as Yup from 'yup'

const schemaValidationSignUp = Yup.object().shape({
  name: Yup.string().required('Name required!'),
  email: Yup.string().required('E-mail required!').email('Enter a valid email address!'),
  password: Yup.string().required('Password required!')
})

export default schemaValidationSignUp

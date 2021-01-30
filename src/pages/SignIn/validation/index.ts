import * as Yup from 'yup'

const schemaValidationSignIn = Yup.object().shape({
  email: Yup.string().required('E-mail required!').email('Enter a valid email address!'),
  password: Yup.string().required('Password required!')
})

export default schemaValidationSignIn

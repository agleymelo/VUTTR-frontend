import * as Yup from 'yup'

const schemaValidationCreateNewTools = Yup.object().shape({
  title: Yup.string().required('Title required!'),
  link: Yup.string().required('Link required!'),
  description: Yup.string(),
  tags: Yup.string().nullable().required('Tag required!')
})

export default schemaValidationCreateNewTools

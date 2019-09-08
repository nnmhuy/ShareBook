import * as yup from 'yup'

const requiredMessage = 'This field is mandatory'
const maxMessage = 'This field is larger than 255 characters'

const LoginValidation = yup.object().shape({
    address: yup.string().required(requiredMessage).max(255, maxMessage),
    city: yup.string().required(requiredMessage).max(255, maxMessage),
    state: yup.string().max(255, maxMessage),
    zipCode: yup.number().required(requiredMessage).positive('Invalid ZIP code')
  })

export { LoginValidation }
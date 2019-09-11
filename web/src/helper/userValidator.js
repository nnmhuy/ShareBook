import * as yup from 'yup'

const requiredMessage = 'Không được để trống'
const maxMessage = 'Không được nhiều hơn 255 ký tự'
const minMessage = 'không được ít hơn 6 ký tự'

const LoginValidation = yup.object().shape({
    username: yup.string().required(requiredMessage).max(255, maxMessage).min(6, minMessage)
    .test('test username', 'chỉ chứa chữ không dấu và số', 
      function(value) {
        return /^[a-zA-Z0-9]*$/.test(value);
      }),
    password: yup.string().required(requiredMessage).max(255, maxMessage).min(6, minMessage),
  })

export { LoginValidation }
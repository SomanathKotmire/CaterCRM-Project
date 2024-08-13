import { object, string } from "yup";


export const formikValidation = object({
    email: string().email().required("Email is Required"),
    password: string().min(6).required("Password is Required")
})
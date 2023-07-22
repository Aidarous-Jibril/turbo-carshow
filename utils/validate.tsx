import { LoginFormValues, RegisterFormValues } from "@/types";
import { FormikErrors } from "formik";


export const registerValidate = (values: RegisterFormValues) => {
    let errors: FormikErrors<RegisterFormValues> = {};
    if(!values.username){
      errors.username = "Required"
    }

    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
      errors.email = 'Invalid email address';
    }
    // password validation
    if(!values.password) {
      errors.password = "Required"
    } else if(values.password.length < 6 || values.password.length > 15){
      errors.password = 'Password must be between 6 to 15 chars'
    } else if(values.password.includes(" ")){
        errors.password = 'Invalid password'
    }
    // Conf password validation
    if(!values.confpassword) {
      errors.confpassword = "Required"
    } else if(values.confpassword !== values.password){
      errors.confpassword = 'Password not match'
    } else if(values.confpassword.includes(" ")){ 
        errors.confpassword = 'Invalid password'
    }
    return errors;
  }

export const loginValide = (values: LoginFormValues) => {
    let errors: FormikErrors<LoginFormValues> = {};

    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
      errors.email = 'Invalid email address';
    }
    // password validation
    if(!values.password) {
      errors.password = "Required"
    } else if(values.password.length < 6 || values.password.length > 15){
      errors.password = 'Password must be between 6 to 15 chars'
    } else if(values.password.includes(" ")){
        errors.password = 'Invalid password'
    }
    return errors;
}
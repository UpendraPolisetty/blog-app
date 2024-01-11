

export const Validate = (errors , name , value) => {
  switch(name) {
    case "username" :
        let nameError = value.length < 7 ? "name should be atleast 6 characters long " : "";
        errors.username = nameError;
        break;
    case "email" :
        let mailError = value.indexOf('@') === -1 ? "Email should contain @ " : "";
        errors.email = mailError;
        break;
    case "password" :
        let passwordError;
        if ( value.length < 7 ){
            passwordError =  "password should be atleast 6 characters " ;
        }
        errors.passwod = passwordError;
        let re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/;
        if (!re.test(value)) {
            passwordError = "Password must contain a letter and a number"
        }
        errors.password = passwordError
        break;
  }
}

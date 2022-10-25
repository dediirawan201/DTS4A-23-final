import "./register.scss";
import Logo from "../../assets/img/movies.png";
import { useState } from "react";
import { registrasiDenganEmailPassword } from "../../authentication/firebase";
import { useNavigate } from "react-router-dom";
const Register = () => {
    const [credential, setCredential] = useState({
        email: "",
        password: "",
      });

      const navigate = useNavigate()

    //   const textFieldNamaOnChangeHandler = (event) => {
    //     setCredential({
    //       ...credential,
    //       nama: event.target.value,
    //     });
    //   };
      const textFieldEmailOnChangeHandler = (event) => {
        // Karena state berupa Object
        // dan state sifatnya immutable
    
        // maka untuk set statenya
        // menggunakan spread dan overwrite
        setCredential({
          ...credential,
          email: event.target.value,
        });
      };
    
      const textFieldPasswordOnChangeHandler = (event) => {
        setCredential({
          ...credential,
          password: event.target.value,
        });
      };

      const registerHandler = () => {
        registrasiDenganEmailPassword(credential.email, credential.password)
        console.log("Register berhasil");
        navigate("/");
      };
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img className="logo" src={Logo} alt="" />
        </div>
      </div>
      <div className="container">
        <form onSubmit={registerHandler}>
            <h1>Register</h1>
            {/* <input type='text' value={credential.nama}
            onChange={textFieldNamaOnChangeHandler} placeholder="Nama Akun"/> */}
            <input type='email' value={credential.email}
            onChange={textFieldEmailOnChangeHandler} placeholder="Email atau Nomer Handphone"/>
            <input value={credential.password}
            onChange={textFieldPasswordOnChangeHandler} type='password' placeholder="Password"/>
            <button type='submit'  className="loginButton">Register</button>
            <span>Sudah terdaftar? <b onClick={() => navigate('/login')}>Log In Sekarang.</b></span>
            
        </form>
      </div>
    </div>
  );
};

export default Register;

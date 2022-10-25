import "./login.scss";
import Logo from "../../assets/img/movies.png";
import { auth, signDenganEmailDanPassword } from "../../authentication/firebase";
import { useEffect, useState } from "react";
import {useAuthState} from 'react-firebase-hooks/auth';
import { useNavigate } from "react-router-dom";

const Login = () => {
  // gunakan hooks useNavigate
  const navigate = useNavigate();
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });


  const [user,isLoading] = useAuthState(auth)

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

  const LoginHandler = (e) => {
    // e.preventDefault()
    signDenganEmailDanPassword(credential.email, credential.password)
    console.log("Register berhasil");
    navigate("/");
  };

  useEffect(() => {
    console.log(user)
    if(isLoading){
      //tampilin screen loading
      return;
    }
    if(user){
      // arahkan ke '/'
      navigate("/")
    }
  },[isLoading,user,navigate])
  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img className="logo" src={Logo} alt="" />
        </div>
      </div>
      <div className="container">
        <form onSubmit={LoginHandler}>
            <h1>Sign In</h1>
            <input type='email' value={credential.email}
            onChange={textFieldEmailOnChangeHandler} placeholder="Email atau Nomer Handphone"/>
            <input value={credential.password}
            onChange={textFieldPasswordOnChangeHandler} type='password' placeholder="Password"/>
            <button type='submit'>Login</button>
            <span>Belum Daftar? <b onClick={() => navigate('/register')}>Registrasi Sekarang.</b></span>
            <small>halaman ini dilindungi oleh Google reCAPTCHA untuk memastikan Anda Bukan robot. <b>Pelajari lebih lanjut</b></small>
        </form>
      </div>
    </div>
  );
};

export default Login;

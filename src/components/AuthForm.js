import React, { useState } from "react";
import { authService } from "fbase";


const AuthForm = () =>{
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [newAccount, setnewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (event) => {
    const {target: {name,value}} = event;
    if(name === "email"){
      setEmail(value)
    }else if(name === "password"){
      setpassword(value)
    }
  }
  const onSubmit = async(event) =>{
    event.preventDefault();
    try{
      let data;
      if (newAccount){
        // create account
        data = await authService.createUserWithEmailAndPassword(
          email, password
      )
      }else {
        // log in
        data = await authService.signInWithEmailAndPassword(
          email, password
        )
      }
    }catch(error){
      setError(alert(error.message))
    }
  };
  const toggleAccount = () => setnewAccount((prev) => !prev);
  return(
    <>
      <form onSubmit={onSubmit} className="container">
        <input 
          name="email" 
          type="email" 
          placeholder="Email" 
          required 
          value={email}
          onChange={onChange}
          className="authInput"
        />
        <input 
          name="password" 
          type="password"
          placeholder="Password" 
          required 
          value={password}
          onChange={onChange}
          className="authInput"
        />
        <input className="authToggle" type="submit" value={ newAccount ? "Create Account" : "Log In" }/>
        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={toggleAccount} className="authSwitch">{newAccount ? "Already have an account? Sign in" : "New to Gwitter? Create an Account."}</span>
    </>
  );
};

export default AuthForm;
import React, { useState, useEffect } from 'react';
import {auth} from '../../firebase';
import {toast} from 'react-toastify';

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation
    if (!email || !password) {
      toast.error('Email and password is required');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(email, window.location.href); 
      if (result.user.emailVerified) {
        // remove user email from local storage
        window.localStorage.removeItem("emailForRegistration");
        // get user id token
        let user = auth.currentUser
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        // redux store

        // redirect
        history.push('/');  
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => 
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        className="form-control" 
        value={email} 
        disabled
      />

      <input 
        type="password" 
        className="form-control" 
        value={password} 
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        autoFocus
      />

      <button type="submit" className="btn btn-raised">
        Complete Registration
      </button>
    </form>
  
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete</h4>
          {completeRegistrationForm()}         
        </div>  
      </div>  
    </div>
  );
};

export default RegisterComplete;
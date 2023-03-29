import React, { useState } from 'react'
import { Button, Error, Input, FormField, Label } from '../styles'

const SignUpForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] =useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch("signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        password_confirmation: passwordConfirmation,
        first_name: firstName,
        last_name: lastName,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
      } else{
        r.json().then((error) => setErrors(error.errors));
      }
    })
  }
  return (
    <form onSubmit={handleSubmit}>
      <FormField>
        <Label htmlFor='username'>Username</Label>
        <Input
          type='text'
          id='username'
          autoComplete='off'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormField>
      <FormField>
        <Label htmlFor='email'>Email</Label>
        <Input 
          type='email'
          id='email'
          autoComplete='off'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormField>
      <FormField>
        <Label htmlFor='password'>Password</Label>
        <Input 
          type='password'
          id='password'
          autoComplete='off'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormField>
      <FormField>
        <Label htmlFor='password'>password Confirmation</Label>
        <Input
          type='password'
          id='password_confirmation'
          autoComplete='off'
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
      </FormField>
      <FormField>
        <Label htmlFor='firstName'>First Name</Label>
        <Input 
          type='text'
          id='first_name'
          autoComplete='off'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </FormField>
      <FormField>
        <Label htmlFor='lastName'>Last Name</Label>
        <Input 
          type='text'
          id='last_name'
          autoComplete='off'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </FormField>
      <FormField>
        <Button type='submit'>{isLoading ? "Loading..." : "Sign Up"}</Button>
      </FormField>
      <FormField>
        {errors.map((error) => (
          <Error key={error}>{error}</Error>
        ))}
      </FormField>
    </form>
  )
}

export default SignUpForm
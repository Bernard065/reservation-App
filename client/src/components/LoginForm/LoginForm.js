import React, { useState } from 'react'
import { Button, Error, FormField, Input, Label } from '../../styles';

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        }).then((r) => {
            setIsLoading(false);
            if (r.ok) {
                r.json().then((user) => onLogin(user));
            } else {
                r.json().then((error) => setErrors([error.errors]));
            }
        })
    }
  return (
    <form onSubmit={handleSubmit}>
        <FormField>
            <Label htmlFor='username'>Username</Label>
            <Input 
                type="text"
                id='username'
                autoComplete='off'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
        </FormField>
        <FormField>
            <Label htmlFor='password'>Password</Label>
            <Input 
                type="password"
                id='password'
                autoComplete='off'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </FormField>
        <FormField>
            <Button variant='fill' color='primary' type='submit'>
                {isLoading ? "Loading..." : "Login"}
            </Button>
        </FormField>
        <FormField>
            {errors.map((error) => (
                <Error key={error}>{error}</Error>
            ))}
        </FormField>
    </form>
  )
}

export default LoginForm
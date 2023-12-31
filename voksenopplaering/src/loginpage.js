import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const navigate = useNavigate();
    let Userinformation = "Du er ikke logget inn. Vennligst logg inn.";
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password, firstName, lastName);
        Userinformation = email;
        register();
        navigate("/");
    };

    const register = () => {
        const dataToSend = {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        }
        fetch('/create-user', {
            method:'POST',
            headers:{
              "content-type":"application/json",
            },
            body:JSON.stringify(dataToSend),
        })
        .then(async (res) => {
            const data = await res.json();
            console.log(data);
            setIsLoggedIn(true);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    };

    const handleLoginClick = () => {
        navigate("/login");
    };

    if (isLoggedIn === true) {
        return (
            <p>LOGGET INN!</p>
        )
    } else {
        return (
            <main>
                <p>{email}</p>
                <div className='loginForm'>
                    <form onSubmit={handleSubmit}>
                        <div className='loginDiv'>
                            <div className='logintextDiv'>
                                <label htmlFor="email">E-Post:</label>
                            </div>
                            <div className='labelDiv'>
                                <input
                                    className='textInput'
                                    type="text"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='loginDiv'>
                            <div className='logintextDiv'>
                                <label htmlFor="password">Passord:</label>
                            </div>
                            <div className='labelDiv'>
                                <input
                                    className='textInput'
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='loginDiv'>
                            <div className='logintextDiv'> 
                                <label htmlFor="firstName">Fornavn:</label>
                            </div>
                            <div className='labelDiv'>
                                <input
                                    className='textInput'
                                    type="text"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='loginDiv'>
                            <div className='logintextDiv'>
                                <label htmlFor="lastName">Etternavn:</label>
                            </div>
                            <div className='labelDiv'>
                                <input
                                    className='textInput'
                                    type="text"
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='submitDiv'>
                            <input className='submitButton' type="submit" value="Registrer deg" />
                        </div>
                        <div className='noAccountDiv'>
                        <button className='noAccountButton' onClick={handleLoginClick}>Har du allerede en konto? Logg inn!</button>
                        </div>
                    </form>
                </div>
            </main>
        );
    }
}

export default LoginPage;


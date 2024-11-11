import React, { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ToastContainer from './ToastContainer';
import styles from "../style";

const Login = () => {
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [toasts, setToasts] = useState([]);

    const addToast = (type, message) => {
        const id = new Date().getTime();
        setToasts([...toasts, { id, type, message }]);
        setTimeout(() => removeToast(id), 3000);
    };

    const removeToast = (id) => {
        setToasts(toasts.filter((toast) => toast.id !== id));
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        if (!username || !pass) {
            addToast('error', 'All fields are required');
            return;
        }
        try {
            const response = await fetch("http://localhost:3001/LoginAdmin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, pass }),
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                sessionStorage.setItem("isLogin", true);
                addToast('success', 'Logged in successfully');
                setTimeout(() => window.location.href = "/", 3000);
            } else {
                addToast('error', 'Username or password is incorrect');
            }
        } catch (error) {
            console.error("Error logging in:", error);
            addToast('error', 'An error occurred while logging in');
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <div className="flex justify-center items-center h-screen pb-24">
            <section id="login" className={`flex md:flex-row flex-col ${styles.paddingX}`}>
                <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 flex justify-center items-center`}>
                    <h1 className="font-poppins font-semibold text-[55px] text-white leading-[100.8px] mb-8">
                        <span className="">Login</span>
                    </h1>
                    <Box
                        component="form"
                        onSubmit={handleLogin}
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '40ch' },
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            border: '2px solid white',
                            borderRadius: '8px',
                            padding: '24px',
                            backgroundColor: '#050505'
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="username"
                            label="Username"
                            variant="outlined"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            InputLabelProps={{ style: { color: 'white' } }}
                            InputProps={{
                                style: { color: 'white' },
                                classes: {
                                    notchedOutline: 'border-white'
                                },
                                sx: {
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'white',
                                        },
                                    },
                                }
                            }}
                            sx={{ paddingBottom: '8px'}}
                        />
                        <TextField
                            id="password"
                            label="Password"
                            variant="outlined"
                            type={showPassword ? "text" : "password"}
                            value={pass}
                            onChange={(event) => setPass(event.target.value)}
                            InputLabelProps={{ style: { color: 'white' } }}
                            InputProps={{
                                style: { color: 'white' },
                                classes: {
                                    notchedOutline: 'border-white'
                                },
                                sx: {
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'white',
                                        },
                                    },
                                },
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                            sx={{ color: 'white' }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            sx={{ paddingBottom: '8px'}}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ 
                                mt: 2, 
                                backgroundColor: '#1591ea', 
                                '&:hover': { backgroundColor: '#00008a' },
                                padding: '12px 24px',
                            }}
                        >
                            Sign in
                        </Button>
                    </Box>
                    <p className="mt-4 text-white mb-4">
                        Don't have an account? <a href="/Register" className="text-blue-500 hover:text-blue-700">Sign Up</a>
                    </p>
                </div>
            </section>
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </div>
    );
};

export default Login;
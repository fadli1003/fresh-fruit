import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
    const baseUrl = import.meta.env.VITE_API_BASE_URL
		
		try {
			const url = isLogin
				? `${baseUrl}/auth/login`
				: `${baseUrl}/auth/register`;

			const payload = isLogin ? { email, password } : { name, email, password };

			const res = await axios.post(url, payload);
			const data = res.data;

			localStorage.setItem('token', data.token);
			localStorage.setItem('user', JSON.stringify(data.user));

			window.dispatchEvent(new Event('authChange'));
			navigate('/');
		} catch (err) {
			if (err.response) {
				setError(err.response.data.error || 'Authentication failed');
			} else if (err.request) {
				// Server tidak merespon (Network error)
				setError('Network error: Server is not responding');
			} else {
				setError('An error occurred');
			}
			console.error('Auth Error:', err);
		}
	};

	return (
		<div className='max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-lg'>
			<h1 className='text-2xl font-bold text-center mb-6'>{isLogin ? 'Login' : 'Register'}</h1>
			{error && <div className='bg-red-100 text-red-700 p-3 rounded mb-4'>{error}</div>}
			<form
				onSubmit={handleSubmit}
				className='space-y-4'
			>
				{!isLogin && (
					<input
						type='text'
						placeholder='Full Name'
						value={name}
						onChange={(e) => setName(e.target.value)}
						className='w-full p-2 border rounded'
						required
					/>
				)}
				<input
					type='email'
					placeholder='Email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className='w-full p-2 border rounded'
					required
				/>
				<input
					type='password'
					placeholder='Password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className='w-full p-2 border rounded'
					required
				/>
				<button
					type='submit'
					className='w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded font-semibold'
				>
					{isLogin ? 'Login' : 'Register'}
				</button>
			</form>
			<button
				onClick={() => navigate('/admin-login')}
				className='relative p-2 text-blue-600 hover:text-green-600'
			>
				Admin? Login Admin
			</button>
			<button
				onClick={() => setIsLogin(!isLogin)}
				className='mt-4 text-green-600 hover:text-green-800'
			>
				{isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
			</button>
		</div>
	);
};

export default LoginPage;

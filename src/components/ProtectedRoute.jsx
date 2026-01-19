import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // npm install jwt-decode
import { useState, useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
	const token = localStorage.getItem('token');

	const [isValid, setIsValid] = useState(token ? true : false);
	const [isChecking, setIsChecking] = useState(true);

	useEffect(() => {
		const checkToken = () => {
			if (!token) {
				setIsValid(false);
			} else {
				try {
					const decoded = jwtDecode(token);
					if (decoded.exp < Date.now() / 1000) {
						localStorage.removeItem('token');
						setIsValid(false);
					} else {
						setIsValid(true);
					}
				} catch {
					setIsValid(false);
				}
			}
			setIsChecking(false);
		};

		checkToken();
	}, [token]);

	if (isChecking) {
		return <div style={{ textAlign: 'center', marginTop: '50px' }}>≈Á√“§§...</div>;
	}

	if (!isValid) {
		return <Navigate to="/login" replace />;
	}

	return children;
};

export default ProtectedRoute;

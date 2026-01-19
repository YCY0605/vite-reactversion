import React, { useState } from 'react';
import Cookies from 'js-cookie'; // npm install js-cookie

const LoginPage = () => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(import.meta.env.VITE_API_URL + '/api/Auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userName: username, password: password }),
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                alert('登入成功！');

                if (data.isFirstLogin) window.location.href = "/" // 更改密碼
                window.location.href = '/'; // 首頁
            } else {
                const errorText = await response.text();
                alert(`登入失敗：${errorText}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('無法連線至伺服器');
        }
    };

    return (
        <>
            <div style={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
                <form onSubmit={handleLogin} style={{ border: '2px solid #888888', borderRadius: '10px', overflow: 'hidden' }}>
                    <div
                        style={{
                            display: 'grid',
                            placeItems: 'center',
                            gridTemplateRows: '30px 2px 168px',
                            border: '2px solid #888888',
                            borderRadius: '10px',
                            overflow: 'hidden'
                        }}
                    >
                        <div
                            style={{
                                width: '400px',
                                backgroundColor: '#ffefbf',
                                position: 'relative',
                                textAlign: 'center',
                                fontSize: '20px'
                            }}
                        >
                            系統登入
                        </div>
                        <div style={{ width: '400px', height: '2px', backgroundColor: '#888888' }}></div>
                        <div
                            style={{
                                width: '400px',
                                height: '168px',
                                backgroundColor: '#fff7e1',
                                display: 'grid',
                                placeItems: 'center'
                            }}
                        >
                            <div>
                                <label htmlFor="username">帳號：</label>
                                <input type="text" value={username ?? ""} onChange={(e) => setUsername(e.target.value)} id="username" name="username" placeholder="請輸入帳號" required />
                            </div>
                            {/* 密碼欄位 */}
                            <div>
                                <label htmlFor="password">密碼：</label>
                                <input type="password" value={password ?? ""} onChange={(e) => setPassword(e.target.value)} placeholder="請輸入密碼" required />
                            </div>
                            <button type="submit" style={{ width: '250px', borderRadius: '25px' }}>
                                登入
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default LoginPage;

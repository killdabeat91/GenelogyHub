import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useI18n } from '../contexts/I18nContext';
import { useToast } from '../components/Toast';
import './Login.css';

export function Login() {
    const { login } = useAuth();
    const { t } = useI18n();
    const toast = useToast();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        setTimeout(() => {
            const result = login(username, password);
            if (result.success) {
                toast.success('Đăng nhập thành công!');
            } else {
                setError(result.error);
                toast.error(result.error);
            }
            setLoading(false);
        }, 600);
    };

    return (
        <div className="login-page">
            <div className="login-backdrop" />
            <div className="login-card">
                <div className="login-brand">
                    <div className="login-logo-ring">
                        <span className="login-icon">🌳</span>
                    </div>
                    <h1>{t('login.title')}</h1>
                    <p className="login-subtitle">Hệ thống quản lý gia phả trực tuyến</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {error && <div className="login-error">{error}</div>}

                    <div className="login-field">
                        <label>Tên đăng nhập</label>
                        <input
                            type="text"
                            placeholder={t('login.username')}
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            autoFocus
                            required
                        />
                    </div>
                    <div className="login-field">
                        <label>Mật khẩu</label>
                        <input
                            type="password"
                            placeholder={t('login.password')}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="login-options">
                        <label className="login-remember">
                            <input type="checkbox" />
                            <span>{t('login.remember')}</span>
                        </label>
                        <a href="#" className="login-forgot">{t('login.forgot')}</a>
                    </div>

                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading && <span className="login-spinner" />}
                        {loading ? 'Đang đăng nhập...' : t('login.btn')}
                    </button>
                </form>

                <div className="login-hint">
                    <p>Demo: <code>admin</code> / <code>admin</code> (Quản trị viên)</p>
                    <p>Hoặc: <code>member</code> / <code>1234</code> (Thành viên)</p>
                </div>
            </div>
        </div>
    );
}

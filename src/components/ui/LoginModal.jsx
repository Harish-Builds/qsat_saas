import React, { useState } from 'react';
import Icon from '../AppIcon';

const LoginModal = ({ isOpen, onClose, onLogin, itemName }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (username === 'admin' && password === 'admin123') {
      onLogin();
      setUsername('');
      setPassword('');
      setError('');
    } else {
      setError('Invalid credentials. Use admin/admin123');
    }
  };

  const handleClose = () => {
    setUsername('');
    setPassword('');
    setError('');
    onClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-card border border-primary/30 rounded-lg shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 border-b border-primary/30 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Lock" size={20} className="text-primary" />
              <h2 className="text-lg font-bold text-foreground">Authentication Required</h2>
            </div>
            <button
              onClick={handleClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">Access to {itemName}</p>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter username"
              autoFocus
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter password"
            />
          </div>

          {error && (
            <div className="bg-destructive/20 border border-destructive/50 rounded-lg p-3">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* <div className="bg-muted/50 border border-border rounded-lg p-3">
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-primary">Demo credentials:</span><br />
              Username: admin<br />
              Password: admin123
            </p>
          </div> */}

          <div className="flex space-x-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 bg-muted hover:bg-muted/80 border border-border text-foreground rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground font-medium rounded-lg transition-all shadow-lg"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
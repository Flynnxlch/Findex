import { Eye, EyeOff, Lock, User, ArrowLeft, Send, Key, Mail } from 'lucide-react';
import React, { useState } from 'react';

const ForgotPasswordModal = ({ onClose, onBack }) => {
  const [forgotPasswordMethod, setForgotPasswordMethod] = useState('email');
  const [showNewPasswordFields, setShowNewPasswordFields] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  
  const [formData, setFormData] = useState({
    forgotUsername: '',
    forgotEmail: '',
    forgotCode: '',
    forgotOldPassword: '',
    forgotNewPassword: '',
    forgotConfirmNewPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    
    // If old password is filled, show new password fields
    if (e.target.name === 'forgotOldPassword' && e.target.value.length > 0) {
      setShowNewPasswordFields(true);
    }
  };

  const handleSendCode = (e) => {
    e.preventDefault();
    // Simulate sending code
    setCodeSent(true);
    setTimeout(() => {
      setCodeSent(false);
    }, 5000);
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    // Simulate password change
    setTimeout(() => {
      onBack();
      setShowNewPasswordFields(false);
      setForgotPasswordMethod('email');
      setCodeSent(false);
      setFormData({
        forgotUsername: '',
        forgotEmail: '',
        forgotCode: '',
        forgotOldPassword: '',
        forgotNewPassword: '',
        forgotConfirmNewPassword: '',
      });
    }, 1000);
  };

  return (
    <>
      {/* Forgot Password Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-[60]"
        onClick={onBack}
      />

      {/* Forgot Password Modal */}
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
        <div 
          className="bg-surface-dark border border-border-dark rounded-xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-text hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Login
          </button>

          <h2 className="text-2xl font-bold text-white mb-2">Reset Password</h2>
          <p className="text-muted-text mb-6">Enter your username to reset your password</p>

          <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-muted-text mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-text" />
                <input
                  type="text"
                  name="forgotUsername"
                  value={formData.forgotUsername}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-background-dark border border-border-dark rounded-lg text-white placeholder:text-muted-text focus:outline-none focus:border-primary transition-colors"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            {/* Method Selection */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => {
                  setForgotPasswordMethod('email');
                  setShowNewPasswordFields(false);
                  setCodeSent(false);
                }}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold text-sm transition-all ${
                  forgotPasswordMethod === 'email'
                    ? 'bg-primary text-background-dark'
                    : 'bg-surface-dark text-muted-text hover:text-white'
                }`}
              >
                <Mail className="w-4 h-4 inline mr-2" />
                Email Code
              </button>
              <button
                type="button"
                onClick={() => {
                  setForgotPasswordMethod('password');
                  setShowNewPasswordFields(false);
                  setCodeSent(false);
                }}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold text-sm transition-all ${
                  forgotPasswordMethod === 'password'
                    ? 'bg-primary text-background-dark'
                    : 'bg-surface-dark text-muted-text hover:text-white'
                }`}
              >
                <Key className="w-4 h-4 inline mr-2" />
                Old Password
              </button>
            </div>

            {forgotPasswordMethod === 'email' ? (
              <>
                <div>
                  <label className="block text-sm font-semibold text-muted-text mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-text" />
                    <input
                      type="email"
                      name="forgotEmail"
                      value={formData.forgotEmail}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-24 py-3 bg-background-dark border border-border-dark rounded-lg text-white placeholder:text-muted-text focus:outline-none focus:border-primary transition-colors"
                      placeholder="Enter your email"
                    />
                    <button
                      type="button"
                      onClick={handleSendCode}
                      className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-primary hover:bg-primary-hover text-background-dark text-xs font-semibold rounded-lg transition-colors"
                    >
                      Send code
                    </button>
                  </div>
                </div>

                {codeSent && (
                  <p className="text-xs text-primary">
                    A verification code has been sent to your email
                  </p>
                )}

                {codeSent && (
                  <div>
                    <label className="block text-sm font-semibold text-muted-text mb-2">
                      Verification Code
                    </label>
                    <div className="relative">
                      <Send className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-text" />
                      <input
                        type="text"
                        name="forgotCode"
                        value={formData.forgotCode}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-background-dark border border-border-dark rounded-lg text-white placeholder:text-muted-text focus:outline-none focus:border-primary transition-colors"
                        placeholder="Enter code from email"
                      />
                    </div>
                  </div>
                )}

                {formData.forgotCode && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-muted-text mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-text" />
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          name="forgotNewPassword"
                          value={formData.forgotNewPassword}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-12 py-3 bg-background-dark border border-border-dark rounded-lg text-white placeholder:text-muted-text focus:outline-none focus:border-primary transition-colors"
                          placeholder="Enter new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-text hover:text-white transition-colors"
                        >
                          {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-muted-text mb-2">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-text" />
                        <input
                          type={showConfirmNewPassword ? 'text' : 'password'}
                          name="forgotConfirmNewPassword"
                          value={formData.forgotConfirmNewPassword}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-12 py-3 bg-background-dark border border-border-dark rounded-lg text-white placeholder:text-muted-text focus:outline-none focus:border-primary transition-colors"
                          placeholder="Confirm new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-text hover:text-white transition-colors"
                        >
                          {showConfirmNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-semibold text-muted-text mb-2">
                    Old Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-text" />
                    <input
                      type="password"
                      name="forgotOldPassword"
                      value={formData.forgotOldPassword}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-background-dark border border-border-dark rounded-lg text-white placeholder:text-muted-text focus:outline-none focus:border-primary transition-colors"
                      placeholder="Enter your old password"
                    />
                  </div>
                </div>
                {showNewPasswordFields && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-muted-text mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-text" />
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          name="forgotNewPassword"
                          value={formData.forgotNewPassword}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-12 py-3 bg-background-dark border border-border-dark rounded-lg text-white placeholder:text-muted-text focus:outline-none focus:border-primary transition-colors"
                          placeholder="Enter new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-text hover:text-white transition-colors"
                        >
                          {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-muted-text mb-2">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-text" />
                        <input
                          type={showConfirmNewPassword ? 'text' : 'password'}
                          name="forgotConfirmNewPassword"
                          value={formData.forgotConfirmNewPassword}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-12 py-3 bg-background-dark border border-border-dark rounded-lg text-white placeholder:text-muted-text focus:outline-none focus:border-primary transition-colors"
                          placeholder="Confirm new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-text hover:text-white transition-colors"
                        >
                          {showConfirmNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-primary hover:bg-primary-hover text-background-dark font-bold rounded-lg transition-all shadow-neon-sm"
            >
              Change My Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordModal;


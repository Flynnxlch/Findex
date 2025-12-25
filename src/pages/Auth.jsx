import { X } from 'lucide-react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GraphCarousel from '../components/GraphCarousel.jsx';
import LoginForm from '../components/LoginForm.jsx';
import RegisterForm from '../components/RegisterForm.jsx';
import ForgotPasswordModal from '../components/ForgotPasswordModal.jsx';

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = React.useState(true);
  const [showForgotPassword, setShowForgotPassword] = React.useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleLogin = (formData) => {
    console.log('Login', formData);
    // Handle login logic here
  };

  const handleRegister = (formData) => {
    console.log('Register', formData);
    // Handle register logic here
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
        onClick={handleClose}
      />

      {/* Auth Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="bg-background-dark border border-border-dark rounded-2xl overflow-hidden w-full max-w-6xl max-h-[90vh] flex flex-col lg:flex-row shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Left Side - Graph Carousel */}
          <div className="hidden lg:flex lg:w-1/2 relative min-h-[500px]">
            <GraphCarousel />
          </div>

          {/* Right Side - Auth Form */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8 overflow-y-auto relative">
            {/* Close Button - Inside logging section */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-surface-dark border border-border-dark text-muted-text hover:text-white hover:bg-surface-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full max-w-md">
              {!showForgotPassword ? (
                <>
                  {/* Toggle between Login and Register */}
                  <div className="flex gap-4 mb-8">
                    <button
                      onClick={() => setIsLogin(true)}
                      className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                        isLogin
                          ? 'bg-primary text-background-dark'
                          : 'bg-surface-dark text-muted-text hover:text-white'
                      }`}
                    >
                      Login
                    </button>
                    <button
                      onClick={() => setIsLogin(false)}
                      className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                        !isLogin
                          ? 'bg-primary text-background-dark'
                          : 'bg-surface-dark text-muted-text hover:text-white'
                      }`}
                    >
                      Register
                    </button>
                  </div>

                  {/* Form */}
                  {isLogin ? (
                    <LoginForm 
                      onForgotPassword={() => setShowForgotPassword(true)}
                      onSubmit={handleLogin}
                    />
                  ) : (
                    <RegisterForm onSubmit={handleRegister} />
                  )}
                </>
              ) : (
                <ForgotPasswordModal
                  onClose={handleClose}
                  onBack={() => setShowForgotPassword(false)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;

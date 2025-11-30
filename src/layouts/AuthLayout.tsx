import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../components/header/Logo';
import { GoogleIcon } from '../assets/Svgs';

export default function AuthLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname.includes('login');

  return (
    <div className="grid h-dvh place-items-center overflow-y-auto p-4 pt-16 pb-26">
      <div className="fixed top-4 left-4">
        <Logo onClick={() => navigate('/')} />
      </div>

      <div className="w-full max-w-[350px] md:max-w-[400px]">
        <Outlet />
        <div className="mt-2 grid gap-2">
          <span className="text-center">or</span>
          <button className="keyboard-focus-effect bg-code-900 text-code-50 flex h-10 items-center justify-center gap-1 rounded-full tracking-wide">
            <GoogleIcon size="20" />
            <span>Continue with google</span>
          </button>
        </div>

        <div className="mt-4 flex items-center justify-center gap-1 text-sm">
          <span>
            {isLoginPage
              ? "Don't have an account?"
              : 'Already have an account?'}
          </span>
          <Link
            className="text-blue-500 underline-offset-1 pointer-fine:hover:underline pointer-fine:hover:underline-offset-6 transition-[text-underline-offset]"
            to={isLoginPage ? '/auth/signup' : '/auth/login'}
            children={isLoginPage ? 'Signup' : 'Login'}
          />
        </div>
      </div>
    </div>
  );
}

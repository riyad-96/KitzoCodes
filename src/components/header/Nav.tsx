import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { ProfilePlaceholderSvg } from '../../assets/Svgs';
import { motion } from 'motion/react';
import { useEffect } from 'react';

export default function Nav() {
  const { user } = useAuthContext();

  useEffect(() => {
    document.addEventListener('click', (e) => {
      console.log(e.target);
    });
  }, []);

  return (
    <nav>
      {user ? (
        <div>
          <div className="relative">
            <div className="relative size-8 overflow-hidden rounded-full">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName as string} />
              ) : (
                <span className="text-code-800 grid size-full">
                  <ProfilePlaceholderSvg className="size-full" />
                </span>
              )}
              <button className="absolute inset-0 z-1"></button>
            </div>

            <motion.div></motion.div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-1">
          <Link
            className="rounded-full px-3 py-1 text-sm font-medium underline active:transform-[scale(0.96)]"
            to="/auth/login"
          >
            Login
          </Link>
          <Link
            className="bg-code-50 border-code-100 inset-shadow-code rounded-full border px-3 py-1 text-sm font-medium shadow-xs inset-shadow-2xs active:transform-[scale(0.96)]"
            to="/auth/signup"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}

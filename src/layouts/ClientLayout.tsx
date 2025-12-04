import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

export default function ClientLayout() {
  return (
    <div className="scroller-element grid h-full grid-rows-[auto_1fr_auto] overflow-y-auto px-2 md:px-3">
      <Header />

      <main className="mx-auto w-full max-w-[1300px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

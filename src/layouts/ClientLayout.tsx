import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

export default function ClientLayout() {
  return (
    <div className="scroller-element h-full overflow-y-auto px-2 md:px-3">
      <div className="mx-auto h-full max-w-[1300px]">
        <Header />
        <div className="grid h-full grid-rows-[1fr_auto] pt-20">
          <div>
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

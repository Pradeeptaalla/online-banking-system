import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

const VisitorsLayout = () => {
  return (
    <div className="container">
      <Header />
      <main className="flex-grow mt-20 pl-40">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default VisitorsLayout;

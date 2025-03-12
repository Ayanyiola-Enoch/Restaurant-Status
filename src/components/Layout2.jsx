import './index.css'
import { Route, Link, Routes } from 'react-router-dom';
import { isOpenThisSunday, getNextSundayDate, formatDate } from "../src/lib/utils"
import Welcome from './components/welcome';

const isCurrentlyOpen = () => {
  const now = new Date();
  const day = now.getDay(); // 0 is Sunday, 1 is Monday, etc.
  const hours = now.getHours();

  // Check if it's Sunday
  if (day === 0) {
    const isSundayOpen = isOpenThisSunday();
    if (!isSundayOpen) {
      return { isOpen: false, message: "We're closed on Sundays this week" };
    }
    // Check Sunday hours
    return hours >= 8 && hours < 20
      ? { isOpen: true, message: "We're open today until 8:00 PM" }
      : { isOpen: false, message: "We're closed now. Opening hours: 8:00 AM - 8:00 PM" };
  }
  
  // Weekday logic
  return hours >= 8 && hours < 20
    ? { isOpen: true, message: "We're open today until 8:00 PM" }
    : { isOpen: false, message: "We're closed now. Opening hours: 8:00 AM - 8:00 PM" };
};

function Layout2() {
  const nextSunday = getNextSundayDate();
  const isOpen = isOpenThisSunday();
  const currentStatus = isCurrentlyOpen();

  return (
    <>
      {/* LOGO */}
      <div className='p-5 font-bold border-b-2 text-white flex justify-between h-16.5 bg-gradient-to-r from-purple-500 to-pink-500 items-center'>
        <img src='/food-png.png' alt='logo' className='h-10' />
        <Link to="/welcome" className='hover:border-b-2 cursor-pointer text-white'>G&G Restaurant</Link>
      </div>

      {/* BODY */}
      <div className='relative h-screen flex justify-center items-center overflow-hidden'>
        {/* Faded Background */}
        <div className='absolute inset-0 bg-[url(/food.jpg)] bg-cover bg-center opacity-30 backdrop-blur-md'></div>

        {/* Content Section */}
        <div className='relative flex flex-col md:flex-row justify-center items-center gap-5 p-5 h-80 w-full max-w-4xl'>
          <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${currentStatus.isOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {currentStatus.isOpen ? "Open Now" : "Closed Now"}
          </div>
          <p className="mt-2">{currentStatus.message}</p>
        </div>

        {/* Information Box */}
        <div className='p-8 shadow-xl bg-white rounded-lg relative z-10 flex-1 flex flex-col justify-center h-full'>
          <h1 className='font-bold'>Opening Hours</h1>
          <p className="mb-2">
            Next Sunday ({formatDate(nextSunday)}): <span className="font-bold">{isOpen ? "Open" : "Closed"}</span>
          </p>
          <h3 className="font-semibold mb-2">Regular Hours</h3>
          <p>Monday - Saturday: 8:00 AM - 8:00 PM</p>
          <p className="mb-2">
            Next Sunday ({formatDate(nextSunday)}): <span className="font-bold">{isOpen ? "Open" : "Closed"}</span>
          </p>
          <p>
            We alternate our Sunday openings. We're {isOpen ? "open" : "closed"} on {formatDate(nextSunday)},
            and we'll be {!isOpen ? "open" : "closed"} the following Sunday.
          </p>
          <p className="mt-2">Our Sunday hours when open: 8:00 AM - 8:00 PM</p>
        </div>
      </div>

      <Routes>
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </>
  );
}

export const revalidate = 86400; // revalidate every 24 hours

export default Layout2;
import './index.css';
import { Route, Link, Routes } from 'react-router-dom';
import { isOpenThisSunday, getNextSundayDate, formatDate } from "../src/lib/utils"
import Welcome from './components/welcome';

function App() {
  const nextSunday = getNextSundayDate();
  const isOpen = isOpenThisSunday();

  function isCurrentlyOpen() {
    const now = new Date();
    const day = now.getDay();
    const hours = now.getHours();

    if (day === 0) {
      const isSundayOpen = isOpenThisSunday();
      if (!isSundayOpen) {
        return { isOpen: false, message: "We're closed on Sundays this week" };
      }
      return hours >= 8 && hours < 20
        ? { isOpen: true, message: "Closing Time: 8:00 PM Today" }
        : { isOpen: false, message: "We're closed now. Opening hours: 8:00 AM - 8:00 PM" };
    }

    return hours >= 8 && hours < 20
      ? { isOpen: true, message: "Closing Time: 8:00 PM Today" }
      : { isOpen: false, message: "We're closed now. Opening hours: 8:00 AM - 8:00 PM" };
  }

  const currentStatus = isCurrentlyOpen();

  return (
    <>
      {/* LOGO */}
      <div className='p-5 font-bold border-b-2 text-white flex justify-between h-16.5 bg-gradient-to-r from-purple-500 to-pink-500 items-center fixed top-0 w-full z-50'>
        <img src='/food-png.png' alt='logo' className='h-10' />
        <p className='hover:border-b-2 cursor-pointer text-white'>G&G Restaurant</p>
      </div>

      {/* MAIN CONTENT */}
      <div className='bg-[url(/food.jpg)] bg-cover bg-center px-2 pt-20 pb-14 min-h-screen 
  sm:fixed sm:inset-0 sm:flex sm:flex-col sm:justify-center sm:items-center'>
        <div className='absolute h-145 inset-0 bg-black lg:h-full opacity-30'></div>

        <div className='relative flex flex-col md:flex-row justify-center items-center gap-6 p-5 w-full max-w-4xl'>
          <div className='p-8 shadow-xl min-h-[200px]  bg-white rounded-lg relative z-10 flex-1 flex flex-col justify-center'>
            <div className={`px-2 py-1 text-center rounded-full text-2xl font-medium ${currentStatus.isOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
              {currentStatus.isOpen ? "Open Now" : "Closed Now"}
            </div>
            <p className="mt-2 text-center text-sm">{currentStatus.message}</p>
          </div>

          <div className='p-8 shadow-xl bg-white sm:mb rounded-lg relative z-10 flex-1 flex flex-col justify-center'>
            <h3 className="font-semibold mb-2 text-center text-xl">Regular Hours</h3>
            <hr className="my-2 border-t border-gray-700 " />
            <p className=' text-base'>Monday - Saturday: 8:00 AM - 8:00 PM</p>
            <hr className="my-2 border-t border-gray-300" />
            <p className="mb-2 text-base">
              Next Sunday ({formatDate(nextSunday)}): {isOpen ? "Open" : "Closed"}
              <hr className="my-2 border-t border-gray-300" />
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <div className='mt-8 w-full bg-white px-3 py-2 text-center shadow-xl rounded-lg sm:fixed sm:bottom-0 sm:top-140'>
        {/* /* add a note text that aligns */}
          <h1 className='font-bold text-lg text-red-800 underline mb'>Note</h1>
          <p className='text-sm mt-0.7 text-wrap'>
            We alternate our Sunday openings. We'll be {isOpen ? "opened" : "closed"} on {formatDate(nextSunday)},
            and we'll be {!isOpen ? "opened" : "closed"} the following Sunday.
          </p>
          <span className='font-bold text-lg text-red-800'>Contact Us: </span>
          <a href="tel:+2348069215338" className="text-sm mt-0.7 hover:underline text-wrap ">
            0806-9215-338
          </a>
        </div>
      </div>

      <Routes>
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </>
  )
}

export const revalidate = 86400

export default App;

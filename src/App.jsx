import './index.css'
import { Route, Link ,Routes} from 'react-router-dom';
import { isOpenThisSunday, getNextSundayDate, formatDate } from "../src/lib/utils"

function App() {
  const nextSunday = getNextSundayDate();
  const isOpen = isOpenThisSunday();

  return (
    <>
      {/* LOGO */}
      <div className='p-5 font-bold border-b-2 text-white flex justify-between h-16.5 bg-gradient-to-r from-purple-500 to-pink-500 items-center' >

        <img src='/food-png.png' alt='logo' className='h-10' />
        <Link to="/welcome" className='hover:border-b-2 cursor-pointer text-white'>G&G Restaurant</Link>        

      
      </div>

      {/* BODY */}
      <div className='relative h-screen'>
        {/* Faded Background */}
        <div className='absolute inset-0 bg-[url(/food.jpg)] bg-cover bg-center opacity-30 backdrop-blur-md'></div>

        {/* Content with Clipped Shadow Boxes */}
        <div className='relative flex justify-center items-center h-full gap-5 p-5'>
          <div className='p-8 shadow-xl bg-white rounded-lg relative z-10'>
            <h1 className='font-bold'>Opening Hours</h1>
            <p className="mb-2">
              Next Sunday ({formatDate(nextSunday)}): <span className="font-bold">{isOpen ? "Open" : "Closed"}</span>
            </p>
            <p>
              We alternate our Sunday openings. We're {isOpen ? "open" : "closed"} on {formatDate(nextSunday)},
              and we'll be {!isOpen ? "open" : "closed"} the following Sunday.
            </p>
            <p className="mt-2">Our Sunday hours when open: 8:00 AM - 8:00 PM</p>
          </div>

          <div className='p-8 shadow-xl bg-white rounded-lg relative z-10'>
            <div className="">
              <h3 className="font-semibold mb-2">Regular Hours</h3>
              <p>Monday - Saturday: 8:00 AM - 8:00 PM</p>
              <p className="mb-2">
                Next Sunday ({formatDate(nextSunday)}):{" "}
                <span className="font-bold">{isOpen ? "Open" : "Closed"}</span>
              </p>
              <p>
                We alternate our Sunday openings. We're {isOpen ? "open" : "closed"} on {formatDate(nextSunday)},
                and we'll be {!isOpen ? "open" : "closed"} the following Sunday.
              </p>
              <p className="mt-2">Our Sunday hours when open: 8:00 AM - 8:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      <Routes>
        <Route path ="/welcome" element={<welcome />} />
      </Routes>
    </>
  )
}

export const revalidate = 86400 // revalidate every 24 hours

export default App;
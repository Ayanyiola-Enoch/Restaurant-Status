import './index.css'
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
      <div className='fixed inset-0 flex flex-col justify-center items-center bg-cover bg-center bg-[url(/food.jpg)]'>
        <div className='absolute inset-0 bg-black opacity-30'></div>

        <div className='relative flex flex-col md:flex-row justify-center items-center gap-6 p-5 w-full max-w-4xl'>
          <div className='p-8 shadow-xl min-h-[200px]  bg-white rounded-lg relative z-10 flex-1 flex flex-col justify-center'>
            <div className={`px-2 py-1 text-center rounded-full text-2xl   font-medium ${currentStatus.isOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
              {currentStatus.isOpen ? "Open Now" : "Closed Now"}
            </div>
            <p className="mt-2 text-center text-sm">{currentStatus.message}</p>
          </div>

          <div className='p-8 shadow-xl bg-white rounded-lg relative z-10 flex-1 flex flex-col justify-center'>
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
        <div className=' absolute bottom-0 w-full bg-white px-3 py-0.5 text-center shadow-xl rounded-lg'>
          {/* /* add a note text that aligns */ }
          <h1 className='font-bold text-lg text-red-800 underline mb'>Note</h1>
          <p className='text-sm mt-0.7 text-wrap '>
            We alternate our Sunday openings. We're {isOpen ? "open" : "closed"} on {formatDate(nextSunday)},
            and we'll be {!isOpen ? "open" : "closed"} the following Sunday.
          </p>
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
// import { Route, Link, Routes } from 'react-router-dom';
// import { isOpenThisSunday, getNextSundayDate, formatDate } from "../src/lib/utils"

// function App() {
//   const nextSunday = getNextSundayDate();
//   const isOpen = isOpenThisSunday();

//   function isCurrentlyOpen() {
//     const now = new Date();
//     const day = now.getDay(); // 0 is Sunday, 1 is Monday, etc.
//     const hours = now.getHours();

//     // Check if it's Sunday
//     if (day === 0) {
//       const isSundayOpen = isOpenThisSunday();
//       if (!isSundayOpen) {
//         return { isOpen: false, message: "We're closed on Sundays this week" };
//       }
//       // Check Sunday hours (same as weekdays if open)
//       return hours >= 8 && hours < 20
//         ? { isOpen: true, message: "Closing Time: 8:00 PM Today" }
//         : { isOpen: false, message: "We're closed now. Opening hours: 8:00 AM - 8:00 PM" };
//     }

//     // Default return when it's not Sunday
//     return hours >= 8 && hours < 20
//       ? { isOpen: true, message: "Closing Time: 8:00 PM Today" }
//       : { isOpen: false, message: "We're closed now. Opening hours: 8:00 AM - 8:00 PM" };
//   }

//   const currentStatus = isCurrentlyOpen();

//   return (
//     <>
//       {/* LOGO */}
//       <div className='p-5 font-bold border-b-2 text-white flex justify-between h-16.5 bg-gradient-to-r from-purple-500 to-pink-500 items-center'>
//         <img src='/food-png.png' alt='logo' className='h-10' />
//         <Link to="/welcome" className='hover:border-b-2 cursor-pointer text-white'>G&G Restaurant</Link>
//       </div>

//       {/* BODY */}
//       <div className='relative h-screen flex justify-center items-center overflow-hidden'>
//         {/* Faded Background */}
//         <div className='absolute inset-0 bg-[url(/food.jpg)] bg-cover bg-center opacity-30 backdrop-blur-md'></div>

//         {/* Content with Clipped Shadow Boxes */}
//         <div className='relative flex flex-col md:flex-row justify-center items-center gap-6 p-5 h-80 w-full max-w-4xl'>
//           <div className='relative flex flex-col md:flex-row justify-center items-center gap-5 p-5 h-80 w-30 max-w-4xl'>
//           </div>

//           <div className='p-8 shadow-xl bg-white rounded-lg relative z-10 flex-1 flex flex-col justify-center h-full'>
//             <div className={` px-2 items-center py-1 text-center rounded-full text-sm font-medium ${currentStatus.isOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
//             >
//               {currentStatus.isOpen ? "Open Now" : "Closed Now"}
//             </div>

//             <p className="mt-2 text-center items-center justify-center">{currentStatus.message}</p>
//             {/* <h1 className='font-bold'>Opening Hours</h1>
//             <p className="mb-2">
//               Next Sunday ({formatDate(nextSunday)}): <span className="font-bold">{isOpen ? "Open" : "Closed"}</span>
//             </p> */}

//           </div>

//           <div className='p-8 shadow-xl bg-white rounded-lg relative z-10 flex-1 flex flex-col justify-center h-full'>
//             <h3 className="font-semibold mb-2 text-center">Regular Hours</h3>
//             <hr className="my-2 px-0 border-t border-gray-700" />
//             <p>Monday - Saturday: 8:00 AM - 8:00 PM</p>
//             <hr className="my-2 border-t border-gray-300" />
//             <p className="mb-2">
//               Next Sunday ({formatDate(nextSunday)}):

//               <hr className="my-2 border-t border-gray-300" />
//             </p>

//           </div>
//         </div>

//       </div>
//         <div className='p-6 text-center shadow-xl bg-white rounded-lg relative z-10 grid-cols flex flex-col justify-center h-20'>
//           <p>
//             We alternate our Sunday openings. We're {isOpen ? "open" : "closed"} on {formatDate(nextSunday)},
//             and we'll be {!isOpen ? "open" : "closed"} the following Sunday.
//           </p>
//         </div>

//       <Routes>
//         <Route path="/welcome" element={<welcome />} />
//       </Routes>
//     </>
//   )
// }

// export const revalidate = 86400 // revalidate every 24 hours

// export default App;









import "./index.css"
import { Route, Routes } from "react-router-dom"
import { isOpenThisSunday, getNextSundayDate, formatDate } from "../src/lib/utils"
import Welcome from "./components/welcome"
import { Phone, MapPin, Mail } from "lucide-react"

function App() {
  const nextSunday = getNextSundayDate()
  const isOpen = isOpenThisSunday()

  function isCurrentlyOpen() {
    const now = new Date()
    const day = now.getDay()
    const hours = now.getHours()

    if (day === 0) {
      const isSundayOpen = isOpenThisSunday()
      if (!isSundayOpen) {
        return { isOpen: false, message: "We're closed on Sundays this week" }
      }
      return hours >= 8 && hours < 20
        ? { isOpen: true, message: "Closing Time: 8:00 PM Today" }
        : { isOpen: false, message: "We're closed now. Opening hours: 8:00 AM - 8:00 PM" }
    }

    return hours >= 8 && hours < 20
      ? { isOpen: true, message: "Closing Time: 8:00 PM Today" }
      : { isOpen: false, message: "We're closed now. Opening hours: 8:00 AM - 8:00 PM" }
  }

  const currentStatus = isCurrentlyOpen()

  return (
    <div className="min-h-screen flex flex-col">
      {/* LOGO */}
      <div className="p-5 font-bold border-b-2 text-white flex justify-between h-16.5 bg-gradient-to-r from-purple-500 to-pink-500 items-center fixed top-0 w-full z-50">
        <img src="/food-png.png" alt="logo" className="h-10" />
        <div className="flex items-center gap-4">
          <p className="hover:border-b-2 cursor-pointer text-white">G&G Restaurant</p>
          <a href="tel:+15551234567" className="flex items-center gap-1 hover:border-b-2 cursor-pointer text-white">
            <Phone size={16} />
            <span className="hidden md:inline">555-123-4567</span>
          </a>
        </div>
      </div>

      {/* MAIN CONTENT - Changed from fixed to allow scrolling */}
      <div className="flex-1 flex flex-col items-center pt-16.5 bg-cover bg-center bg-[url(/food.jpg)] overflow-y-auto">
        <div className="absolute inset-0 bg-black opacity-30 pt-16.5 z-0"></div>

        {/* Content container with padding for scrolling */}
        <div className="relative z-10 w-full max-w-4xl px-4 py-8 flex flex-col items-center">
          {/* Status and Hours Cards */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 w-full mb-6">
            <div className="p-8 shadow-xl min-h-[200px] bg-white rounded-lg flex-1 flex flex-col justify-center w-full">
              <div
                className={`px-2 py-1 text-center rounded-full text-2xl font-medium ${currentStatus.isOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
              >
                {currentStatus.isOpen ? "Open Now" : "Closed Now"}
              </div>
              <p className="mt-2 text-center text-sm">{currentStatus.message}</p>
            </div>

            <div className="p-8 shadow-xl bg-white rounded-lg flex-1 flex flex-col justify-center w-full">
              <h3 className="font-semibold mb-2 text-center text-xl">Regular Hours</h3>
              <hr className="my-2 border-t border-gray-700 " />
              <p className="text-base">Monday - Saturday: 8:00 AM - 8:00 PM</p>
              <hr className="my-2 border-t border-gray-300" />
              <p className="mb-2 text-base">
                Next Sunday ({formatDate(nextSunday)}): {isOpen ? "Open" : "Closed"}
                <hr className="my-2 border-t border-gray-300" />
              </p>
            </div>
          </div>

          {/* CONTACT SECTION */}
          <div className="p-8 shadow-xl bg-white rounded-lg w-full max-w-md mb-6">
            <h3 className="font-semibold mb-3 text-center text-xl text-purple-700">Contact Us</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="bg-pink-100 p-2 rounded-full">
                  <Phone className="text-pink-600" size={20} />
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <a href="tel:+2348069215338" className="text-purple-600 hover:underline">
                  0806-9215-338
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <MapPin className="text-purple-600" size={20} />
                </div>
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-gray-600">123 Delicious Street, Foodville</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-pink-100 p-2 rounded-full">
                  <Mail className="text-pink-600" size={20} />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <a href="mailto:info@ggrestaurant.com" className="text-purple-600 hover:underline">
                    info@ggrestaurant.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER - No longer absolutely positioned */}
          <div className="w-full bg-white px-3 py-3 text-center shadow-xl rounded-lg mb-4">
            <h1 className="font-bold text-lg text-red-800 underline mb">Note</h1>
            <p className="text-sm mt-0.7 text-wrap">
              We alternate our Sunday openings. We'll be {isOpen ? "opened" : "closed"} on {formatDate(nextSunday)}, and
              we'll be {!isOpen ? "opened" : "closed"} the following Sunday.
            </p>
          </div>
        </div>
      </div>

      {/* <Routes>
        <Route path="/welcome" element={<Welcome />} />
      </Routes> */}
    </div>
  )
}

export const revalidate = 86400

export default App











// import './index.css'
// import { Route, Link, Routes } from 'react-router-dom';
// import { isOpenThisSunday, getNextSundayDate, formatDate } from "../src/lib/utils"
// import Welcome from './components/welcome';

// function App() {
//   const nextSunday = getNextSundayDate();
//   const isOpen = isOpenThisSunday();

//   function isCurrentlyOpen() {
//     const now = new Date();
//     const day = now.getDay();
//     const hours = now.getHours();

//     if (day === 0) {
//       const isSundayOpen = isOpenThisSunday();
//       if (!isSundayOpen) {
//         return { isOpen: false, message: "We're closed on Sundays this week" };
//       }
//       return hours >= 8 && hours < 20
//         ? { isOpen: true, message: "Closing Time: 8:00 PM Today" }
//         : { isOpen: false, message: "We're closed now. Opening hours: 8:00 AM - 8:00 PM" };
//     }

//     return hours >= 8 && hours < 20
//       ? { isOpen: true, message: "Closing Time: 8:00 PM Today" }
//       : { isOpen: false, message: "We're closed now. Opening hours: 8:00 AM - 8:00 PM" };
//   }

//   const currentStatus = isCurrentlyOpen();

//   return (
//     <>
//       {/* LOGO */}
//       <div className='p-5 font-bold border-b-2 text-white flex justify-between h-16.5 bg-gradient-to-r from-purple-500 to-pink-500 items-center fixed top-0 w-full z-50'>
//         <img src='/food-png.png' alt='logo' className='h-10' />
//         <p className='hover:border-b-2 cursor-pointer text-white'>G&G Restaurant</p>
//       </div>

//       {/* MAIN CONTENT */}
//       <div className='fixed inset-0 flex flex-col justify-center items-center bg-cover bg-center bg-[url(/food.jpg)]'>
//         <div className='absolute inset-0 bg-black opacity-30'></div>

//         <div className='relative flex flex-col md:flex-row justify-center items-center gap-6 p-5 w-full max-w-4xl'>
//           <div className='p-8 shadow-xl min-h-[200px]  bg-white rounded-lg relative z-10 flex-1 flex flex-col justify-center'>
//             <div className={`px-2 py-1 text-center rounded-full text-2xl   font-medium ${currentStatus.isOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
//               {currentStatus.isOpen ? "Open Now" : "Closed Now"}
//             </div>
//             <p className="mt-2 text-center text-sm">{currentStatus.message}</p>
//           </div>

//           <div className='p-8 shadow-xl bg-white rounded-lg relative z-10 flex-1 flex flex-col justify-center'>
//             <h3 className="font-semibold mb-2 text-center text-xl">Regular Hours</h3>
//             <hr className="my-2 border-t border-gray-700 " />
//             <p className=' text-base'>Monday - Saturday: 8:00 AM - 8:00 PM</p>
//             <hr className="my-2 border-t border-gray-300" />
//             <p className="mb-2 text-base">
//               Next Sunday ({formatDate(nextSunday)}): {isOpen ? "Open" : "Closed"}
//               <hr className="my-2 border-t border-gray-300" />
//             </p>
//           </div>
//         </div>

//         {/* FOOTER */}
//         <div className=' absolute bottom-0 w-full bg-white px-3 py-0.5 text-center shadow-xl rounded-lg'>
//           {/* /* add a note text that aligns */ }
//           <h1 className='font-bold text-lg text-red-800 underline mb'>Note</h1>
//           <p className='text-sm mt-0.7 text-wrap '>
//             We alternate our Sunday openings. We'll be {isOpen ? "opened" : "closed"} on {formatDate(nextSunday)},
//             and we'll be {!isOpen ? "opened" : "closed"} the following Sunday.
//           </p>
//         </div>
//       </div>

//       <Routes>
//         <Route path="/welcome" element={<Welcome />} />
//       </Routes>
//     </>
//   )
// }

// export const revalidate = 86400

// export default App;

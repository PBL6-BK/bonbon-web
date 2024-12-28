import { useState } from 'react'
import { ReactWithChild } from 'src/interface/app'

export default function AuthLayout({ children }: ReactWithChild) {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  return (
    <div className='flex h-screen flex-col'>
      <nav className='flex items-center justify-between bg-gray-800 p-4 text-white'>
        <div className='relative'>
          <button onClick={toggleDropdown} className='text-lg font-bold'>
            Logo
          </button>
          {dropdownOpen && (
            <div className='absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg'>
              <button className='block w-full px-4 py-2 text-left text-gray-800 hover:bg-[#e6f4ff]'>Settings</button>
              <button className='block w-full px-4 py-2 text-left text-gray-800 hover:bg-[#e6f4ff]'>Logout</button>
            </div>
          )}
        </div>
      </nav>
      <div className='flex flex-grow flex-col items-center justify-center bg-gray-100'>{children}</div>
    </div>
  )
}

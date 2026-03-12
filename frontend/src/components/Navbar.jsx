import { NavLink } from "react-router"

const Navbar = () => {

const navLinkClass = ({ isActive }) => ` font-bold ${isActive ? "text-black" : "text-zinc-600"}`

  return (
    <>
        <nav className='grid grid-cols-3 bg-amber-100 py-3 font-inter'>
            <NavLink to="/" className='flex justify-start ml-3 font-black'>TempusCura</NavLink>      
              <div className='flex justify-center gap-3'>
                <NavLink to="/avtaler" className={navLinkClass}>Mine Avtaler</NavLink>
                <NavLink to="/timer" className={navLinkClass}>Ledige Timer</NavLink>
              </div>      
              <div className='flex justify-end mr-3 gap-3'>
                <NavLink to="/register" className={navLinkClass}>Registrer</NavLink>
                <NavLink to="/login" className={navLinkClass}>Login</NavLink>
              </div>      
        </nav>
    </>
  )
}

export default Navbar
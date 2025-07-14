import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { Appcontext } from '../context/Appcontext'

const Navbar = () => {

    const {user,setshowLogin} = useContext(Appcontext)
    const navigate = useNavigate()
    return (
        <div className='flex items-center justify-between py-0'>
            <Link to='/'><img src={assets.logo} alt="" className=' w-28 sm:w-32 lg:w-40' /></Link>

            <div>
                {user ?
                    <div className='flex items-center gap-2 sm:gap-3'>
                        <button onClick={()=>navigate('/buycredit')} className='flex items-center gap-2 bg-blue-300 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full hover:scale-105 transition-all duration-700'><img className='w-5' src={assets.credit_star} alt="" /><p className='text-xs sm:text-sm font-medium'>Credit left : 5</p></button>
                        <p className='max-sm:hidden pl-4' >Hi! Nishant</p>
                        <div className='relative group'>
                            <img className='w-10 drop-shadow' src={assets.profile_icon} alt="" />
                            <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-blackr rounded pt-10'>
                                <ul className='list-none m-0 p-2 bg-white rounded-full border text-sm'>
                                    <li className='py-0.5 px-3 cursor-pointer'>Logout</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                    :
                    <div className='flex items-center gap-2 sm:gap-5'>
                        <p onClick={() => navigate('/buycredit')} className='cursor-pointer'>Pricing</p>
                        <button className='px-2 bg-blue-950 text-white py-2 sm:px-10 text-sm rounded-full cursor-pointer' onClick={()=>setshowLogin(true)}>Login</button>
                    </div>
                }
            </div>

        </div>
    )
}

export default Navbar
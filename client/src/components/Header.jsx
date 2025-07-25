import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"
import { Appcontext } from '../context/Appcontext'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const {user,setshowLogin} = useContext(Appcontext)
    const navigate = useNavigate()

    const onClickhandler= ()=>{
        if(user){
            navigate('/result')
        }
        else{
            setshowLogin(true)
        }

    }
    return (
        <motion.div className='flex flex-col justify-center items-center text-center my-7' 
        initial={{opacity:0.2,y:100  }} transition={{duration:1}} whileInView={{opacity:1,y:0}} viewport={{once:true}} >
            <div className='text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-0 rounded-full border border-neutral-500'>
                <p>Best text to image generator</p>
                <img src={assets.star_icon} alt=" " />
            </div>
            <h1 className='text-4xl max-w-[300px] sm:text-7x1 sm:max-W-[590px] mx-auto mt-10 text-center'>Turn text to image, in seconds. </h1>

            <p className='text-center max-w-x1 mx-auto mt-5'>Unleash
                your creativity with AI. Turn your imagination into visual
                art in seconds - just type, and watch the magic happen. </p>

            <button onClick={onClickhandler} className='sm:text-lg text-white bg-black w-automt-8 px-12 py-1.5 m-1 flex items-center gap-2 rounded-full'>
                Generate Images
                <img className="h-6" src={assets.star_group} alt=" " /></button>

            <div className='flex flex-wrap justify-center mt-16 gap-3'>
                {Array(6).fill('').map((item, index) => (
                    <img className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10' src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1} alt=" " key={index} width={70} />
                ))}
            </div>
            <p className='mt-2 text-neutral-600' > Generated images from TEXT2VISION</p>
        </motion.div>

    )
}

export default Header
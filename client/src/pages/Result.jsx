import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Appcontext } from '../context/Appcontext'

const Result = () => {
  const [input,setinput] = useState('')
  const [Image,setImage] = useState(assets.sample_img_1)
  const [isimgloaded,setisimgloaded] = useState(false)
  const [loading,setloading] = useState(false)

  const {generateImage} = useContext(Appcontext)

  const onSubmithandler = async (e) =>{
    e.preventDefault()
    setloading(true)
    if(input){
      const image = await generateImage(input)
      if(image){
        setisimgloaded(true)
        setImage(image)
      }
    }
    setloading(false)

  }


  return (
    <form onSubmit={onSubmithandler} className='flex flex-col min-h-[90vh] justify-center items-center'>
    <div>
      <div className='relative'>
        <img src={Image} alt="" className='max-w-sm rounded'/>
        <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${loading? `w-full transition-all duration-[10s]`: `w-0`}`}></span>

      </div>
      <p className={!loading ? 'hidden' : ''}>loading...</p>
    </div>
{!isimgloaded && 
    <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'>
      <input onChange={e => setinput(e.target.value)} value={input} type="text" placeholder='Describe what you want to generate!!!' className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20' />
      <button type='submit' className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full '>Generate</button>
    </div>}

{isimgloaded && 
    <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full '>
      <p onClick={()=> {setisimgloaded(false)}} className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer'>Generate Another</p>
      <a href={Image} download className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer'>Download</a>
    </div>}

    </form>
  )
}

export default Result
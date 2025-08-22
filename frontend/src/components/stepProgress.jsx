import React from 'react'
import { shimmerStyle } from '../assets/dummystyle'

const stepProgress = ({progress}) => {
  return (
    <>
    <style>{shimmerStyle}</style>
    <div className='relative w-full h-4 bg-white/5 backdrop-blur-2xl overflow-hidden rounded-full
    border border-white/10'>
        <div className='absolute inset-0 bg-gradient-to-r from-violet-500/20 to to-fuchsia-500/20 animate-pulse '/>
          <div className='relative h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-600 animate-flow bg-[length:200%_100%] transition-all duration-700 ease-out rounded-full overflow-hidden 
          animate-pulse-glow' style={{width:`${progress}%`}}>
            <div className='absoulte inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer'/>
            {/* Animated bubbles */}
            <div className='absolute inset-0 opacity-80'>
                {[...Array(8)].map((_,i)=>(
                    <div key={i} className='absolute top-1/2 w-2 h-2 bg-white rounded-full animate-bubble shadow-lg'>
                        style={{
                            left:`${(i+1)*12}`,
                            animationDelay:`${i*0.25}s`,
                            transform:"translateY(-50%)",

                        }}
                    </div>
                ))}
            </div>
            {/* <div className='absoulte inset-0'>
                {[...Array(12)].map((_,i))}
            </div> */}
          </div>
    </div>
      
    </>
  )
}

export default stepProgress

'use client'
import React, { useEffect, useState } from 'react'

export default function Page() {
    const [enterCount, setEnterCount] = useState(0);


    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          setEnterCount((prevCount) => prevCount + 1);
        }
      };
  
      window.addEventListener('keydown', handleKeyDown);
  
      // Cleanup event listener on component unmount
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, []);
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className='text-9xl' >{enterCount}</h1>
        <button onClick={() => {
          setEnterCount(enterCount-1)
        }}>Down</button>
    </div>
  )
}
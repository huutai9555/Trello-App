'use client'
import React from 'react'

type Props = {
    width?: number;
    height?: number;
}

export default function Avatar({width = 40, height = 40}: Props) {
  return (
    <div className={`p-2 bg-gradient-to-r from-sky-500 to-indigo-500 text-xl font-black flex items-center justify-center text-white rounded`} style={{
        width: width,
        height: height
    }}>
        T
    </div>
  )
}
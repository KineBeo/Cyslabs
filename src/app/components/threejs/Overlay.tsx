'use client'

import { FC } from 'react'

export const Overlay: FC = () => {
  return (
    <div className="absolute inset-0 z-20">
      <a href="https://pmnd.rs/" className="absolute bottom-10 left-20 text-sm hover:text-white">
        pmnd.rs
        <br />
        dev collective
      </a>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* <h1 className="m-0 p-0 text-[15em] font-medium tracking-tighter gradient-text">Cyslabs</h1> */}
      </div>
      <div className="absolute top-10 left-10 text-sm">pretty bad —</div>
      <div className="absolute bottom-10 right-10 text-sm">25/02/2022</div>
    </div>
  )
}
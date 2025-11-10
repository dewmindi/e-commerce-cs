import React from 'react'
import ReviewList from './ReviewList'

const GoogleReviews = () => {
  return (
    <section className='py-16 mt-10'>
      <h2 className="flex justify-center items-center text-xl bg-gradient-to-r from-black via-[#bb8d03fc] to-white text-transparent bg-clip-text">
        What our customers say
      </h2>
      {/* <h2 className="text-2xl font-semibold mb-4">What our customers say</h2> */}
      <ReviewList limit={60} />

      <div className="mt-10">
        <a
          href="/reviews"
          className="flex justify-center items-center text-white hover:underline text-lg"
        >
          See all reviews
        </a>
      </div>
    </section>
  )
}

export default GoogleReviews

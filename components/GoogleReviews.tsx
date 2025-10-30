import React from 'react'
import ReviewList from './ReviewList'

const GoogleReviews = () => {
  return (
      <section className='py-16'>
        <h2 className="flex justify-center items-center text-3xl sm:text-4xl font-bold text-[#333333] text-center mb-16 hover:text-[#bb8d03fc]">
              What our customers say  
            </h2>
        {/* <h2 className="text-2xl font-semibold mb-4">What our customers say</h2> */}
        <ReviewList limit={60} />

        <div className="mt-10">
          <a
            href="/reviews"
            className="flex justify-center items-center text-blue-600 hover:underline font-medium"
          >
            See all reviews →
          </a>
        </div>
      </section>
  )
}

export default GoogleReviews

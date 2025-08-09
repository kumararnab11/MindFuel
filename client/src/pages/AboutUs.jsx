import React from 'react'
import HighlightText from '../components/core/Homepage/HighlightText'
import Quote from '../components/core/AboutUs/Quote'
import foundingStory from '../assets/FoundingStory.png'
import LearningGrid from '../components/core/AboutUs/LearningGrid'
import image1 from '../assets/aboutus1.webp'
import image2 from '../assets/aboutus2.webp'
import image3 from '../assets/aboutus3.webp'

const images = [image1, image2, image3];

const data=[
    {
        num:"5K",
        lebel:"Active Students"
    },
    {
        num:"10+",
        lebel:"Mentors"
    },
    {
        num:"200+",
        lebel:"Courses"
    },
    {
        num:"50+",
        lebel:"Awards"
    }
]

function AboutUs() {
  return (
    <div className='flex flex-col items-center '>
        {/* Section-1 */}
        <div className='flex flex-col bg-richblack-700 w-screen items-center relative'>
            <div className='text-richblack-5 max-w-[600px] text-3xl text-center mt-[80px] mb-[15px]'>
                Driving Innovation in Online Education for a 
                <HighlightText text="Brighter Future"/>
            </div>
            <div className='text-richblack-300 max-w-[650px] mb-[200px] text-center'>
                Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
            </div>

            <div className='absolute gap-5 lg:translate-y-[290px] translate-y-[350px] bg-transparent flex flex-row'>
                {images.map((image,index)=>(
                    <div key={index} className='max-w-[300px]'>
                        <img src={image} alt="" />
                    </div>
                ))}
            </div>

        </div>
        {/* Section-2 */}
        <div className='flex flex-col bg-richblack-900 w-screen items-center border-b border-b-richblack-700'>
            <div className='h-[150px]'></div>
            <Quote/>
        </div>
        {/* Section-3 */}
        <div className='bg-richblack-900 mx-[50px] my-[100px] max-w-[1080px]'>
            <div className='flex lg:flex-row flex-col items-center justify-between'>
                <div className='flex flex-col mx-[30px]'>
                    <h1 className='my-[10px] font-bold text-3xl bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-transparent bg-clip-text'>Our Founding Story</h1>
                    <div className=' max-w-[400px] text-richblack-100'>{`Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.

As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.`}</div>
                </div>
                <div className='min-w-[400px]'>
                    <img src={foundingStory} alt="" />
                </div>
            </div>
            <div></div>
        </div>

        <div className='bg-richblack-900 mx-[50px] my-[50px] max-w-[1080px]'>
            <div className='flex lg:flex-row flex-col items-center justify-between'>
                <div className='flex flex-col mx-[30px]'>
                    <h1 className='my-[10px] text-3xl font-bold bg-gradient-to-br from-[#FF512F] to-[#F09819] bg-clip-text text-transparent'>Our Vision</h1>
                    <div className=' max-w-[400px] text-richblack-100'>{`With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.`}</div>
                </div>
                <div className='flex flex-col mx-[30px]'>
                    <div className='my-[10px] text-3xl'><HighlightText text="Our Mission"/></div>
                    <div className=' max-w-[400px] text-richblack-100'>{`Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.`}</div>
                </div>
            </div>
            <div></div>
        </div>

        {/* Section-4 */}

        <div className='w-screen flex lg:flex-row flex-col bg-richblack-700 items-center justify-around'>
            {
                data.map((it, index)=>
                    (
                        <div key={index} className='my-[30px] '>
                            <div className='text-richblack-5 text-3xl text-center font-semibold'>
                                {it.num}
                            </div>
                            <div className='text-richblack-100 text-xl'>
                                {it.lebel}
                            </div>
                        </div>
                    )
                )
            }
        </div>

        {/* Section-5 */}
        <div className='bg-richblack-900 mt-[100px]'>
            <LearningGrid/>
        </div>

        {/* Form Section */}

        <div className='bg-richblack-900 flex flex-col items-center mx-auto'>
            <div className='text-center my-[30px]'>
                <div className='font-bold text-4xl mb-[10px] text-richblack-5'>Get in Touch</div>
                <div className=' text-richblack-100'>We'd love to here for you, Please fill out this form.</div>
            </div>
            <div></div>
        </div>

    </div>
  )
}

export default AboutUs
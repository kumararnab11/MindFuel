import { Link } from "react-router-dom";
import {FaArrowRight} from 'react-icons/fa'
import HighlightText from "../components/core/Homepage/HighlightText";
import CTAButton from "../components/core/Homepage/CTAbutton"
import Banner from '../assets/banner.mp4'
import CodeBlocks from "../components/core/Homepage/CodeBlock";
import TimelineSection from "../components/core/Homepage/TimeLineSection";
import LearningLanguageSection from "../components/core/Homepage/LearningLanguageSection";
import InstructorSection from "../components/core/Homepage/InstructorSection";
import ExploreMore from "../components/core/Homepage/ExploreMore";
import { useSelector } from 'react-redux';

const Home = () => {
    const { user } = useSelector((state) => state.user);

  return (
    <div>
      {/*Section1 */}
      <div className='relative mx-auto flex flex-col w-11/12 items-center text-richblack-200 justify-between max-w-[1080px]'>
        {
            user?.accountType != 'Instructor'
            &&
            (
                <Link to={"/signup"}>
                    <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold transition-all duration-200 hover:scale-95 w-fit'>
                        <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
                        <p>Become an Instructor</p>
                        <FaArrowRight />
                        </div>
                    </div>
                </Link>
            )
        }
        
        <div className='text-center text-4xl font-semibold mt-7'>
            Empower Your Future with
            <HighlightText text={"Coding Skills"} />
        </div>
        <div className='mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
            With our online coding courses, you can learn at your own pace, from anywhere in the world.
        </div>

        <div className='flex flex-row gap-12 mt-8'>
            <CTAButton active={true} linkto={"/signup"}>
                Learn More
            </CTAButton>

            <CTAButton active={false} linkto={"/login"}>
                Book a Demo
            </CTAButton>
        </div>

        <div className='mx-3 my-12 shadow-[10px_-5px_50px_-5px] shadow-blue-200 '>
            <video
                muted
                loop
                autoPlay
                className="shadow-[20px_-20px_50px_rgba(255,255,255,0.5)]"
            >
                <source src={Banner} type="video/mp4" />
            </video>
        </div>

        <div>
            <CodeBlocks
                position={"lg:flex-row"}
                heading={
                <div className='text-4xl font-semibold'>
                    Unlock Your
                    <HighlightText text={"coding potential"} />
                    with our online courses
                </div>
                }
                subheading={
                "Our courses are designed and taught by industry experts who have years of experience in coding."
                }
                ctabtn1={{
                btnText: "try it yourself",
                linkto: "/signup",
                active: true,
                }}
                ctabtn2={{
                btnText: "learn more",
                linkto: "/login",
                active: false,
                }}
                codeblock={`<!DOCTYPE html>
                <html lang="en">
                <head>
                <title>Example</title>
                <link rel="stylesheet" href="styles.css">
                </head>
                <body>
                <h1>Hello, World!</h1>
                </body>
                </html>`}
                codeColor={"text-yellow-25"} 
                backgroudGradient={"size-2px bg-radial from-richblack-700 from-2% to-richblack-900"}
            />
        </div>

        <div>
            <CodeBlocks
                position={"lg:flex-row-reverse"}
                heading={
                <div className='text-4xl font-semibold'>
                    Start
                    <HighlightText text={" coding in seconds"} />
                </div>
                }
                subheading={
                "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                }
                ctabtn1={{
                btnText: "Continue Lesson",
                linkto: "/signup",
                active: true,
                }}
                ctabtn2={{
                btnText: "learn more",
                linkto: "/login",
                active: false,
                }}
                codeblock={`<!DOCTYPE html>
                <html lang="en">
                <head>
                <title>Example</title>
                <link rel="stylesheet" href="styles.css">
                </head>
                <body>
                <h1>Hello, World!</h1>
                </body>
                </html>`}
                codeColor={"text-caribbeangreen-50"} 
                backgroudGradient={"size-2px bg-radial from-richblack-700 from-2% to-richblack-900"}
            />
        </div>

        <ExploreMore/>

      </div>
      {/*Section2 */}
      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[333px]">
          <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
            <div className="h-[220px]"></div>
              <div className='flex flex-row gap-7 text-white '>
                  <CTAButton active={true} linkto={"/signup"}>
                      <div className='flex items-center gap-3' >
                          Explore Full Catalog
                          <FaArrowRight />
                      </div>
                  </CTAButton>
                  <CTAButton active={false} linkto={"/signup"}>
                      <div>
                          Learn more
                      </div>
                  </CTAButton>
              </div>
          </div>
        </div>
        <div className='mx-auto w-11/12 max-w-[1080px] flex flex-col items-center justify-between gap-7'>
            <div className="flex flex-row gap-5 mb-10 mt-[95px]">
                <div className='text-4xl font-semibold '>
                    Get the Skills you need for a
                    <HighlightText text={"Job that is in demand"} />
                </div>
                <div className='flex flex-col gap-10 items-start'>
                    <div className='text-[16px]'>
                        The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                    </div>
                    <CTAButton active={true} linkto={"/signup"}>
                        <div>
                            Learn more
                        </div>
                    </CTAButton>
                </div>
            </div>
            <TimelineSection/>
            <LearningLanguageSection/>
        </div>
      </div>
      {/*Section 3 */}
        {
            user?.accountType !== 'Instructor'
            &&
            (
                <div className='w-11/12 mx-auto max-w-[1080px] flex-col items-center justify-between gap-8 bg-richblack-900 text-white'>
                    <InstructorSection />
                    <h2 className='text-center text-4xl font-semobold mt-10'>review from Other Learners</h2>
                    {/* Review Slider here */}
                </div>
            )
        }
        
    </div>
  );
};

export default Home;
import Leftpage from "./page"
import Footer from "./footer"
import Header from "./header"
import Headertitle from "./headertitle"

export default function Layout({
  children
}: {
  children: React.ReactNode, headertitle: string
}) {
  return (
    <div>
      <Header />
      <Headertitle />
      <div className='bg-white flex p-9'>
      
        <div className="flex flex-col md:flex-row max-w-[1440px] w-full gap-5 mx-auto px-5">
              {/* Left side: Full width on mobile, 1/3 on md+ */}
              <div className="w-full md:w-1/3">
                <Leftpage />
              </div>
        
              {/* Right side: Full width on mobile, 2/3 on md+ */}
              <div className="w-full md:w-2/3">
                {children}
              </div>
            </div>
      
      </div>
      <Footer />
      {/* <FooterBar /> */}
    </div>
  )
}

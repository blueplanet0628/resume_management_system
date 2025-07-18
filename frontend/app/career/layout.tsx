import Leftpage from "../career/left"
import Footer from "@/components/user/footer"
import Header from "@/components/user/header"
import Headertitle from "@/components/auth/headertitle"

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
              <div className="w-full md:w-1/3 no-print">
                <Leftpage />
              </div>
        
              {/* Right side: Full width on mobile, 2/3 on md+ */}
              <div className="w-full md:w-2/3 print-area">
                {children}
              </div>
         </div>
      
      </div>
      <Footer />
      {/* <FooterBar /> */}
    </div>
  )
}

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
      <div className='bg-white flex'>
      
        <div className="w-full py-[100px]">
          {children}
        </div>
      
      </div>
      <Footer />
      {/* <FooterBar /> */}
    </div>
  )
}

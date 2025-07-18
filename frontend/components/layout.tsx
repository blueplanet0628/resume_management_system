import Footer from "./footer"
import Header from "./header"

export default function MainLayout({
  children
}: {
  children: React.ReactNode, headertitle: string
}) {
  return (
    <div>
      <Header />
      <div className='bg-[#edf2f6] flex'>
      
        <div className="w-full">
          {children}
        </div>
      
      </div>
      <Footer />
      {/* <FooterBar /> */}
    </div>
  )
}


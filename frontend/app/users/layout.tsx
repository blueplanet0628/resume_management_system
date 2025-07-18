import Layout from "@/components/user/layout"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Layout headertitle='USER'>
        
      {children}
    </Layout>
  )
}

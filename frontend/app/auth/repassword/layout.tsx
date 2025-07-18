import Layout from "@/components/auth/layout"

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

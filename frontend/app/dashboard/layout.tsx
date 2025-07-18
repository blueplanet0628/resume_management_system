import MainLayout from "@/components/layout"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MainLayout headertitle='USER'>
      {children}
    </MainLayout>
  )
}

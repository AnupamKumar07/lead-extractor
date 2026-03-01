import { PageWrapper } from "@/components/layout/page-wrapper"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <PageWrapper>{children}</PageWrapper>
}

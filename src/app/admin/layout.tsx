import AdminHeader from "@/components/admin/admin-header";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <AdminHeader />
      {children}
    </div>
  );
}

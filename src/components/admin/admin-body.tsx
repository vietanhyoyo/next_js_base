import React from "react";
interface PageBodyProps {
  children: React.ReactNode;
}

const AdminBody: React.FC<PageBodyProps> = ({ children }) => {
  return (
    <main className="flex min-h-screen justify-center p-4 gap-4 pt-24">
      <div className="w-full max-w-screen-xl grid grid-cols-12 gap-4">
        {children}
      </div>
    </main>
  );
};

export { AdminBody };

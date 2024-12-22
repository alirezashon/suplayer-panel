import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex w-full min-h-screen bg-gray-100">
      <div className="w-[17%] min-h-screen bg-white">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1">
        <div className="w-full bg-white">
          <Header />
        </div>
        <div className="flex-1 p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

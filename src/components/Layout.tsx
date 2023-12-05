import { ReactNode } from 'react';
import NavBar from './Nav';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className='p-5 flex items-center flex-col w-full h-full bg-gray-800'>
            <NavBar />
            {children}
        </div>
    );
};

export default Layout;
import Nav from '@/components/Nav';
import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className='p-5 flex items-center flex-col w-full h-screen'>
            <Nav />
            {children}
        </div>
    );
};

export default Layout;
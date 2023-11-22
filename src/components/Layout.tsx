import Nav from '@/components/nav';
import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className='p-5 flex items-center justify-center flex-col w-full'>
            <Nav />
            {children}
        </div>
    );
};

export default Layout;
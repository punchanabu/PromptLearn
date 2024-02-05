import { ReactNode } from 'react';
import NavBar from './Nav';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className='flex justify-center items-center flex-col p-5'>
            <NavBar />
            {children}
        </div>
    );
};

export default Layout;
import Navbar from '@/pages/layout/Navbar';

const Example = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className="container">
                <div>{children}</div>
            </div>
        </>
    );
}

export default Example;


const Layout: React.FC<Core.Component.LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-(--task-surface) flex items-start justify-center p-4 md:p-6">
            <div className="w-full max-w-4xl">
                {children}
            </div>
        </div>
    );
};
export default Layout; 
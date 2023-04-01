interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

function Layout({ children, ...props }: LayoutProps) {
	return (
		<div className="p-2 w-screen h-screen">
			<div className="relative w-full h-full" {...props}>
				{children}
			</div>
		</div>
	);
}

export default Layout;
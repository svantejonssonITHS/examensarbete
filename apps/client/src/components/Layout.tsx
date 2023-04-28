interface LayoutProps {
	foreground?: React.ReactNode;
	background?: React.ReactNode;
}

function Layout({ foreground, background }: LayoutProps) {
	return (
		<div className="p-2 w-screen h-screen overflow-hidden bg-white dark:bg-neutral-900">
			<div className="absolute top-0 left-0 w-full h-full z-0">{background}</div>
			<div className="relative w-full h-full z-10 pointer-events-none">
				{/* Set pointer event to auto for the foreground children */}
				<div className="pointer-events-auto">{foreground}</div>
			</div>
		</div>
	);
}

export default Layout;

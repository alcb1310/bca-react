type PageTitleProps = {
	title: string;
};

export default function PageTitle(props: PageTitleProps) {
	return (
		<h2
			className="py-2 mb-2 border-b-2 text-xl font-bold"
			data-testid="component.pagetitle.title"
		>
			{props.title}
		</h2>
	);
}

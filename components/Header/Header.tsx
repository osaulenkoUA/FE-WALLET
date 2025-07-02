export function Header({
	setActiveTab,
}: {
	setActiveTab: (val: string) => void;
}) {
	return (
		<div
			className={
				"w-full h-[40px] bg-amber-500 flex gap-8 items-center justify-center"
			}
		>
			<div
				className={"text-white font-bold cursor-pointer"}
				onClick={() => setActiveTab("0")}
			>
				{" "}
				Добавити
			</div>
			<div
				className={"text-white font-bold cursor-pointer"}
				onClick={() => setActiveTab("1")}
			>
				{" "}
				Аналіз
			</div>
			<div
				className={"text-white font-bold cursor-pointer"}
				onClick={() => setActiveTab("2")}
			>
				{" "}
				SETUP
			</div>
			<div
				className={"text-white font-bold cursor-pointer"}
				onClick={() => setActiveTab("7")}
			>
				{" "}
				ANALYS_OLD
			</div>
		</div>
	);
}

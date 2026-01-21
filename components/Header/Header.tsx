import { PlusCircle, BarChart2, Settings, History } from "lucide-react";

interface HeaderProps {
	setActiveTab: (val: string) => void;
	activeTab: string; // Додаємо activeTab, щоб підсвічувати активну іконку
}

export function Header({ setActiveTab, activeTab }: HeaderProps) {
	const menuItems = [
		{ id: "0", label: "Додати", icon: PlusCircle },
		{ id: "1", label: "Аналіз", icon: BarChart2 },
		{ id: "2", label: "Налаштування", icon: Settings },
		{ id: "7", label: "Архів", icon: History },
	];

	return (
		<div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 pb-safe">
			<div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
				{menuItems.map((item) => {
					const Icon = item.icon;
					const isActive = activeTab === item.id;

					return (
						<button
							key={item.id}
							type="button"
							onClick={() => setActiveTab(item.id)}
							className="flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
						>
							<Icon
								className={`w-6 h-6 mb-1 ${
									isActive
										? "text-amber-500"
										: "text-gray-500 group-hover:text-amber-500"
								}`}
							/>
							<span
								className={`text-xs ${
									isActive
										? "text-amber-500"
										: "text-gray-500 group-hover:text-amber-500"
								}`}
							>
								{item.label}
							</span>
						</button>
					);
				})}
			</div>
		</div>
	);
}

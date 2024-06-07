import React, { createContext, useContext, useState, ReactNode } from "react";

// THIS IS USED FOR SOME REASON, I DON'T THINK IT WAS NECESSARY, IT WORKS THO

interface Skin {
	img: string;
	name: string;
}

interface SkinContextType {
	item: Skin | null;
	setItem: (item: Skin) => void;
}

const SkinsContext = createContext<SkinContextType | undefined>(undefined);

interface SkinsProviderProps {
	children: ReactNode;
}

export const SkinsProvider: React.FC<SkinsProviderProps> = ({ children }) => {
	const [item, setItem] = useState<Skin | null>(null);

	return (
		<SkinsContext.Provider value={{ item, setItem }}>
			{children}
		</SkinsContext.Provider>
	);
};

export const useSkins = (): SkinContextType => {
	const context = useContext(SkinsContext);
	if (!context) {
		throw new Error("useSkins must be used within a SkinsProvider");
	}
	return context;
};

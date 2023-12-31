import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Audio Playlist",
	description: "Audio Playlist for soundgasm and kemono audios.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body
				className={`${inter.className} flex flex-col items-center bg-[#15181d] text-[rgb(223,223,223)]`}>
				{children}
			</body>
		</html>
	);
}

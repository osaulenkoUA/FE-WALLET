import "../styles/globals.css";
import type { AppProps } from "next/app";
import dotenv from "dotenv";

export default function App({ Component, pageProps }: AppProps) {
	dotenv.config();
	return <Component {...pageProps} />;
}

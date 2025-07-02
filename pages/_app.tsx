import "../styles/globals.css";
import dotenv from "dotenv";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
	dotenv.config();
	return <Component {...pageProps} />;
}

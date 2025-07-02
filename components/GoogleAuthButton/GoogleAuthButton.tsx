import Link from "next/link";
// @ts-ignore
import { urlSupabase } from "../helpers/endpoints";

export const GoogleAuthButton = () => {
	const OAuthGoogle = urlSupabase.OAuthGoogle;
	return (
		<Link
			href={OAuthGoogle}
			className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
		>
			<svg className="w-5 h-5" viewBox="0 0 24 24">
				<path
					d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
					fill="#4285F4"
				/>
				<path
					d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.04.7-2.36 1.11-3.71 1.11-2.85 0-5.26-1.92-6.12-4.51H1.5v2.82C3.32 20.36 7.06 23 12 23z"
					fill="#34A853"
				/>
				<path
					d="M5.88 13.49c-.21-.64-.33-1.32-.33-2.01s.12-1.37.33-2.01V6.65H1.5C.54 8.36 0 10.13 0 12s.54 3.64 1.5 5.35l4.38-3.86z"
					fill="#FBBC05"
				/>
				<path
					d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.06 1 3.32 3.64 1.5 6.65l4.38 3.86c.86-2.59 3.27-4.13 6.12-4.13z"
					fill="#EA4335"
				/>
			</svg>
			<span className="text-gray-700 font-medium">Sign in with Google</span>
		</Link>
	);
};

export default GoogleAuthButton;

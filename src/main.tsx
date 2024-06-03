import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import { AuthProvider } from "./context/AuthContext";
import { QueryProvider } from "./lib/react-query/QueryProvider";
import { SkinsProvider } from "./context/SkinsContext";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<SkeletonTheme baseColor="#ffffff" highlightColor="#444">
		<BrowserRouter>
			<QueryProvider>
				<AuthProvider>
					<SkinsProvider>
						<App />
					</SkinsProvider>
				</AuthProvider>
			</QueryProvider>
		</BrowserRouter>
	</SkeletonTheme>
);

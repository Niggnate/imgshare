import ReactDOM from 'react-dom/client'
import App from "./App.tsx";
import { BrowserRouter } from 'react-router-dom'
import AuthenticationProvider from "@/context/auth-context.tsx";
import {QueryProvider} from "@/lib/react-query/query-provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <QueryProvider>
            <AuthenticationProvider>
                <App />
            </AuthenticationProvider>
        </QueryProvider>
    </BrowserRouter>
)
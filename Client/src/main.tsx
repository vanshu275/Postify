import { ThemeProvider } from "@/components/theme-provider.tsx"
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import router from "./router/index";
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
   <ThemeProvider>  
     <RouterProvider router={router} />
   </ThemeProvider>
    
);
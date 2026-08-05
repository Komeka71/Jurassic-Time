// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App";

// import { GuideProvider } from "./context/GuideContext";
// import { AudioProvider } from "./context/AudioContext";
// import { AuthProvider } from "./context/AuthContext";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <AuthProvider>
//       <AudioProvider>
//         <GuideProvider>
//           <App />
//         </GuideProvider>
//       </AudioProvider>
//     </AuthProvider>
//   </StrictMode>
// );


import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ProgressProvider } from "./context/ProgressContext";
import { GuideProvider } from "./context/GuideContext";
import { AudioProvider } from "./context/AudioContext";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ProgressProvider>
      <AudioProvider>
        <GuideProvider>
          <App />
        </GuideProvider>
      </AudioProvider>
      </ProgressProvider>
    </AuthProvider>
  </StrictMode>
);
import { headers } from "next/headers";
import { Providers } from "./providers";
import { cookieToInitialState } from "@account-kit/core";
import { config } from "~~/account.config";
import "~~/styles/globals.css";
import { getMetadata } from "~~/utils/scaffold-alchemy/getMetadata";

export const metadata = getMetadata({
  title: "FUNraise ✨",
  description: "Vibe with your tribe & fund what matters 🌈 Spiritual crowdfunding for the digital age",
});

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  const initialState = cookieToInitialState(config, headers().get("cookie") ?? undefined);

  return (
    <html suppressHydrationWarning lang="en">
      <body className="font-comic">
        <Providers initialState={initialState}>{children}</Providers>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;

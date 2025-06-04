import { headers } from "next/headers";
import { Providers } from "./providers";
import { cookieToInitialState } from "@account-kit/core";
import { config } from "~~/account.config";
import "~~/styles/globals.css";
import { getMetadata } from "~~/utils/scaffold-alchemy/getMetadata";

export const metadata = getMetadata({
<<<<<<< HEAD
  title: "FUNraise",
  description: "Support creators you believe in with SOL - A decentralized crowdFUN platform.",
=======
  title: "FUN. - Blockchain Crowdfunding",
  description: "Support creators you believe in with ETH - A decentralized crowdFUN platform.",
>>>>>>> e90d7e2396fb17a9baef77b4aa79da99088a9687
});
8
const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  // This will allow us to persist state across page boundaries (read more here: https://accountkit.alchemy.com/react/ssr#persisting-the-account-state)
  const initialState = cookieToInitialState(config, headers().get("cookie") ?? undefined);

  return (
    <html suppressHydrationWarning>
      <body>
        <Providers initialState={initialState}>{children}</Providers>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;

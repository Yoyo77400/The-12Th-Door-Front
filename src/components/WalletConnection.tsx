import { Button } from "./ui/button";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

export default function WalletConnection() {
  const { setShowAuthFlow } = useDynamicContext();
  return (
    <Button
      onClick={() => setShowAuthFlow(true)}
      className="cursor-pointer"
      variant="default"
      size="lg"
    >
      Connect Wallet
    </Button>
  );
}

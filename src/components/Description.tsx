import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Timeline from "./Timeline";
import SportsCard from "./SportsCard";

export default function Description() {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 mx-auto py-12">
        <Card className="w-full md:w-1/2">
          <CardHeader className="text-white/90">PROOF OF ATTENDANCE</CardHeader>
          <CardContent>
            <p className="text-white/60">
              Every time you attend a match, you get the chance to win a card.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="default">
              View more
              <ArrowRight />
            </Button>
          </CardFooter>
        </Card>
        <Card className="w-full md:w-1/2">
          <CardHeader className="text-white/90">
            STACK ON SOCIOS PLATFORM
          </CardHeader>
          <CardContent>
            <p className="text-white/60">
              Stack your Socios to unlock exclusive rewards from us without
              loosing benefits from socios.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="default">
              View more
              <ArrowRight />
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="flex flex-col gap-4 mx-auto py-12">
        <h2 className="text-2xl font-bold text-white/90 mx-auto">
          LOYALTY NFT
        </h2>
        <Timeline />
      </div>
    </>
  );
}

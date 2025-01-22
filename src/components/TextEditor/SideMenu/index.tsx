import { PropsWithChildren } from "react";
import Container from "@/components/ui/Container";

export default function SideMenu({ children }: PropsWithChildren) {
  return (
    <Container className="col-span-3 space-y-4 sticky top-8 min-h-screen h-fit">
      <Container className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        <h2 className="mb-4 text-sm font-medium">Translation Memory</h2>
        {children}
      </Container>
    </Container>
  );
}

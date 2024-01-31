import Logo from "@/components/logo";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

import { OWNER } from "@/lib/constants";
import { ParamSchema } from "@/schemas/param-schema";

export const metadata = {
  title: "Instagram Scripping 👥",
  description: `Created by ${OWNER}`,
}

export default function Layout({ children, dialog, ...rest }: {
  children: React.ReactNode;
  dialog: React.ReactNode;
}) {
  console.log("gimme rest", rest)

  return (
    <ResizablePanelGroup
      direction="vertical"
      className="flex flex-grow min-h-[500px] h-screen w-screen rounded-lg border"
    >

      <ResizablePanel defaultSize={70} minSize={20}>
        {children}
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={30} minSize={20}>
        <div className="flex h-full items-center justify-center p-6">
          <Logo />
          {dialog}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

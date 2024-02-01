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
  return (
    <ResizablePanelGroup
      direction="vertical"
      className="flex flex-grow min-h-[650px] h-full rounded-lg border"
    >

      <ResizablePanel defaultSize={85} minSize={30}>
        {children}
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={15} minSize={10}>
        <div className="flex h-full items-center justify-center">
          {dialog}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

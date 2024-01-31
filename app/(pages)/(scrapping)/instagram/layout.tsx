import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

import { OWNER } from "@/lib/constants";

export const metadata = {
  title: "Instagram Scripping 👥",
  description: `Created by ${OWNER}`,
}

export default function Layout({ children, content, form, catching }: {
  children: React.ReactNode;
  content: React.ReactNode;
  form: React.ReactNode;
  catching: React.ReactNode;
}) {
  return (<>
    <ResizablePanelGroup
      direction="horizontal"
      className="flex flex-grow h-full min-h-96 w-screen rounded-lg border"
    >
      <ResizablePanel defaultSize={30} minSize={20}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">{children}</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={70} minSize={30}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">{content}</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  </>
  );
}

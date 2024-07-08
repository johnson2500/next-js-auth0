import { ChatSidebard } from "components/ChatSidebar";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>New Chat</title>
      </Head>
      <div className="grid h-screen grid-cols-[260px_1fr]">
        <ChatSidebard></ChatSidebard>
        <div className="flex flex-col bg-gray-700 ">
          <div className="flex-1">Chat Windo</div>
          <footer className="bg-gray-800 p-10"></footer>
        </div>
      </div>
    </>
  );
}

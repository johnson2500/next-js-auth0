import { ChatSidebard } from "components/ChatSidebar";
import Head from "next/head";
import { streamReader } from "openai-edge-stream";
import { useState } from "react";

export default function ChatPage() {
  const [messageState, setMessageState] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending Message", messageState);
    const response = await fetch("/api/chat/sendMessage", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        message: messageState,
      }),
    });

    const data = response.body;

    if (!data) {
      return; 
    }

    await streamReader(data.getReader(), async (message) => {
      console.log("message: ", message.content);
    });
  };

  return (
    <>
      <Head>
        <title>New Chat</title>
      </Head>
      <div className="grid h-screen grid-cols-[260px_1fr]">
        <ChatSidebard></ChatSidebard>
        <div className="flex flex-col bg-gray-700 ">
          <div className="flex-1">Chat Windo</div>
          <footer className="bg-gray-800 p-10">
            <form onSubmit={handleSubmit}>
              <fieldset className="flex gap-2">
                <textarea
                  value={messageState}
                  onChange={(e) => {
                    setMessageState(e.target.value);
                  }}
                  placeholder="Send a message..."
                  className="focus:outline-ermeral-500 w-full resize-none rounded-md bg-gray-700 p-2 text-white focus:border-emerald-500 focus:bg-gray-600 focus:outline focus:outline-emerald-500"
                ></textarea>
                <button className="btn" type="submit">
                  Send
                </button>
              </fieldset>
            </form>
          </footer>
        </div>
      </div>
    </>
  );
}

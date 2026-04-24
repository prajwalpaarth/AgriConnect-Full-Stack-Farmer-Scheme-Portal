import React, { useEffect } from "react";

const DanteChatBubble = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://app.dante-ai.com/bubble-embed.js?kb_id=184175be-8dc3-41c5-b3fa-d2a772b050a1&token=dc459ce6-c8a8-44fe-ac86-46deaf8081eb&modeltype=gpt-4-omnimodel-mini&tabs=false";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // No visible UI needed, as the script injects the chat bubble itself
};

export default DanteChatBubble;

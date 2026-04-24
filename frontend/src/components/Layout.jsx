import { Outlet } from "react-router-dom";
import  Footer  from "./Footer";
import Navbar from "./Navbar";
import Nav from "./Nav";
import DanteChatBubble from "./Chatbot";

const AppLayout = () => {
    return (
        <div>
        <Navbar />
        <Outlet />
        <DanteChatBubble></DanteChatBubble>
        <Footer />
        </div>
    );
}

export default AppLayout;
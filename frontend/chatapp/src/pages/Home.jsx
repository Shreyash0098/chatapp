import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div className="home h-screen bg-[#a7bcff]  flex justify-center items-center">
      <div className="container border-2 rounded-[10px] w-[65%] h-[80%] flex overflow-hidden">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;

import WalletContext from "./contexts/wallet";
import Footer from "./ui/Footer";
import Header from "./ui/Header";
import Main from "./views/Main";

function App() {
  return (
    <WalletContext>
      <div className="min-h-screen w-screen overflow-x-hidden flex flex-col justify-start items-center gap-5 bg-[#000004] font-inter">
        <Header />
        <div className="self-stretch overflow-auto mt-auto">
          <Main />
        </div>
        <Footer />
      </div>
    </WalletContext>
  );
}

export default App;

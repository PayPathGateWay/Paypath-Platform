import { headerBLueLogo } from "@/Utils/Index";
import ProfileSettings from "./ProfileSettings";


export default function NavBar() {
  return (
    <nav className="relative mt-4 w-[95%] h-20 bg-white rounded-bl-3xl 
    rounded-br-3xl shadow-sm mx-auto flex justify-between items-center px-4 animated-border">
      <div className="logo flex justify-center items-center w-full">
        <img src={headerBLueLogo} alt="logo payPath" className="h-4" />
      </div>

      <div className="items">
        <div className="ProfilePlatfromSettings">
          <ProfileSettings/>
        </div>

        <div className="API-KEY">

        </div>

        <div className="Transactions-Payments">

        </div>

      </div>
    </nav>
  )
}

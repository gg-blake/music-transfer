import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState("music");
  const [addr, setAddr] = useState("192.168.1.199");

  useEffect(() => {
    const userEl = document.getElementById('user');
    const addrEl = document.getElementById('addr');
    var c=document.createElement('canvas');
    var ctx=c.getContext('2d');
    ctx!.font = `normal 128px ${"url(https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap)"}`;
    var userLength = ctx!.measureText(user).width;
    if (userLength * 13.65 / window.innerWidth > 0.45) {
      userEl!.style.width = "600px";
    } else if (userLength * 13.65 / window.innerWidth < 0.2) {
      userEl!.style.width = "350px";
    } else {
      userEl!.style.width = userLength * 13.65 + "px";
    }

    var userLength = ctx!.measureText(addr).width;
    if (userLength * 13.65 / window.innerWidth > 0.55) {
      addrEl!.style.width = "780px";
    } else if (userLength * 13.65 / window.innerWidth < 0.2) {
      addrEl!.style.width = "500px";
    } else {
      addrEl!.style.width = userLength * 13.65 + "px";
    }
    
  }, [user, addr]);

  const updateUser = ({ target } : { target : any }) => {
    setUser(target.value);
  };

  const updateAddr = ({ target } : { target : any }) => {
    setAddr(target.value);
  };

  const connect = async () => {
    

    let result = await fetch('/api/connect', {method: "POST", headers: {user: user, addr: addr}});
    console.log(result);
  }

  return (
    <div className="bg-[#212121] font-sans w-screen h-screen px-4 flex justify-center overflow-hidden flex-col">
      <svg className="absolute h-full w-auto right-[-300px] z-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 609.35 842.38">
        <path stroke="#E766DA" fill="transparent" d="M68.56,842S-95.06,697.68,85.08,448.74,311.32.11,311.32.11"/>
        <path stroke="#E766DA" fill="transparent" d="M151.75.11c4.25,21-122.7,420.26,14.89,477.71S609.2,435.27,609.2,435.27"/>
        <path stroke="#E766DA" fill="transparent" d="M155.91,842S140,375,366.2,679.24"/>
      </svg>
      <span onClick={() => connect()} className="z-10 w-auto text-[64px] h-auto self-start border-[1px] border-[#5B5B5B] text-[#5B5B5B] hover:border-[#E766DA] hover:text-[#E766DA] active:border-[#5B5B5B] active:text-[#5B5B5B] select-none transition-colors flex justify-center items-center font-light px-6">Scan Files</span>
      <div className="leading-relaxed p-0 w-3/4 py-3 z-10 h-auto flex flex-row text-[128px] border-b-[1px] border-b-[#5B5B5B] gap-1">
        <input id="user" type="text" className="w-[360px] ml-[3px] h-auto text-[#5B5B5B] bg-transparent  focus:outline-none focus:outline-1 focus:outline-[#5B5B5B] leading-none transition-all" name="host" placeholder="host" value={user} onChange={updateUser} />
        <span className="text-[#E766DA]">@</span>
        <input id="addr" type="text" className="w-full h-auto text-[#E766DA] bg-transparent focus:outline-none focus:outline-1 focus:outline-[#E766DA] leading-none transition-all" name="address" placeholder="address" value={addr} onChange={updateAddr} />
      </div>
      <div className="z-10 w-3/4 h-auto max-h-[40%] px-6 py-6 overflow-y-scroll border-l-[1px] border-[#5B5B5B] font-light text-lg text-[#5B5B5B] gap-3">
        <h2 className="select-none z-10 w-full h-auto text-[32px] text-[#5B5B5B] mb-3">Files</h2>
        Song #2<br />Song #2<br />Song #2<br />Song #2<br />Song #2<br />Song #2<br />Song #2<br />Song #2<br />Song #2<br />Song #2<br />Song #2<br />Song #2<br />Song #2<br />Song #2<br />Song #2<br />Song #2<br />Song #2<br />Song #2<br />Song #2<br />Song #2<br />Song #2<br />Song #2<br />Song #2<br />Song #2<br />Song #2<br />Song #2<br />Song #2<br />Song #2<br />Song #2<br />Song #2<br />Song #2<br />Song #2
      </div>
      
    </div>
  )
}

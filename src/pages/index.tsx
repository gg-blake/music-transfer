import { useEffect, useState, use } from "react";

import axios from '../axios';

function FileCard({file}: {file: any}) {
  return (
    <div className="border-primary border-[1px] h-full w-full b-test flex flex-row justify-between p-[20px] bg-gradient-to-b from-dark to-transparent backdrop-blur-lg">
      <div className="w-auto h-full flex flex-col justify-between">
        
        <div className="flex flex-col gap-[5px]">
          <div className="w-auto h-auto flex flex-row flex-wrap gap-3 text-neon-pink text-[12px] font-semibold pl-1 mb-[5px]">
            <span className="w-auto h-auto  border-[1px] flex justify-center items-center border-neon-pink bg-neon-pink bg-opacity-20 px-1">{file != undefined ? file.format.format_name.toUpperCase() : "n/a"}</span>
            <span className="w-auto h-auto  border-[1px] flex justify-center items-center border-neon-pink bg-neon-pink bg-opacity-20 px-1">{file != undefined ? (file.format.tags.GENRE || file.format.tags.Genre).toUpperCase() : "n/a"}</span>
            <span className="w-auto h-auto  border-[1px] flex justify-center items-center border-neon-pink bg-neon-pink bg-opacity-20 px-1">{file != undefined ? file.format.tags.DATE || file.format.tags.Date : "n/a"}</span>
            <span className="w-auto h-auto  border-[1px] flex justify-center items-center border-neon-pink bg-neon-pink bg-opacity-20 px-1">{file != undefined ? Math.trunc(file.format.size / 8000) + "KB" : "n/a"}</span>
            
          </div>
          <h1 className="text-[32px] font-extralight">{file != undefined ? (file.format.tags.TITLE || file.format.tags.Title) : "n/a"}</h1>
          <h2 className="text-[18px] font-extralight pl-[2px]">{file != undefined ? file.format.tags.ARTIST || file.format.tags.Artist : "n/a"}</h2>
        </div>
      </div>
      <div className="w-[200px] h-[200px] bg-primary rounded-md opacity-10">
        
      </div>
    </div>
  )
}

function SearchResult({file, id, onFocusState, onHoverState}: {file: any, id: number, onFocusState: any, onHoverState: any}) {
  let date = new Date(file.date_added);

  const handleClick = () => {
    onFocusState[1](id);
  }

  const handleHover = () => {
    if (onHoverState[0] != id) {
      onHoverState[1](id);
    }
  }

  return (
    <div className="relative w-full flex flex-row h-auto">
      <div id={`search-item-${id}`} onMouseOver={() => handleHover()} onClick={() => handleClick()} className={`relative z-10 w-full h-[45px] flex justify-between border-b-[1px] border-primary ${onFocusState[0] == id ? "text-neon-pink border-neon-pink animate-none" : "text-primary hover:animate-pulse"} border-opacity-50 bg-transparent text-[12px] items-center hover:text-neon-pink active:text-primary active:animate-none transition-all text-primary font-sans font-extralight gap-2 overflow-visible`}>
        <div className="w-8 text-center">{file.format.tags != undefined ? parseInt(file.format.tags.track || file.format.tags.TRACK || file.format.tags.Track) : "n/a"}</div>
        <div className="w-full flex-shrink flex-grow grid grid-cols-4 items-center">
          <div className="flex flex-col gap-0 justify-center">
            <span className="truncate text-[16px] font-normal leading-3 pt-[6px]">{file.format.tags != undefined ? file.format.tags.TITLE || file.format.tags.Title : "n/a"}</span>
            <span className="truncate font-light">{file.format.tags != undefined ? file.format.tags.ARTIST || file.format.tags.Artist : 'n/a'}</span>
          </div>
          <div className="truncate text-right">{file.format.tags != undefined ? file.format.tags.ALBUM || file.format.tags.Album : 'n/a'}</div>
          <div className="truncate text-right">{`${Math.trunc(date.getMonth())}/${date.getDate()}/${date.getFullYear()}` || 'n/a'}</div>
          <div className="truncate text-right pr-2">{`${Math.trunc(file.format.duration / 60)}:${('0' + Math.trunc(file.format.duration % 60)).slice(-2)}` || 'n/a'}</div>
        </div>
      </div>
      <div className={`self-center w-[30px] h-[45px] flex items-end transition-opacity ${onFocusState[0] == id ? "border-opacity-50" : "border-opacity-0"}`}>
        <div className={`w-full h-[1px] transition-opacity bg-gradient-to-r from-neon-pink to-primary ${onFocusState[0] == id ? "opacity-50" : "opacity-0"}`}></div>
      </div>
    </div>
  )
}

export default function Home() {
  const [user, setUser] = useState("music");
  const [addr, setAddr] = useState("192.168.1.199");
  const [fileMetadata, setFileMetadata] = useState<any | null>([]);
  const [visibleFileMetadata, setVisibleFileMetadata] = useState<any | null>([]);
  const [focusIndex, setFocusIndex] = useState<number>(-1);
  const [hoverIndex, setHoverIndex] = useState<number>(-1);
  const [isConn, setConn] = useState({
    status: false, 
    message: "Not connected"
  });

  const updateUser = ({ target } : { target : any }) => {
    setUser(target.value);
  };

  const updateAddr = ({ target } : { target : any }) => {
    setAddr(target.value);
  };

  const connect = async () => {
    setConn({
      status: false,
      message: "Connecting"
    });

    let fileData = await (await fetch('/api/connect', {method: "POST", headers: {user: user, addr: addr}})).json();
    let fileMetadataResponse = await (await fetch("http://moody.mx:3000/api/files", {headers: {'Content-Type': 'application/json'}})).json();
    if (fileData.message == "Connected") {
      setConn({
        status: true,
        message: "Connected"
      });
      console.log(fileMetadataResponse.data);
      setFileMetadata(fileMetadataResponse.data);
    } else {
      setConn({
        status: false,
        message: fileData.message
      });
      setFileMetadata(null);
    }
  }

  var dataList = visibleFileMetadata?.map((file: any, id: number) => <SearchResult 
              key={`search-item-${id}`}
              file={file} id={id} 
              onFocusState={[focusIndex, setFocusIndex]} 
              onHoverState={[hoverIndex, setHoverIndex]} />)

  const disconnect = () => {
    setConn({
      status: false, 
      message: "Not connected"
    });
  }

  useEffect(() => {
    console.log(fileMetadata);
    setVisibleFileMetadata(fileMetadata);
  }, [fileMetadata])

  const search = ({ target } : { target : any }) => {
    let acceptedFormats = ["FLAC", "MP3"];
    let musicFiles = fileMetadata.filter((file: any) => file != undefined && acceptedFormats.includes(file.format.format_name.toUpperCase()));
    let filtered = musicFiles.filter((file: any) => ((file.format.tags?.TITLE || file.format.tags?.Title).toUpperCase().includes(target.value.toUpperCase()) || (file.format.tags?.ARTIST || file.format.tags?.Artist).toUpperCase().includes(target.value.toUpperCase()) || (file.format.tags?.ALBUM || file.format.tags?.Album).toUpperCase().includes(target.value.toUpperCase())));
    setVisibleFileMetadata(filtered);
  }

  return (
    <div className={`${isConn.status ? "jusitfy-start backdrop-blur-md pt-5" : "justify-center"} bg-transparent font-sans w-screen h-screen px-8 flex flex-col transition-all gap-4`}>
      <div className="fixed top-2 left-2 w-auto h-auto flex ml-[8px] flex-row items-center gap-1">
          <span style={{
            color: isConn.message == "Not connected" ? "#5B5B5B" : isConn.message == "Connecting" ? "#FABE4D" : isConn.message == "Connected" ? "#6ded66" : "#ED5142"
          }} className="text-[12px] opacity-10">{isConn.message}</span>
      </div>
      <div className={`leading-relaxed p-0 w-full overflow-x-clip text-neon-pink py-[2px] z-10 h-auto flex flex-row-reverse ${isConn.status ? 'text-[64px]' : 'text-[128px]'} gap-2`}>
        <input id="addr" type="text" className="w-full h-auto  bg-transparent focus:outline-none focus:bg-neon-pink rounded-md focus:bg-opacity-10 leading-none transition-all hover:animate-pulse focus:animate-none peer" name="address" placeholder="address" value={addr} onChange={updateAddr} />
        @
        <input id="user" type="text" className={`z-0 ${isConn.status ? "w-full text-right" : "w-full text-left"} focus:w-full px-2 translate-x-[5px] h-auto text-primary bg-transparent focus:caret-primary focus:bg-primary peer peer-focus:w-1/4 peer-focus:truncate focus:bg-opacity-10 rounded-md focus:outline-none leading-none transition-all hover:animate-pulse focus:animate-none peer`} name="user" placeholder="user" value={user} onChange={updateUser} />
      </div>
      <div className={`w-full h-auto flex flex-row gap-4 ${isConn.status ? "justify-center" : "justify-start"}`}>
        <span onClick={() => connect()} className={`z-10 w-auto ${isConn.status ? 'text-[32px]' : 'text-[64px]'} h-auto self-start stroke-primary hover:bg-neon-pink hover:stroke-neon-pink hover:bg-opacity-10 group select-none transition-colors flex justify-center items-center font-light px-4 py-[18px] rounded-md`}>
          <div className="w-auto h-auto stroke-inherit fill-none stroke-[40px] font-normal text-primary">
            {
            isConn.status ? <svg className="w-[33px] h-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 340">
              <path d="M60.17,132.15a151.88,151.88,0,1,1-.33,72.14"/>
              <path d="M68.43,239.73a1.5,1.5,0,0,0,0-3,1.5,1.5,0,0,0,0,3Z"/>
              <path d="M76.92,236a1.5,1.5,0,0,0,0-3,1.5,1.5,0,0,0,0,3Z"/>
              <line x1="50.47" y1="160.79" x2="16.53" y2="20.12"/>
              <line x1="30.64" y1="148.67" x2="172.27" y2="119"/>
            </svg> : "Connect"
            }
          </div>
          
        </span>
        <span onClick={() => disconnect()} style={{
          opacity: isConn.status ? "100%" : "0%",
          transform: isConn.status ? "translateX(0px)" : "translateX(20px)"
        }} className="z-10 w-auto h-auto self-center hover:bg-neon-pink hover:bg-opacity-10 stroke-primary hover:stroke-neon-pink rounded-md transition-all flex justify-center items-center px-4 py-[15px]">
          <svg className="w-[33px] h-auto stroke-[33px] stroke-inherit active:stroke-primary transition-all" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 244.09 244.09">
            <path d="M10.61,10.61,233.48,233.48"/>
            <line x1="10.61" y1="233.48" x2="233.48" y2="10.61"/>
          </svg>
        </span>
      </div>
      <div className={`${isConn.status ? "visible" : "hidden"} w-full h-3/5 flex flex-row mt-8 ml-[2px] gap-0`}>
        <div className="flex flex-grow flex-col transition-all">
          <div className="sticky z-20 top-0 flex flex-col gap-2">
            <div className="w-full h-auto flex">
              <input id="search" className="w-full text-[14px] hover:outline-neon-pink hover:animate-pulse focus:animate-none active:animate-none transition-all placeholder:italic focus:placeholder:non-italic outline-none outline-1 outline-primary focus:outline-neon-pink bg-transparent py-1.5 px-4 text-primary placeholder-primary placeholder-opacity-25 focus:placeholder-opacity-70" name="search" placeholder="Enter a file name" onChange={search} />
              <div className="w-[20px] h-[20px]"></div>
            </div>
            <div className="w-full h-auto flex flex-row text-[12px] pl-2 pr-[22px] gap-2 py-2 underline underline-offset-4 text-primary font-semibold text-opacity-40">
              <div className="w-8 h-auto text-center">#</div>
              <div className="flex-grow grid grid-cols-4 items-center text-right">
                <h1 className="text-left">Title</h1>
                <h1>Album</h1>
                <h1>Date Added</h1>
                <h1 className="pr-2">Duration</h1>
              </div>
            </div>
          </div>
          <div className="flex-grow w-full overflow-y-scroll pl-2 offset-scroll">
            
            { 
              dataList
            }
            <div className={`w-auto h-auto text-primary sticky bottom-0 whitespace-nowrap truncate px-1 py-[2px] bg-gradient-to-t from-dark  to-transparent backdrop-blur-sm z-20 ${visibleFileMetadata[hoverIndex]?.format.filename != undefined ? "text-[10px]" : "text-2xl opacity-50 flex justify-center"}`}>{visibleFileMetadata[hoverIndex]?.format.filename != undefined ? "/" + visibleFileMetadata[hoverIndex]?.format.filename.split('/').slice(3).join("/") : "No results found :/"}</div>
          </div>
        </div>
        <div className={`${focusIndex >= 0 ? 'w-full flex-grow' : 'flex-shrink'} h-full transition-all translate-y-[-3px] text-primary`}>
          {focusIndex >= 0 ? <FileCard file={visibleFileMetadata[focusIndex]} /> : null}
        </div>
      </div>
      
    </div>
  )
}

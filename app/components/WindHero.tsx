"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export function WindHero() {
  const [progress,setProgress] = useState(0);
  useEffect(()=>{
    const onScroll=()=>setProgress(Math.min(1,window.scrollY/Math.max(1,window.innerHeight*.9)));
    onScroll(); window.addEventListener("scroll",onScroll,{passive:true});
    return()=>window.removeEventListener("scroll",onScroll);
  },[]);
  return <div className="wind-visual" style={{"--progress":progress} as React.CSSProperties}>
    <Image src="https://bhanu-trajectory.bhanubandreddy.chatgpt.site/images/shuttlecock-hero.png" alt="A shuttlecock in a wind tunnel, using air resistance to stabilise its flight" fill priority sizes="(max-width: 900px) 100vw, 50vw"/>
    <div className="wind-overlay" aria-hidden="true">{Array.from({length:7}).map((_,i)=><i key={i} style={{"--i":i} as React.CSSProperties}/>)}</div>
    <div className="physics-label pressure"><b>01</b><span>Airflow enters left → right</span></div>
    <div className="physics-label stability"><b>02</b><span>Feather drag stabilises</span></div>
    <div className="physics-label momentum"><b>03</b><span>Cork leads the flight</span></div>
  </div>;
}

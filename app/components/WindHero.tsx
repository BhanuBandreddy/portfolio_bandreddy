"use client";
import { useEffect, useState } from "react";

export function WindHero() {
  const [progress,setProgress] = useState(0);
  useEffect(()=>{
    const onScroll=()=>setProgress(Math.min(1,window.scrollY/Math.max(1,window.innerHeight*.9)));
    onScroll(); window.addEventListener("scroll",onScroll,{passive:true});
    return()=>window.removeEventListener("scroll",onScroll);
  },[]);
  return <div className="wind-visual" style={{"--progress":progress} as React.CSSProperties}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/images/shuttlecock-hero-light.svg" alt="A shuttlecock in a wind tunnel, using air resistance to stabilise its flight"/>
    <div className="wind-overlay" aria-hidden="true">{Array.from({length:7}).map((_,i)=><i key={i} style={{"--i":i} as React.CSSProperties}/>)}</div>
    <div className="physics-label pressure"><b>01</b><span>Airflow enters left → right</span></div>
    <div className="physics-label stability"><b>02</b><span>Feather drag stabilises</span></div>
    <div className="physics-label momentum"><b>03</b><span>Cork leads the flight</span></div>
  </div>;
}

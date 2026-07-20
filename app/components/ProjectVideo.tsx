import type { ProjectVideo as ProjectVideoType } from "../data";

export function ProjectVideo({video}:{video:ProjectVideoType}){
  return <section className="video-evidence">
    <div className="video-heading"><div><span className="section-index">WORKING DEMONSTRATION</span><h2>{video.title}</h2><p>{video.caption}</p></div><span className="video-length">PLAY / EXPAND FULLSCREEN</span></div>
    <video controls playsInline preload="metadata" poster={video.poster} aria-label={video.title}><source src={video.src} type="video/mp4"/>Your browser does not support embedded MP4 video.</video>
    <div className="video-steps">{video.steps.map((step,i)=><article key={step}><b>0{i+1}</b><p>{step}</p></article>)}</div>
  </section>
}

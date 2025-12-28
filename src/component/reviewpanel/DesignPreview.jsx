import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { supabase } from "../../auth/supabase"
import useAnalytics from "../../hooks/useAnalytics";
import useTimeAnalytics from "../../hooks/timeanalytics";
import MobilePdfViewer from "./MobilePdfViewer";
import "../employersview/employersview.css";

export default function DesignPreview() {
  const { uniqueId } = useParams();
const hasSent=useRef(false)
const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  useAnalytics(uniqueId);
useTimeAnalytics(uniqueId);
  const previewRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [design, setDesign] = useState(null);
  const [layers, setLayers] = useState([]);
  const [current, setCurrent] = useState(0);

  /* ---------- fullscreen ---------- */
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      previewRef.current?.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen();
    }
  }

  useEffect(() => {
    if (!uniqueId) return;

    let alive = true;

    async function load() {
      try {
        // https://bynd-backend.onrender.com
        // const res = await axios.get(
        //   `http://localhost:3000/api/view/${uniqueId}`,
        //   {withCredentials:true}
        // );
        const {
  data: { session },
} = await supabase.auth.getSession();

const accessToken = session?.access_token;

const res = await axios.get(
  `https://bynd-backend.onrender.com/api/view/${uniqueId}`,
  {
    headers: accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : {},
  }
);


        if (!alive) return;

        setDesign(res.data);
        setLayers(res.data.layers || []);
      } catch (err) {
        console.error("Preview fetch failed:", err);
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();

    return () => {
      alive = false;
    };
  }, [uniqueId]);

// useEffect(()=>{
// if(!uniqueId) return ;
// try{
// const sendNotification=async()=>{
// const res=await axios.post(`http://localhost:3000/sendnotification/${uniqueId}`)
// console.log(res.data.message);
// }
// sendNotification();
// }catch(err){
//   console.log(`unable to send the notification${err}`)
//   // console.log("unable to send the notification ")
// }
// },[uniqueId])


useEffect(() => {
  if(hasSent.current) return;
  hasSent.current=true
  if (!uniqueId) return;

  async function sendNotification() {
    try {
      // https://bynd-backend.onrender.com
      const res = await axios.post(`https://bynd-backend.onrender.com/sendnotification/${uniqueId}`);
      console.log(res.data.message);
    } catch (err) {
      console.log("unable to send the notification", err);
    }
  }

  sendNotification();
}, [uniqueId]);


  /* ---------- states ---------- */
 if (loading) {
  return (
    <div className="dp-loading-wrapper">
      <div className="dp-spinner"></div>
      <p className="dp-loading-text">Loading preview design…</p>
    </div>
  );
}

  if (!design?.ok) return <div className="dp-error">Not found</div>;

  const d = design.design;
  const pdfUrl = design.pdfUrl;

const finalPdfUrl =
  isMobile && pdfUrl
    ? `https://docs.google.com/gview?url=${encodeURIComponent(pdfUrl)}&embedded=true`
    : pdfUrl;


  const dateStr = new Date(d.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const timeStr = new Date(d.created_at).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="dp-wrapper">
      <div className="dp-header">
        <div className="dp-header-content">
          <h1 className="dp-title">{d.position || "Intern"}</h1>
          <div className="dp-meta">
            <span className="dp-author">{d.company_name}</span>
            <span className="dp-dot">•</span>
            <span className="dp-date">
              Submitted on {dateStr} at {timeStr}
            </span>
          </div>
        </div>
      </div>

      <div className="dp-main">
        <div className="dp-left">
          <div className="dp-preview-box" ref={previewRef}>
            {/* Layer selector (Figma only) */}
            {d.design_type === "figma" && layers.length > 0 && (
              <div className="dp-controls-overlay">
                <select
                  className="dp-layer-dropdown"
                  value={current}
                  onChange={(e) => setCurrent(Number(e.target.value))}
                >
                  {layers.map((l, i) => (
                    <option key={i} value={i}>
                      {l.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Fullscreen button */}
            <div className="preview-controls">
              <button
                className="expand-btn"
                onClick={toggleFullscreen}
                title="Fullscreen"
              >
                ⛶
              </button>
            </div>

            {/* Preview */}
            <div className="dp-document-canvas">
              {d.design_type === "figma" ? (
                <img
                  src={layers[current]?.url}
                  className="dp-preview-img"
                  alt="preview"
                />
              ) :  (
    <>
      {/* Mobile fallback open button */}
      {isMobile && (
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="open-pdf-btn"
        >
          Open document
        </a>
      )}

      {/* Preview */}
      {isMobile ? (
        <MobilePdfViewer url={pdfUrl} />
      ) : (
        <iframe
          src={pdfUrl}
          className="dp-preview-iframe"
          title="preview"
          allow="fullscreen"
        />
      )}
    </>
  )}
</div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="dp-right">
          <div className="dp-card dp-card-yellow">
            <div className="dp-card-header">Usage Terms</div>
            <div className="dp-card-body">
              <ul>
                <li>This design is shared for evaluation purposes only.</li>
                <li>The content is the intellectual property of the applicant.</li>
                <li>
                  Redistribution, duplication, or reuse is discouraged and may
                  be subject to follow-up.
                </li>
              </ul>
            </div>
          </div>

          <div className="dp-card dp-card-blue">
            <div className="dp-card-header">Documentation Notice</div>
            <div className="dp-card-body">
              <ul>
                <li>
                  This submission is documented by The BYND with activity logs,
                  timestamps, and owner details.
                </li>
                <li>
                  Viewing this assignment logs your access and supports a fair
                  review process.
                </li>
                <li>
                  The BYND helps ensure the designer receives credit for their
                  work through transparent documentation.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

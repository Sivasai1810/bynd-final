import { useEffect, useState, useRef } from "react"; 
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import "./employersview.css";

export default function EmployersPreview() {
  const navigate = useNavigate();
  const { uniqueId } = useParams();
  const previewRef = useRef(null); // 2. Create the ref

  const [loading, setLoading] = useState(true);
  const [design, setDesign] = useState(null);
  const [layers, setLayers] = useState([]);
  const [current, setCurrent] = useState(0);

  // 3. Updated Toggle Function using the ref
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      // Use previewRef.current to access the DOM element
      if (previewRef.current) {
        previewRef.current.requestFullscreen().catch((err) =>
          console.error('Fullscreen error:', err)
        );
      }
    } else {
      document.exitFullscreen();
    }
  }

  useEffect(() => {
    async function load() {
      try {
        // const res = await axios.get(`https://bynd-backend.onrender.com/api/preview/${uniqueId}`);
        const res = await axios.get(`https://bynd-backend.onrender.com/api/preview/${uniqueId}`);
        setDesign(res.data);
        setLayers(res.data.layers || []);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }
    load();
  }, [uniqueId]);

  if (loading) return <div className="dp-loading">Loading...</div>;
  if (!design?.ok) return <div className="dp-error">Not found</div>;

  const d = design.design;

  const dateStr = new Date(d.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  
  const timeStr = new Date(d.created_at).toLocaleTimeString("en-US", {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className="dp-wrapper">
      <div className="dp-header">
        <div className="dp-header-content">
          <h1 className="dp-title">{d.position || "intern"}</h1>
          <div className="dp-meta">
            <span className="dp-author">{d.company_name || "multiplefiles"}</span>
            <span className="dp-dot">•</span>
            <span className="dp-date">Submitted on {dateStr} at {timeStr}</span>
          </div>
        </div>
                  <div className="closex-btnx" onClick={() => navigate("/dashboard")} title="Close and go back">
  <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
</div>
      </div>

      <div className="dp-main">
        
        <div className="dp-left">
          {/* 4. Attach the ref here so this specific box goes fullscreen */}
          <div className="dp-preview-box" ref={previewRef}>
             
             {/* Controls Overlay */}
             {d.design_type === "figma" && layers.length > 0 && (
                <div className="dp-controls-overlay">
                    <select
                      className="dp-layer-dropdown"
                      value={current}
                      onChange={(e) => setCurrent(Number(e.target.value))}
                    >
                      {layers.map((l, i) => (
                        <option key={i} value={i}>{l.name}</option>
                      ))}
                    </select>
                </div>
             )}

  

             <div className="preview-controls" style={{ marginBottom: '10px' }}>
                <button 
                  className="expand-btn" 
                  onClick={toggleFullscreen} 
                  title="Expand to fullscreen"
                  style={{ cursor: 'pointer', background: 'none', border: 'none' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                  </svg>
                </button>
             </div>

            
            <div className="dp-document-canvas">
                {d.design_type === "figma" ? (
                  <img
                    src={layers[current].url}
                    className="dp-preview-img"
                    alt="preview"
                  />
                ) : (
                  <iframe
                    src={design.pdfUrl}
                    className="dp-preview-iframe"
                    title="preview"
                  ></iframe>
                )}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="dp-right">
          <div className="dp-card dp-card-yellow">
            <div className="dp-card-header">Usage Terms</div>
            <div className="dp-card-body">
              <ul>
                <li>This design is shared for evaluation purposes only.</li>
                <li>The content is the intellectual property of the applicant.</li>
                <li>Redistribution, duplication, or reuse is discouraged and may be subject to follow-up.</li>
              </ul>
            </div>
          </div>

          <div className="dp-card dp-card-blue">
            <div className="dp-card-header">Documentation Notice</div>
            <div className="dp-card-body">
              <ul>
                <li>This submission is documented by The BYND with activity logs, timestamps, and owner details.</li>
                <li>Viewing this assignment logs your access and supports a fair review process.</li>
                <li>The BYND helps ensure the designer receives credit for their work through transparent documentation.</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
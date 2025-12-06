// // SubmissionForm.jsx
// import React, { useState, useEffect } from 'react';
// import Addsymbol from "../../assets/addsymbol.svg";
// import DiscardModal from '../discard/DiscardModal';
// import TermsOfUseModal from '../../footer/TermsOfUse';
// import './SubmissionForm.css';

// export default function SubmissionForm({
//   showForm,
//   onClose,
//   pdfFile,
//   setPdfFile,
//   pastedUrl,
//   setPastedUrl,
//   companyName,
//   setCompanyName,
//   position,
//   setPosition,
//   onSubmit,
//   isSubmitting
// }) {
//   const [step, setStep] = useState(1);
//   const [termsAccepted, setTermsAccepted] = useState(false);
//   const [showDiscardModal, setShowDiscardModal] = useState(false);
//   const [isTyping, setIsTyping] = useState(false);
//   const [showTermsModal, setShowTermsModal] = useState(false);

//   useEffect(() => {
//     if (showForm) {
//       setStep(1);
//       setTermsAccepted(false);
//       setIsTyping(false);
//     }
//   }, [showForm]);

//   if (!showForm) return null;

//   const handleUrlChange = (e) => {
//     setPastedUrl(e.target.value);
//     setIsTyping(true);

//     setTimeout(() => {
//       setIsTyping(false);
//     }, 1000);
//   };

//   const handleNext = () => {
//     if (step === 1 && companyName && position) {
//       setStep(2);
//     } else if (step === 2 && ((pdfFile) || pastedUrl)) {
//       setStep(3);
//     }
//   };

//   const handleBack = () => {
//     if (step > 1) setStep(step - 1);
//   };

//   const handleSubmit = () => {
//     if (termsAccepted) {
//       onSubmit();
//     }
//   };

//   const handleCancelClick = () => {
//     setShowDiscardModal(true);
//   };

//   const handleStayHere = () => {
//     setShowDiscardModal(false);
//   };

//   const handleDiscardAndExit = () => {
//     setShowDiscardModal(false);
//     setPdfFile([]);
//     setPastedUrl("");
//     setCompanyName("");
//     setPosition("");
//     handleFormClose();
//   };

//   const handleFormClose = () => {
//     setStep(1);
//     setTermsAccepted(false);
//     onClose();
//   };

//   const handleTermsClick = (e) => {
//     e.preventDefault();
//     setShowTermsModal(true);
//   };

//   const isStep1Valid = companyName && position;
//   const isStep2Valid = (pdfFile || pastedUrl) && !isTyping;

//   return (
//     <>
//       <div className='form-container'>
//         <div className='form-box'>
//           <div className='form-header'>
//             {step > 1 && (
//               <button className='header-back-btn' onClick={handleBack}>
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//               </button>
//             )}
//             <button className='header-close-btn' onClick={handleCancelClick}>
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>

//           <div className='bynd-new-button'>
//             <img src={Addsymbol} width="24" height="20" viewBox="0 0 24 24" fill="none" alt="add" />
//           </div>

//           <div className='header-text'>
//             <p>New Design Submission</p>
//             <h6 className='step-indicator'>
//               Step {step} of 3: {step === 1 ? 'Company and assignment details' : step === 2 ? 'Assignment submission' : 'Assignment submission'}
//             </h6>
//           </div>

//           {step === 1 && (
//             <div className='form-step step-1'>
//               <div className='form-group'>
//                 <label className='side-heading'>Company name*</label>
//                 <input 
//                   type='text' 
//                   className='fields' 
//                   value={companyName} 
//                   onChange={(e) => setCompanyName(e.target.value)} 
//                   placeholder="Name of the company you're applying for"
//                 />
//               </div>

//               <div className='form-group'>
//                 <label className='side-heading'>Position applying for*</label>
//                 <input 
//                   type='text' 
//                   className='fields' 
//                   value={position} 
//                   onChange={(e) => setPosition(e.target.value)} 
//                   placeholder='What position are you applying for? (Ex. Product Design Intern)'
//                 />
//               </div>

//               <div className='info-box'>
//                 <div className='info-heading'>
//                   <h4>BYND Assignment upload tips</h4>
//                 </div>
//                 <ul>
//                   <li>Watch this 1 min <a href="#" className='info-link'>video</a> on how to upload assignments</li>
//                   <li>Use either Figma links or universal file formats (PDF, PNG or JPEG) to upload — both ensure clear, quality previews</li>
//                   <li>Choose whichever upload method feels easiest—BYND supports both seamlessly</li>
//                 </ul>
//               </div>

//               <div className='form-actions'>
//                 <button className='btn-secondary' onClick={handleCancelClick}>Cancel</button>
//                 <button className='btn-primary' onClick={handleNext} disabled={!isStep1Valid}>Next</button>
//               </div>
//             </div>
//           )}

//           {/* {step === 2 && (
//             <div className="form-step">

            
//               <div className="form-group">
//                 <label className="side-heading">Figma link</label>
//                 <div className="input-with-icon">
//                   <input
//                     type="text"
//                     className="fields"
//                     value={pastedUrl}
//                     onChange={handleUrlChange}
//                     placeholder="Add figma file URL"
//                     disabled={pdfFile !== null}
//                   />

//                   {pastedUrl && (
//                     <span className="input-icon success">
//                       <svg width="20" height="20" fill="none" stroke="currentColor">
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M5 13l4 4L19 7"
//                         />
//                       </svg>
//                     </span>
//                   )}
//                 </div>
//               </div>

//               <div className="divider">
//                 <span>OR</span>
//               </div>

          
//               <div className="form-group">
//                 <div className="file-upload-area">

              
//                   <input
//                     type="file"
//                     id="file-input"
//                     accept=".pdf,.jpg,.jpeg,.png"
//                     className="file-input-hidden"
//                     disabled={pastedUrl.trim() !== ""}
//                     onChange={(e) => {
//                       const file = e.target.files[0];
//                       setPdfFile(file || null);
//                     }}
//                   />

//                   <div className="file-upload-label">
//                     <p>Choose a PDF, JPEG, PNG file or drag & drop it here</p>

//                     <button
//                       type="button"
//                       className="browse-btn"
//                       onClick={() => document.getElementById("file-input").click()}
//                       disabled={pastedUrl.trim() !== ""}
//                     >
//                       Browse File
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {pdfFile && (
//                 <div className="uploaded-section">
//                   <h4 className="uploaded-heading">Uploaded file</h4>

//                   <div className="uploaded-box">
//                  <div className="uploaded-row">

  
//   <svg
//     width="18"
//     height="18"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.5"
//     viewBox="0 0 24 24"
//     className="file-icon"
//   >
//     <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
//     <path d="M14 2v6h6" />
//   </svg>

  
//   <span className="file-name">{pdfFile.name}</span>

  
//   <button
//     className="remove-file-btn-right"
//     onClick={() => setPdfFile(null)}
//   >
//     ×
//   </button>
// </div>

//                   </div>
//                 </div>
//               )}

              
//               <div className="form-actions">
//                 <button className="btn-secondary" onClick={handleCancelClick}>
//                   Cancel
//                 </button>

//                 <button
//                   className="btn-primary"
//                   onClick={handleNext}
//                   disabled={!(pdfFile || pastedUrl)}
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           )} */}
//            {step === 2 && (
//             <div className="form-step">

//               {/* FIGMA URL */}
//               <div className="form-group">
//                 <label>Figma link</label>
//                 <input
//                   className="fields"
//                   value={pastedUrl}
//                   onChange={handleUrlChange}
//                   placeholder="Figma URL"
//                   disabled={pdfFile.length > 0}
//                 />
//               </div>

//               <div className="divider"><span>OR</span></div>

//               {/* MULTIPLE FILE UPLOAD */}
//               <div className="form-group">
//                 <input
//                   type="file"
//                   id="file-input"
//                   accept=".pdf,.jpg,.jpeg,.png"
//                   multiple
//                   className="file-input-hidden"
//                   disabled={pastedUrl.trim() !== ""}
//                   onChange={(e) => {
//                     const files = Array.from(e.target.files);
//                     setPdfFile((prev) => [...prev, ...files]);
//                   }}
//                 />

//                 <div className="file-upload-area">
//                   <p>Upload multiple PDF, PNG, JPEG files</p>

//                   <button
//                     type="button"
//                     className="browse-btn"
//                     onClick={() => document.getElementById("file-input").click()}
//                     disabled={pastedUrl.trim() !== ""}
//                   >
//                     Browse Files
//                   </button>
//                 </div>
//               </div>

//               {/* Uploaded Files List */}
//               {pdfFile.length > 0 && (
//                 <div className="uploaded-section">
//                   <h4>Uploaded Files</h4>

//                   {pdfFile.map((file, index) => (
//                     <div className="uploaded-row" key={index}>

//                       {/* S.No */}
//                       <span className="file-index">{index + 1}.</span>

//                       {/* Drag Handle */}
//                       <span className="drag-handle">⋮⋮⋮</span>

//                       {/* File Icon */}
//                       <svg width="18" height="18" stroke="currentColor" className="file-icon">
//                         <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
//                         <path d="M14 2v6h6" />
//                       </svg>

//                       {/* File Name */}
//                       <span className="file-name">{file.name}</span>

//                       {/* Remove */}
//                       <button
//                         className="remove-file-btn-right"
//                         onClick={() =>
//                           setPdfFile((prev) =>
//                             prev.filter((_, i) => i !== index)
//                           )
//                         }
//                       >
//                         ×
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               <div className="form-actions">
//                 <button className="btn-secondary" onClick={handleCancelClick}>Cancel</button>
//                 <button
//                   className="btn-primary"
//                   onClick={handleNext}
//                   disabled={(pdfFile.length === 0 && pastedUrl.trim() === "")}
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           )}


//           {/* Step 3: Summary & Submit */}
//           {step === 3 && (
//             <div className='form-step'>
//               <div className='submission-summary'>
//                 <div className='submission-tables'>
//                   <h3>Submission Summary</h3>
//                 </div>
            
//                 <div className='summary-grid'>
//                   <div className='summary-item'>
//                     <label>Company</label>
//                     <p>{companyName}</p>
//                   </div>
//                   <div className='summary-item'>
//                     <label>Position</label>
//                     <p>{position}</p>
//                   </div>
//                 </div>
//                 <div className='summary-item full-width'>
//                   <label>Design file</label>
//                   <p className='design-link'>
//                     {pastedUrl || (pdfFile ? pdfFile.name : 'No file')}
//                   </p>
//                 </div>
//               </div>

//               <div className='ready-message'>
//                 <h3>Your submission is ready to go! 🚀</h3>
//                 <p>We'll generate a polished, trackable link you can share with the recruiter. You'll be able to monitor if and when they view your assignment.</p>
//               </div>

//               <div className='terms-checkbox'>
//                 <input 
//                   type='checkbox' 
//                   id='terms' 
//                   checked={termsAccepted} 
//                   onChange={(e) => setTermsAccepted(e.target.checked)}
//                 />
//                 <label htmlFor='terms'>
//                   I have read and agreed to the <a href='#' className='info-link' onClick={handleTermsClick}>terms of use</a> of BYND.
//                 </label>
//               </div>

//               <div className='form-actions'>
//                 <button className='btn-secondary' onClick={handleCancelClick}>Cancel</button>
//                 <button 
//                   className='btn-primary' 
//                   onClick={handleSubmit} 
//                   disabled={!termsAccepted || isSubmitting}
//                 >
//                   {isSubmitting ? 'Submitting...' : 'Submit and Generate'}
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <DiscardModal 
//         isOpen={showDiscardModal}
//         onStay={handleStayHere}
//         onDiscard={handleDiscardAndExit}
//       />

//       <TermsOfUseModal 
//         isOpen={showTermsModal}
//         onClose={() => setShowTermsModal(false)}
//       />
//     </>
//   );
// }
// SubmissionForm.jsx
// SubmissionForm.jsx
// import React, { useState, useEffect } from 'react';
// import Addsymbol from "../../assets/addsymbol.svg";
// import DiscardModal from '../discard/DiscardModal';
// import TermsOfUseModal from '../../footer/TermsOfUse';
// import './SubmissionForm.css';
// import {
//   DndContext,
//   closestCenter,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import {
//   SortableContext,
//   arrayMove,
//   verticalListSortingStrategy,
//   useSortable,
// } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// function SortableItem({ id, index, file, onRemove, dragHandleClass }) {
//   // useSortable gives us refs/attributes/listeners and transform/transition for smooth movement
//   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   return (
//     <div ref={setNodeRef} style={style} className="uploaded-file-row">
//       <span className="file-number">{index + 1}.</span>

//       <span className="file-icon-area" aria-hidden>
//         <svg
//           width="14"
//           height="14"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="#6B7280"
//           strokeWidth="1.5"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
//           <path d="M14 2v6h6" />
//         </svg>
//       </span>

//       <span className="file-name-text" title={file.name}>{file.name}</span>

//       {/* Drag handle: attach drag listeners/attributes here so it acts as the handle */}
//       <span
//         className={dragHandleClass || "drag-handle"}
//         {...attributes}
//         {...listeners}
//         aria-label={`Drag ${file.name}`}
//       >
//         ⋮⋮
//       </span>

//       <button
//         className="delete-file-btn"
//         onClick={() => onRemove(index)}
//         aria-label={`Remove ${file.name}`}
//       >
//         ×
//       </button>
//     </div>
//   );
// }
// export default function SubmissionForm({
//   showForm,
//   onClose,
//   pdfFile,
//   setPdfFile,
//   pastedUrl,
//   setPastedUrl,
//   companyName,
//   setCompanyName,
//   position,
//   setPosition,
//   onSubmit,
//   isSubmitting
// }) {
//   const [step, setStep] = useState(1);
//   const [termsAccepted, setTermsAccepted] = useState(false);
//   const [showDiscardModal, setShowDiscardModal] = useState(false);
//   const [isTyping, setIsTyping] = useState(false);
//   const [showTermsModal, setShowTermsModal] = useState(false);

//   // Make a safe array to use when rendering/logic so we never depend on pdfFile being an array
//   const safePdfFiles = Array.isArray(pdfFile) ? pdfFile : [];

//   useEffect(() => {
//     if (showForm) {
//       setStep(1);
//       setTermsAccepted(false);
//       setIsTyping(false);
//     }
//   }, [showForm]);

//   if (!showForm) return null;

//   const handleUrlChange = (e) => {
//     setPastedUrl(e.target.value);
//     setIsTyping(true);

//     setTimeout(() => {
//       setIsTyping(false);
//     }, 1000);
//   };

//   const handleNext = () => {
//     if (step === 1 && companyName && position) {
//       setStep(2);
//     } else if (step === 2 && (safePdfFiles.length > 0 || pastedUrl.trim())) {
//       setStep(3);
//     }
//   };

//   const handleBack = () => {
//     if (step > 1) setStep(step - 1);
//   };

//   const handleSubmit = () => {
//     if (termsAccepted) {
//       onSubmit();
//     }
//   };

//   const handleCancelClick = () => {
//     setShowDiscardModal(true);
//   };

//   const handleStayHere = () => {
//     setShowDiscardModal(false);
//   };

//   const handleDiscardAndExit = () => {
//     setShowDiscardModal(false);
//     setPdfFile([]); // always reset to array
//     setPastedUrl("");
//     setCompanyName("");
//     setPosition("");
//     handleFormClose();
//   };

//   const handleFormClose = () => {
//     setStep(1);
//     setTermsAccepted(false);
//     onClose();
//   };

//   const handleTermsClick = (e) => {
//     e.preventDefault();
//     setShowTermsModal(true);
//   };


//   const isStep1Valid = companyName && position;

//   return (
//     <>
//           <div className='form-container'>
//          <div className='form-box'>
//            <div className='form-header'>
//              {step > 1 && (
//               <button className='header-back-btn' onClick={handleBack}>
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//               </button>
//             )}
//             <button className='header-close-btn' onClick={handleCancelClick}>
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>

//           <div className='bynd-new-button'>
//             <img src={Addsymbol} width="24" height="20" viewBox="0 0 24 24" fill="none" alt="add" />
//           </div>

//           <div className='header-text'>
//             <p>New Design Submission</p>
//             <h6 className='step-indicator'>
//               Step {step} of 3: {step === 1 ? 'Company and assignment details' : step === 2 ? 'Assignment submission' : 'Assignment submission'}
//             </h6>
//           </div>

//           {step === 1 && (
//             <div className='form-step step-1'>
//               <div className='form-group'>
//                 <label className='side-heading'>Company name*</label>
//                 <input 
//                   type='text' 
//                   className='fields' 
//                   value={companyName} 
//                   onChange={(e) => setCompanyName(e.target.value)} 
//                   placeholder="Name of the company you're applying for"
//                 />
//               </div>

//               <div className='form-group'>
//                 <label className='side-heading'>Position applying for*</label>
//                 <input 
//                   type='text' 
//                   className='fields' 
//                   value={position} 
//                   onChange={(e) => setPosition(e.target.value)} 
//                   placeholder='What position are you applying for? (Ex. Product Design Intern)'
//                 />
//               </div>

//               <div className='info-box'>
//                 <div className='info-heading'>
//                   <h4>BYND Assignment upload tips</h4>
//                 </div>
//                 <ul>
//                   <li>Watch this 1 min <a href="#" className='info-link'>video</a> on how to upload assignments</li>
//                   <li>Use either Figma links or universal file formats (PDF, PNG or JPEG) to upload — both ensure clear, quality previews</li>
//                   <li>Choose whichever upload method feels easiest—BYND supports both seamlessly</li>
//                 </ul>
//               </div>

//               <div className='form-actions'>
//                 <button className='btn-secondary' onClick={handleCancelClick}>Cancel</button>
//                 <button className='btn-primary' onClick={handleNext} disabled={!isStep1Valid}>Next</button>
//               </div>
//             </div>
//           )}

//           {step === 2 && (
//             <div className="form-step">

//               {/* Figma Link */}
//               <div className="form-group">
//                 <label className="side-heading">Figma link</label>
//                 <div className="input-with-icon">
//                   <input
//                     type="text"
//                     className="fields"
//                     value={pastedUrl}
//                     onChange={handleUrlChange}
//                     placeholder="Add figma file URL"
//                     disabled={safePdfFiles.length > 0}
//                   />

//                   {pastedUrl && (
//                     <span className="input-icon success">
//                       <svg width="20" height="20" fill="none" stroke="currentColor">
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M5 13l4 4L19 7"
//                         />
//                       </svg>
//                     </span>
//                   )}
//                 </div>
//               </div>

//               <div className="divider">
//                 <span>OR</span>
//               </div>

//               {/* MULTIPLE FILE UPLOAD */}
//               <div className="form-group">
//                 <input
//                   type="file"
//                   id="file-input"
//                   accept=".pdf,.jpg,.jpeg,.png"
//                   multiple
//                   className="file-input-hidden"
//                   disabled={pastedUrl.trim() !== ""}
//                   onChange={(e) => {
//                     const files = Array.from(e.target.files);
//                     // defensive update: if prev is not array, treat as empty array
//                     setPdfFile((prev) => {
//                       const base = Array.isArray(prev) ? prev : [];
//                       return [...base, ...files];
//                     });
//                   }}
//                 />

//                 <div className="file-upload-area">
//                   <p>Choose a PDF, JPEG, PNG file or drag & drop it here</p>

//                   <button
//                     type="button"
//                     className="browse-btn"
//                     onClick={() => document.getElementById("file-input").click()}
//                     disabled={pastedUrl.trim() !== ""}
//                   >
//                     Browse Files
//                   </button>
//                 </div>
//               </div>
// {/* Uploaded files title OUTSIDE the box */}
// {/* <p className="uploaded-files-title">Uploaded files</p>

// <div className="uploaded-files-box">
//   <div className="uploaded-files-scroll">
//     {safePdfFiles.map((file, index) => (
//       <div className="uploaded-file-row" key={index}>

//         <span className="file-number">{index + 1}.</span>

//         <span className="file-icon-area">
//   <svg
//     width="14"
//     height="14"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="#6B7280"
//     strokeWidth="1.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
//     <path d="M14 2v6h6" />
//   </svg>
// </span>


//         <span className="file-name-text">{file.name}</span>

//         <span className="drag-handle">⋮⋮</span>

//         <button
//           className="delete-file-btn"
//           onClick={() => setPdfFile(prev => prev.filter((_, i) => i !== index))}
//         >
//           ×
//         </button>

//       </div>
//     ))}
//   </div>
// </div> */}
// {/* Title outside the box */}
// <p className="uploaded-files-title">Uploaded files</p>

// <div className="uploaded-files-box">
//   <DndContext
//     sensors={useSensors(useSensor(PointerSensor))}
//     collisionDetection={closestCenter}
//     onDragEnd={(event) => {
//       const { active, over } = event;
//       if (!over || active.id === over.id) return;

//       // compute new ordered array based on id keys
//       setPdfFile((prev) => {
//         const prevArr = Array.isArray(prev) ? prev : [];
//         // helper to create a stable key from a File object
//         const key = (f) => `${f.name}_${f.size}_${f.lastModified}`;
//         const oldIndex = prevArr.findIndex((f) => key(f) === active.id);
//         const newIndex = prevArr.findIndex((f) => key(f) === over.id);
//         if (oldIndex === -1 || newIndex === -1) return prevArr;
//         return arrayMove(prevArr, oldIndex, newIndex);
//       });
//     }}
//   >
//     <SortableContext
//       items={safePdfFiles.map((f) => `${f.name}_${f.size}_${f.lastModified}`)}
//       strategy={verticalListSortingStrategy}
//     >
//       <div className="uploaded-files-scroll">
//         {safePdfFiles.map((file, index) => {
//           const idKey = `${file.name}_${file.size}_${file.lastModified}`;
//           return (
//             <SortableItem
//               key={idKey}
//               id={idKey}
//               index={index}
//               file={file}
//               onRemove={(i) =>
//                 setPdfFile((prev) => {
//                   const base = Array.isArray(prev) ? prev : [];
//                   return base.filter((_, idx) => idx !== i);
//                 })
//               }
//               dragHandleClass="drag-handle"
//             />
//           );
//         })}
//       </div>
//     </SortableContext>
//   </DndContext>
// </div>



//               <div className="form-actions">
//                 <button className="btn-secondary" onClick={handleCancelClick}>Cancel</button>
//                 <button
//                   className="btn-primary"
//                   onClick={handleNext}
//                   disabled={(safePdfFiles.length === 0 && pastedUrl.trim() === "")}
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Step 3: Summary & Submit */}
       
//            {step === 3 && (
//             <div className='form-step'>
//               <div className='submission-summary'>
//                 <div className='submission-tables'>
//                   <h3>Submission Summary</h3>
//                 </div>
            
//                 <div className='summary-grid'>
//                   <div className='summary-item'>
//                     <label>Company</label>
//                     <p>{companyName}</p>
//                   </div>
//                   <div className='summary-item'>
//                     <label>Position</label>
//                     <p>{position}</p>
//                   </div>
//                 </div>
//                 <div className='summary-item full-width'>
//                   <label>Design file</label>
//                   <p className='design-link'>
//                     {pastedUrl || (safePdfFiles.length > 0 ? safePdfFiles.map(f => f.name).join(', ') : 'No file')}
//                   </p>
//                 </div>
//               </div>

//               <div className='ready-message'>
//                 <h3>Your submission is ready to go! 🚀</h3>
//                 <p>We'll generate a polished, trackable link you can share with the recruiter. You'll be able to monitor if and when they view your assignment.</p>
//               </div>

//               <div className='terms-checkbox'>
//                 <input 
//                   type='checkbox' 
//                   id='terms' 
//                   checked={termsAccepted} 
//                   onChange={(e) => setTermsAccepted(e.target.checked)}
//                 />
//                 <label htmlFor='terms'>
//                   I have read and agreed to the <a href='#' className='info-link' onClick={handleTermsClick}>terms of use</a> of BYND.
//                 </label>
//               </div>

//               <div className='form-actions'>
//                 <button className='btn-secondary' onClick={handleCancelClick}>Cancel</button>
//                 <button 
//                   className='btn-primary' 
//                   onClick={handleSubmit} 
//                   disabled={!termsAccepted || isSubmitting}
//                 >
//                   {isSubmitting ? 'Submitting...' : 'Submit and Generate'}
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <DiscardModal 
//         isOpen={showDiscardModal}
//         onStay={handleStayHere}
//         onDiscard={handleDiscardAndExit}
//       />

//       <TermsOfUseModal 
//         isOpen={showTermsModal}
//         onClose={() => setShowTermsModal(false)}
//       />
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import Addsymbol from "../../assets/addsymbol.svg";
import DiscardModal from "../discard/DiscardModal";
import TermsOfUseModal from "../../footer/TermsOfUse";
import "./SubmissionForm.css";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

/*
  NOTE:
  - SortableItem is declared OUTSIDE the main SubmissionForm component
    so that hooks used inside SortableItem (useSortable) do not affect
    the hook order inside SubmissionForm.
*/

// Small helper to render each sortable row
function SortableItem({ id, index, file, onRemove, dragHandleClass }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="uploaded-file-row" role="listitem">
      <span className="file-number">{index + 1}.</span>

      <span className="file-icon-area" aria-hidden>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#6B7280"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
        </svg>
      </span>

      <span className="file-name-text" title={file.name}>
        {file.name}
      </span>

      <span
        className={dragHandleClass || "drag-handle"}
        {...attributes}
        {...listeners}
        aria-label={`Drag ${file.name}`}
        role="button"
      >
        ⋮⋮
      </span>

      <button
        className="delete-file-btn"
        onClick={() => onRemove(index)}
        aria-label={`Remove ${file.name}`}
      >
        ×
      </button>
    </div>
  );
}

export default function SubmissionForm({
  showForm,
  onClose,
  pdfFile,
  setPdfFile,
  pastedUrl,
  setPastedUrl,
  companyName,
  setCompanyName,
  position,
  setPosition,
  onSubmit,
  isSubmitting,
}) {
  // --- local UI state
  const [step, setStep] = useState(1);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  // normalize pdfFile (you confirmed it's always an array) but be defensive
  const safePdfFiles = Array.isArray(pdfFile) ? pdfFile : [];

  // dnd-kit sensors (hooks must stay at top-level)
  const pointerSensor = useSensor(PointerSensor);
  const sensors = useSensors(pointerSensor);

  useEffect(() => {
    if (showForm) {
      setStep(1);
      setTermsAccepted(false);
      setIsTyping(false);
    }
  }, [showForm]);

  if (!showForm) return null;

  const handleUrlChange = (e) => {
    setPastedUrl(e.target.value);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };

  const handleNext = () => {
    if (step === 1 && companyName && position) {
      setStep(2);
    } else if (step === 2 && (safePdfFiles.length > 0 || pastedUrl.trim())) {
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    if (termsAccepted) {
      onSubmit();
    }
  };

  const handleCancelClick = () => {
    setShowDiscardModal(true);
  };

  const handleStayHere = () => {
    setShowDiscardModal(false);
  };

  const handleDiscardAndExit = () => {
    setShowDiscardModal(false);
    setPdfFile([]); // always reset to array
    setPastedUrl("");
    setCompanyName("");
    setPosition("");
    setStep(1);
    setTermsAccepted(false);
    onClose();
  };

  const handleTermsClick = (e) => {
    e.preventDefault();
    setShowTermsModal(true);
  };

  // helper to create a stable id for each File object
  const fileKey = (f) => `${f.name}_${f.size}_${f.lastModified}`;

  // DnD onDragEnd handler: reorder pdfFile array
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setPdfFile((prev) => {
      const base = Array.isArray(prev) ? prev.slice() : [];
      const oldIndex = base.findIndex((f) => fileKey(f) === active.id);
      const newIndex = base.findIndex((f) => fileKey(f) === over.id);

      if (oldIndex === -1 || newIndex === -1) return base;
      return arrayMove(base, oldIndex, newIndex);
    });
  };

  const isStep1Valid = companyName && position;

  return (
    <>
      <div className="form-container">
        <div className="form-box">
          <div className="form-header">
            {step > 1 && (
              <button
                className="header-back-btn"
                onClick={() => setStep((s) => Math.max(1, s - 1))}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <button className="header-close-btn" onClick={handleCancelClick}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="bynd-new-button">
            <img src={Addsymbol} width="24" height="20" alt="add" />
          </div>

          <div className="header-text">
            <p>New Design Submission</p>
            <h6 className="step-indicator">
              Step {step} of 3: {step === 1 ? "Company and assignment details" : step === 2 ? "Assignment submission" : "Assignment submission"}
            </h6>
          </div>

          {step === 1 && (
            <div className="form-step step-1">
              <div className="form-group">
                <label className="side-heading">Company name*</label>
                <input
                  type="text"
                  className="fields"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Name of the company you're applying for"
                />
              </div>

              <div className="form-group">
                <label className="side-heading">Position applying for*</label>
                <input
                  type="text"
                  className="fields"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="What position are you applying for? (Ex. Product Design Intern)"
                />
              </div>

              <div className="info-box">
                <div className="info-heading">
                  <h4>BYND Assignment upload tips</h4>
                </div>
                <ul>
                  <li>Watch this 1 min <a href="#" className="info-link">video</a> on how to upload assignments</li>
                  <li>Use either Figma links or universal file formats (PDF, PNG or JPEG) to upload — both ensure clear, quality previews</li>
                  <li>Choose whichever upload method feels easiest—BYND supports both seamlessly</li>
                </ul>
              </div>

              <div className="form-actions">
                <button className="btn-secondary" onClick={handleCancelClick}>Cancel</button>
                <button className="btn-primary" onClick={handleNext} disabled={!isStep1Valid}>Next</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-step">

              {/* FIGMA LINK */}
              <div className="form-group">
                <label className="side-heading">Figma link</label>
                <div className="input-with-icon">
                  <input
                    type="text"
                    className="fields"
                    value={pastedUrl}
                    onChange={handleUrlChange}
                    placeholder="Add figma file URL"
                    disabled={safePdfFiles.length > 0}
                  />

                  {pastedUrl && (
                    <span className="input-icon success">
                      <svg width="20" height="20" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                </div>
              </div>

              <div className="divider"><span>OR</span></div>

              {/* MULTIPLE FILE UPLOAD */}
              <div className="form-group">
                <input
                  type="file"
                  id="file-input"
                  accept=".pdf,.jpg,.jpeg,.png"
                  multiple
                  className="file-input-hidden"
                  disabled={pastedUrl.trim() !== ""}
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    setPdfFile((prev) => {
                      const base = Array.isArray(prev) ? prev : [];
                      return [...base, ...files];
                    });
                  }}
                />

                <div className="file-upload-area">
                  <p>Upload multiple PDF, PNG, JPEG files</p>

                  <button
                    type="button"
                    className="browse-btn"
                    onClick={() => document.getElementById("file-input").click()}
                    disabled={pastedUrl.trim() !== ""}
                  >
                    Browse Files
                  </button>
                </div>
              </div>

              {/* Uploaded files title (outside box) */}
             {/* Show uploaded files section ONLY when files exist */}
{safePdfFiles.length > 0 && (
  <>
    <p className="uploaded-files-title">Uploaded files</p>

    <div className="uploaded-files-box" aria-live="polite">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={safePdfFiles.map((f) => fileKey(f))}
          strategy={verticalListSortingStrategy}
        >
          <div className="uploaded-files-scroll" role="list">
            {safePdfFiles.map((file, index) => {
              const idKey = fileKey(file);
              return (
                <SortableItem
                  key={idKey}
                  id={idKey}
                  index={index}
                  file={file}
                  onRemove={(i) =>
                    setPdfFile((prev) => {
                      const base = Array.isArray(prev) ? prev : [];
                      return base.filter((_, idx) => idx !== i);
                    })
                  }
                  dragHandleClass="drag-handle"
                />
              );
            })}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  </>
)}


              <div className="form-actions">
                <button className="btn-secondary" onClick={handleCancelClick}>Cancel</button>
                <button
                  className="btn-primary"
                  onClick={handleNext}
                  disabled={safePdfFiles.length === 0 && pastedUrl.trim() === ""}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="form-step">
              <div className="submission-summary">
                <div className="submission-tables">
                  <h3>Submission Summary</h3>
                </div>

                <div className="summary-grid">
                  <div className="summary-item">
                    <label>Company</label>
                    <p>{companyName}</p>
                  </div>
                  <div className="summary-item">
                    <label>Position</label>
                    <p>{position}</p>
                  </div>
                </div>

                <div className="summary-item full-width">
                  <label>Design file</label>
                  <p className="design-link">
                    {pastedUrl || (safePdfFiles.length > 0 ? safePdfFiles.map((f) => f.name).join(", ") : "No file")}
                  </p>
                </div>
              </div>

              <div className="ready-message">
                <h3>Your submission is ready to go! 🚀</h3>
                <p>We'll generate a polished, trackable link you can share with the recruiter. You'll be able to monitor if and when they view your assignment.</p>
              </div>

              <div className="terms-checkbox">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <label htmlFor="terms">
                  I have read and agreed to the <a href="#" className="info-link" onClick={handleTermsClick}>terms of use</a> of BYND.
                </label>
              </div>

              <div className="form-actions">
                <button className="btn-secondary" onClick={handleCancelClick}>Cancel</button>
                <button
                  className="btn-primary"
                  onClick={handleSubmit}
                  disabled={!termsAccepted || isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit and Generate"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <DiscardModal
        isOpen={showDiscardModal}
        onStay={handleStayHere}
        onDiscard={handleDiscardAndExit}
      />

      <TermsOfUseModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
      />
    </>
  );
}

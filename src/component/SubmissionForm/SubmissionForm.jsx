import React from 'react';
import './SubmissionForm.css';

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
  isSubmitting
}) {
  if (!showForm) return null;

  return (
    <div className='form-container'>
      <div className='form-box'>
        <p className='close-btn' onClick={onClose}>x</p>
        <div className='header-text'>
          <p>New <span>Design</span> Submission</p>
        </div>
        <span className='side-heading'>Upload Design PDF (Optional)</span>
        <input 
          type='file' 
          accept=".pdf"
          className='fields' 
          onChange={(e) => setPdfFile(e.target.files[0])} 
          disabled={pastedUrl.trim() !== ""}
        />
        <span className='side-heading'>Paste Design URL*</span>
        <input 
          type='text' 
          className='fields' 
          value={pastedUrl} 
          onChange={(e) => setPastedUrl(e.target.value)} 
          placeholder='http://examplefigma-url.com' 
          disabled={pdfFile !== null}
        />
        <span className='side-heading'>Company Name*</span>
        <input 
          type='text' 
          className='fields' 
          value={companyName} 
          onChange={(e) => setCompanyName(e.target.value)} 
          placeholder='Enter Company name'
        />
        <span className='side-heading'>Position*</span>
        <input 
          type='text' 
          className='fields' 
          value={position} 
          onChange={(e) => setPosition(e.target.value)} 
          placeholder='Enter position'
        />
        <button 
          onClick={onSubmit} 
          disabled={!companyName || !position || (!pdfFile && !pastedUrl) || isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  );
}
import React, { useState ,useEffect} from 'react';
import Addsymbol from "../../assets/addsymbol.svg"
import DiscardModal from '../discard/DiscardModal';
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
  const [step, setStep] = useState(1);
  const [termsAccepted,setTermsAccepted] = useState(false);
  const [showDiscardModal,setShowDiscardModal] = useState(false);

 
useEffect(() => {
  if (showForm) {
    setStep(1);
    setTermsAccepted(false);
  }
}, [showForm]);
 if (!showForm) return null;

  const handleNext = () => {
    if (step === 1 && companyName && position) {
      setStep(2);
    } else if (step === 2 && (pdfFile || pastedUrl)) {
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
    // Check if user has started filling the form
    // if (companyName || position || pdfFile || pastedUrl) {
    //   setShowDiscardModal(true);
    // } else {
    //   handleFormClose();
    // }
    setShowDiscardModal(true)
  };

  const handleStayHere = () => {
    setShowDiscardModal(false);
  };

  const handleDiscardAndExit = () => {
    setShowDiscardModal(false);
    setPdfFile(null)
    setPastedUrl("")
    setCompanyName("")
    setPosition("")
    handleFormClose();
  };

  const handleFormClose = () => {
    setStep(1);
    setTermsAccepted(false);
    onClose();
  };

  const isStep1Valid = companyName && position;
  const isStep2Valid = pdfFile || pastedUrl;

  return (
    <>
      <div className='form-container'>
        <div className='form-box'>
          <div className='form-header'>
            {step > 1 && (
              <button className='back-btn' onClick={handleBack}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <button className='close-btn' onClick={handleCancelClick}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className='bynd-new-button'>
            <img src={Addsymbol} width="24" height="20" viewBox="0 0 24 24" fill="none"></img>
          </div>

          <div className='header-text'>
            <p>New Design Submission</p>
            <h6 className='step-indicator'>
              Step {step} of 3: {step === 1 ? 'Company and assignment details' : step === 2 ? 'Assignment submission' : 'Assignment submission'}
            </h6>
          </div>

          {/* Step 1: Company Details */}
          {step === 1 && (
            <div className='form-step'>
              <div className='form-group'>
                <label className='side-heading'>Company name*</label>
                <input 
                  type='text' 
                  className='fields' 
                  value={companyName} 
                  onChange={(e) => setCompanyName(e.target.value)} 
                  placeholder="Name of the company you're applying for"
                />
              </div>

              <div className='form-group'>
                <label className='side-heading'>Position applying for*</label>
                <input 
                  type='text' 
                  className='fields' 
                  value={position} 
                  onChange={(e) => setPosition(e.target.value)} 
                  placeholder='What position are you applying for? (Ex. Product Design Intern)'
                />
              </div>

              <div className='info-box'>
                <div className= 'info-heading'>
                <h4>BYND Assignment upload tips</h4>
                </div>
                <ul>
                  <li>Watch this 1 min <a href="#" className='info-link'>video</a> on how to upload assignments</li>
                  <li>Use either Figma links or universal file formats (PDF, PNG or JPEG) to upload — both ensure clear, quality previews</li>
                  <li>Choose whichever upload method feels easiest—BYND supports both seamlessly</li>
                </ul>
              </div>

              <div className='form-actions'>
                <button className='btn-secondary' onClick={handleCancelClick}>Cancel</button>
                <button className='btn-primary' onClick={handleNext} disabled={!isStep1Valid}>Next</button>
              </div>
            </div>
          )}

          {/* Step 2: File Upload */}
          {step === 2 && (
            <div className='form-step'>
              <div className='form-group'>
                <label className='side-heading'>Figma link</label>
                <div className='input-with-icon'>
                  <input 
                    type='text' 
                    className='fields' 
                    value={pastedUrl} 
                    onChange={(e) => setPastedUrl(e.target.value)} 
                    placeholder='https://www.figma.com/design/...' 
                    disabled={pdfFile !== null}
                  />
                  {pastedUrl && (
                    <span className='input-icon success'>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                </div>
              </div>

              <div className='divider'>
                <span>OR</span>
              </div>

              <div className='form-group'>
                <div className='file-upload-area'>
                  <input 
                    type='file' 
                    id='file-input'
                    accept=".pdf,.jpeg,.jpg,.png"
                    className='file-input-hidden' 
                    onChange={(e) => setPdfFile(e.target.files[0])} 
                    disabled={pastedUrl.trim() !== ""}
                  />
                  <label htmlFor='file-input' className='file-upload-label'>
                  
                    <p>Choose a PDF, JPEG, PNG file or drag & drop it here</p>
                    <button type='button' className='browse-btn' disabled={pastedUrl.trim() !== ""}>Browse File</button>
                  </label>
                  {pdfFile && (
                    <div className='file-selected'>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>{pdfFile.name}</span>
                      <button onClick={() => setPdfFile(null)} className='remove-file'>×</button>
                    </div>
                  )}
                </div>
              </div>

              <div className='form-actions'>
                <button className='btn-secondary' onClick={handleCancelClick}>Cancel</button>
                <button className='btn-primary' onClick={handleNext} disabled={!isStep2Valid}>Next</button>
              </div>
            </div>
          )}

          {/* Step 3: Summary & Submit */}
          {step === 3 && (
            <div className='form-step'>
              <div className='submission-summary'>
           <div className='submission-tables'>
                  <h3>Submission Summary</h3>
           </div>
            
                <div className='summary-grid'>
                  <div className='summary-item'>
                    <label>Company</label>
                    <p>{companyName}</p>
                  </div>
                  <div className='summary-item'>
                    <label>Position</label>
                    <p>{position}</p>
                  </div>
                </div>
                <div className='summary-item full-width'>
                  <label>Design file</label>
                  <p className='design-link'>
                    {pastedUrl || pdfFile?.name}
                  </p>
                </div>
              </div>

              <div className='ready-message'>
                <h3>Your submission is ready to go! 🚀</h3>
                <p>We'll generate a polished, trackable link you can share with the recruiter. You'll be able to monitor if and when they view your assignment.</p>
              </div>

              <div className='terms-checkbox'>
                <input 
                  type='checkbox' 
                  id='terms' 
                  checked={termsAccepted} 
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <label htmlFor='terms'>
                  I have read and agreed to the <a href='#' className='info-link'>terms of use</a> of BYND.
                </label>
              </div>

              <div className='form-actions'>
                <button className='btn-secondary' onClick={handleCancelClick}>Cancel</button>
                <button 
                  className='btn-primary' 
                  onClick={handleSubmit} 
                  disabled={!termsAccepted || isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit and Generate'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Discard Modal */}
      <DiscardModal 
        isOpen={showDiscardModal}
        onStay={handleStayHere}
        onDiscard={handleDiscardAndExit}
      />
    </>
  );
}
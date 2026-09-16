'use client';

import Link from 'next/link';
import { Icon } from '@/components/icon';
import { useEffect, useRef, useState, type FormEvent, type InputHTMLAttributes } from 'react';
import { emptyQuote, incoterms, inquirySummary, localToday, stepFields, validateQuote, type QuoteDraft, type QuoteErrors } from './validation';

const steps = ['Route', 'Cargo', 'Contact', 'Review'];

export default function QuoteForm() {
  const [draft, setDraft] = useState<QuoteDraft>({ ...emptyQuote });
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [complete, setComplete] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const focusTarget = useRef<string | null>(null);

  useEffect(() => {
    if (!focusTarget.current) return;
    if (focusTarget.current === 'heading') heading.current?.focus();
    else document.getElementById(`quote-${focusTarget.current === 'mode' ? 'mode-Air' : focusTarget.current}`)?.focus();
    focusTarget.current = null;
  }, [step, errors, complete]);

  function update(key: keyof QuoteDraft, value: string) {
    setDraft((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateQuote(draft, step === 3 ? undefined : step);
    const firstError = Object.keys(nextErrors)[0] as keyof QuoteDraft | undefined;
    setErrors(nextErrors);
    if (firstError) {
      focusTarget.current = firstError;
      setStep(stepFields.findIndex((fields) => fields.includes(firstError)));
      return;
    }
    focusTarget.current = 'heading';
    if (step === 3) setComplete(true);
    else setStep(step + 1);
  }

  function goBack() {
    focusTarget.current = 'heading';
    setErrors({});
    setStep(step - 1);
  }

  function download() {
    const url = URL.createObjectURL(new Blob([inquirySummary(draft)], { type: 'text/plain;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'psametra-demo-inquiry.txt';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function input(key: keyof QuoteDraft, label: string, props: InputHTMLAttributes<HTMLInputElement> = {}, wide = false) {
    return (
      <div className={`field${wide ? ' field-wide' : ''}`}>
        <label htmlFor={`quote-${key}`}>{label}</label>
        <input
          id={`quote-${key}`} name={key} value={draft[key]} onChange={(event) => update(key, event.target.value)}
          aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `quote-error-${key}` : undefined}
          maxLength={120} {...props}
        />
        {errors[key] && <span className="field-error" id={`quote-error-${key}`}>{errors[key]}</span>}
      </div>
    );
  }

  return (
    <div className="quote-layout">
      <aside className="quote-sidebar">
        <p className="eyebrow">PLAN YOUR NEXT MOVE</p>
        <h2>Route to review.<br />One clear brief.</h2>
        <ol className="step-list" aria-label="Inquiry progress">
          {steps.map((name, index) => (
            <li key={name} aria-current={!complete && step === index ? 'step' : undefined} className={index < step || complete ? 'is-complete' : step === index ? 'is-current' : ''}>
              <span className="step-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><span>{name}</span>
            </li>
          ))}
        </ol>
        {draft.mode && <div className="inquiry-outline"><p className="eyebrow">YOUR INQUIRY / {draft.mode} FREIGHT</p><p>{draft.origin || 'Origin'} <span aria-hidden="true">→</span> {draft.destination || 'Destination'}</p>{draft.cargo && <p className="muted">{draft.cargo}</p>}</div>}
        <p className="muted">An example freight inquiry flow. Your details stay in this page and are cleared when you leave or refresh. No request is sent.</p>
      </aside>

      {complete ? (
        <div className="quote-form success-panel">
          <p className="eyebrow">DEMO INQUIRY COMPLETE</p>
          <h2 ref={heading} tabIndex={-1}>Your shipment brief is ready.</h2>
          <p>{draft.origin} to {draft.destination}. {draft.pieces} pieces, {draft.weightKg} kg, by {draft.mode.toLowerCase()}.</p>
          <p className="muted">This inquiry has not been sent. No rate or booking has been created. Download your summary to keep a local copy.</p>
          <div className="form-actions">
            <button type="button" className="btn btn-primary" onClick={download}>Download inquiry <span aria-hidden="true">↓</span></button>
            <Link className="btn btn-outline" href="/portal-demo">Explore the portal</Link>
          </div>
          <button type="button" className="text-link" onClick={() => { focusTarget.current = 'heading'; setComplete(false); }}>Edit inquiry</button>
        </div>
      ) : (
        <form className="quote-form" onSubmit={submit} noValidate>
          <p className="eyebrow">STEP {String(step + 1).padStart(2, '0')} / 04</p>
          <h2 ref={heading} tabIndex={-1}>{['Where is it going?', 'Tell us about the cargo.', 'Who is planning the move?', 'One final look.'][step]}</h2>
          <p className="muted">{step === 3 ? 'Review your details before completing this local demo.' : 'All fields are required unless marked optional.'}</p>
          <div aria-live="polite" aria-atomic="true">
            {Object.values(errors).some(Boolean) && <p className="field-error">Please review the highlighted fields to continue.</p>}
          </div>

          {step === 0 && (
            <div className="field-grid">
              <fieldset className="field field-wide" aria-describedby={errors.mode ? 'quote-error-mode' : undefined}>
                <legend>Transport mode</legend>
                <div className="mode-options">
                  {['Air', 'Sea', 'Road'].map((mode) => (
                    <label key={mode} htmlFor={`quote-mode-${mode}`}>
                      <input id={`quote-mode-${mode}`} type="radio" name="mode" value={mode} checked={draft.mode === mode} onChange={(event) => update('mode', event.target.value)} required aria-describedby={errors.mode ? 'quote-error-mode' : undefined} />
                      <Icon name={mode.toLowerCase() as 'air' | 'sea' | 'road'} size={24} />
                      <span>{mode} freight</span>
                    </label>
                  ))}
                </div>
                {errors.mode && <span className="field-error" id="quote-error-mode">{errors.mode}</span>}
              </fieldset>
              {input('origin', 'Origin city & country', { placeholder: 'e.g. Lahore, Pakistan', required: true, autoComplete: 'off' })}
              {input('destination', 'Destination city & country', { placeholder: 'e.g. Dubai, UAE', required: true, autoComplete: 'off' })}
              <div className="field">
                <label htmlFor="quote-incoterm">Incoterm</label>
                <select id="quote-incoterm" name="incoterm" value={draft.incoterm} onChange={(event) => update('incoterm', event.target.value)} required aria-invalid={!!errors.incoterm} aria-describedby={errors.incoterm ? 'quote-error-incoterm' : undefined}>
                  <option value="">Select a trade term</option>
                  {incoterms.map((term) => <option key={term} value={term}>{term}</option>)}
                </select>
                {errors.incoterm && <span className="field-error" id="quote-error-incoterm">{errors.incoterm}</span>}
              </div>
              {input('readyDate', 'Cargo-ready date', { type: 'date', onFocus: (event) => { event.currentTarget.min = localToday(); }, required: true })}
            </div>
          )}

          {step === 1 && (
            <div className="field-grid">
              {input('cargo', 'Cargo description', { placeholder: 'e.g. Precision components in cartons', maxLength: 240, required: true }, true)}
              {input('weightKg', 'Total gross weight (kg)', { type: 'number', min: '0.01', max: 1000000, step: 'any', inputMode: 'decimal', placeholder: '250', required: true })}
              {input('pieces', 'Number of pieces', { type: 'number', min: 1, max: 100000, step: 1, inputMode: 'numeric', placeholder: '5', required: true })}
              {input('volumeM3', 'Total volume (m³) · optional', { type: 'number', min: '0.001', max: 100000, step: 'any', inputMode: 'decimal', placeholder: '0.3' }, true)}
              <p className="field-wide muted">Dimensions per piece are optional. If supplied, include all three measurements in centimetres.</p>
              {input('lengthCm', 'Length (cm) · optional', { type: 'number', min: '0.1', max: 10000, step: 'any', inputMode: 'decimal' })}
              {input('widthCm', 'Width (cm) · optional', { type: 'number', min: '0.1', max: 10000, step: 'any', inputMode: 'decimal' })}
              {input('heightCm', 'Height (cm) · optional', { type: 'number', min: '0.1', max: 10000, step: 'any', inputMode: 'decimal' })}
            </div>
          )}

          {step === 2 && (
            <div className="field-grid">
              {input('company', 'Company', { autoComplete: 'organization', required: true }, true)}
              {input('contactName', 'Contact name', { autoComplete: 'name', required: true })}
              {input('email', 'Email address', { type: 'email', autoComplete: 'email', maxLength: 254, required: true })}
              {input('phone', 'Phone · optional', { type: 'tel', autoComplete: 'tel', maxLength: 40 }, true)}
              <div className="field field-wide">
                <label htmlFor="quote-notes">Handling requirements or notes · optional</label>
                <textarea id="quote-notes" name="notes" rows={4} maxLength={2000} value={draft.notes} onChange={(event) => update('notes', event.target.value)} placeholder="Temperature needs, collection access or other cargo details" aria-invalid={!!errors.notes} aria-describedby={errors.notes ? 'quote-error-notes' : undefined} />
                {errors.notes && <span className="field-error" id="quote-error-notes">{errors.notes}</span>}
              </div>
              <p className="field-wide muted">Use sample details to try the demo. No personal information is stored or transmitted.</p>
            </div>
          )}

          {step === 3 && (
            <div className="review-grid">
              <section><h3>Route</h3><dl>
                <div><dt>Transport</dt><dd>{draft.mode} freight</dd></div>
                <div><dt>Origin</dt><dd>{draft.origin}</dd></div>
                <div><dt>Destination</dt><dd>{draft.destination}</dd></div>
                <div><dt>Incoterm</dt><dd>{draft.incoterm}</dd></div>
                <div><dt>Ready date</dt><dd>{draft.readyDate}</dd></div>
              </dl></section>
              <section><h3>Cargo</h3><dl>
                <div><dt>Goods</dt><dd>{draft.cargo}</dd></div>
                <div><dt>Gross weight</dt><dd>{draft.weightKg} kg</dd></div>
                <div><dt>Pieces</dt><dd>{draft.pieces}</dd></div>
                <div><dt>Volume</dt><dd>{draft.volumeM3 ? `${draft.volumeM3} m³` : 'Not provided'}</dd></div>
                <div><dt>Dimensions / piece</dt><dd>{draft.lengthCm ? `${draft.lengthCm} × ${draft.widthCm} × ${draft.heightCm} cm` : 'Not provided'}</dd></div>
              </dl></section>
              <section><h3>Contact</h3><dl>
                <div><dt>Company</dt><dd>{draft.company}</dd></div>
                <div><dt>Contact</dt><dd>{draft.contactName}</dd></div>
                <div><dt>Email</dt><dd>{draft.email}</dd></div>
                <div><dt>Phone</dt><dd>{draft.phone || 'Not provided'}</dd></div>
              </dl></section>
              <section><h3>Additional notes</h3><p>{draft.notes || 'No additional handling requirements.'}</p></section>
            </div>
          )}

          <div className="form-actions">
            {step > 0 && <button type="button" className="btn btn-outline" onClick={goBack}>Back</button>}
            <button className="btn btn-primary" type="submit">{step === 3 ? 'Complete demo inquiry' : `Continue to ${steps[step + 1].toLowerCase()}`} <span aria-hidden="true">↗</span></button>
          </div>
        </form>
      )}
    </div>
  );
}

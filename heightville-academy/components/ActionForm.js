"use client";
import { useFormState, useFormStatus } from "react-dom";

function Submit({ label }) {
  const { pending } = useFormStatus();
  return <button className="btn btn-navy" disabled={pending}>{pending ? "Please wait…" : label}</button>;
}

// Generic form wired to a server action; shows its error or success message.
export default function ActionForm({ action, fields, submit, hint }) {
  const [state, formAction] = useFormState(action, null);
  return (
    <form action={formAction} className="portal-form">
      {fields.map((f) => (
        <label key={f.name} className="field">{f.label}
          {f.options
            ? <select name={f.name}>{f.options.map((o) => <option key={o}>{o}</option>)}</select>
            : <input name={f.name} type={f.type || "text"} required={f.required} autoComplete={f.auto || "off"} placeholder={f.placeholder} />}
        </label>
      ))}
      {hint && <p className="hint">{hint}</p>}
      {state?.error && <p className="form-error" role="alert">{state.error}</p>}
      {state?.ok && <p className="form-ok" role="status">{state.ok}</p>}
      <Submit label={submit} />
    </form>
  );
}

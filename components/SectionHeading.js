export default function SectionHeading({ eyebrow, title, text }) {
  return (
    <div className="heading">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="serif">{title}</h2>
      <span className="rule" aria-hidden="true" />
      {text && <p>{text}</p>}
    </div>
  );
}

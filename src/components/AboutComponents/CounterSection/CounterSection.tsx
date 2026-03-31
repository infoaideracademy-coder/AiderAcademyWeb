import "./style.scss";

const stats = [
  { value: "7", accent: false, label: "Global Facilities" },
  { value: "12", accent: true, label: "Years of RF experience" },
  { value: "20", accent: true, label: "Innovative patents" },
  { value: "1000", accent: true, label: "International employees" },
];

export default function CounterSection() {
  return (
    <section className="counter-seciton-container-main">
      <div className="counter-section-container container">
        <div className="counter-section-grid">
          {stats.map((item, index) => (
            <article
              className={`counter-item ${
                index !== stats.length - 1 ? "counter-item--with-divider" : ""
              }`.trim()}
              key={item.label}
            >
              <h3 className="counter-item__value">
                <span className="counter-item__number" data-value={item.value}>
                  {item.value}
                </span>
                {item.accent ? <span>+</span> : null}
              </h3>
              <p className="counter-item__label">{item.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

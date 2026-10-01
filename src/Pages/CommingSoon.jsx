import "./CommingSoon.css";

export default function ComingSoon() {
  return (
    <section className='coming-soon'>
      <div className='decor decor-top'></div>
      <div className='decor decor-bottom'></div>

      <div className='content'>
        <span className='badge'>✨ Próximamente</span>

        <h1>
          Espera próximamente
          <br />
          el anuncio de
          <span> nuevos eventos</span>
        </h1>

        <p>
          Estamos preparando experiencias increíbles para ti. Mantente atento a
          nuestras próximas fechas y sorpresas.
        </p>

        <button>Mantente atento 💖</button>
      </div>
    </section>
  );
}

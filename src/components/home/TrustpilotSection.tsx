import { Star } from "lucide-react";

const TrustpilotSection = () => {
  const reviews = [
    {
      author: "Giuseppe M.",
      rating: 5,
      text: "Finalmente posso lavorare senza pensare alle lamentele! ZAPPER ha risolto tutti i miei problemi di fumi.",
      date: "2 settimane fa",
    },
    {
      author: "Francesca L.",
      rating: 5,
      text: "Installazione veloce e supporto eccellente. Il sistema funziona perfettamente, nessun odore in tutto il palazzo.",
      date: "1 mese fa",
    },
    {
      author: "Marco R.",
      rating: 5,
      text: "Ho provato altre soluzioni senza successo. ZAPPER è l'unico che ha funzionato davvero. Consiglio vivamente!",
      date: "3 settimane fa",
    },
  ];

  const stats = {
    rating: 4.9,
    totalReviews: 487,
    excellent: 95,
  };

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        {/* Header with Trustpilot badge */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-card px-6 py-3 rounded-full shadow-sm border border-border mb-6">
            <span className="text-2xl font-bold text-foreground">{stats.rating}</span>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>
            <span className="text-muted-foreground">
              {stats.totalReviews} recensioni
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Cosa dicono i nostri clienti
          </h2>
          <p className="text-muted-foreground">
            Il {stats.excellent}% dei clienti ci valuta come "Eccellente"
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className={`bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow animate-fade-in-up animation-delay-${(index + 1) * 100}`}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              
              {/* Review Text */}
              <p className="text-foreground mb-4">"{review.text}"</p>
              
              {/* Author */}
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">{review.author}</span>
                <span className="text-sm text-muted-foreground">{review.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Trustpilot Badge */}
        <div className="mt-10 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>Leggi tutte le recensioni su</span>
            <span className="font-bold text-foreground">Trustpilot</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TrustpilotSection;

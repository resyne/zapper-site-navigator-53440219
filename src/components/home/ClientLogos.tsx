const ClientLogos = () => {
  // Placeholder client logos - these would be real company logos
  const clients = [
    { name: "Ristorante Milano", initials: "RM" },
    { name: "Pizzeria Napoli", initials: "PN" },
    { name: "Grill House", initials: "GH" },
    { name: "Food Factory", initials: "FF" },
    { name: "Caffè Torino", initials: "CT" },
    { name: "Bakery Plus", initials: "BP" },
  ];

  return (
    <section className="py-12 md:py-16 bg-muted/50 border-y border-border">
      <div className="container">
        <p className="text-center text-muted-foreground text-sm uppercase tracking-wider mb-8">
          Scelto da oltre 500 aziende in Italia
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {clients.map((client, index) => (
            <div
              key={client.name}
              className={`flex items-center justify-center w-24 h-12 md:w-32 md:h-16 rounded-lg bg-background border border-border opacity-60 hover:opacity-100 transition-opacity duration-300 animate-fade-in animation-delay-${(index + 1) * 100}`}
            >
              <span className="font-display font-bold text-lg md:text-xl text-muted-foreground">
                {client.initials}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;

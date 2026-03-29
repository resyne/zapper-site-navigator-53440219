import daAlfonso from "@/assets/clients/da-alfonso.png";
import francuccio from "@/assets/clients/francuccio.png";
import hakunaMatata from "@/assets/clients/hakuna-matata.png";
import laBaita from "@/assets/clients/la-baita.png";
import daMichele from "@/assets/clients/da-michele.png";
import pummarolaNcoppa from "@/assets/clients/pummarola-ncoppa.png";

const ClientLogos = () => {
  const clients = [
    { name: "Da Alfonso", logo: daAlfonso },
    { name: "Francuccio", logo: francuccio },
    { name: "Hakuna Matata", logo: hakunaMatata },
    { name: "La Baita Ibiza", logo: laBaita },
    { name: "Da Michele", logo: daMichele },
    { name: "Pummarola 'Ncoppa", logo: pummarolaNcoppa },
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-muted/50 border-y border-border">
      <div className="container px-4 sm:px-6">
        <p className="text-center text-muted-foreground text-xs sm:text-sm uppercase tracking-wider mb-6 sm:mb-8">
          Scelto da oltre 1500+ attività in Italia e nel mondo
        </p>
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 md:gap-14">
          {clients.map((client, index) => (
            <div
              key={client.name}
              className={`flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 opacity-70 hover:opacity-100 transition-opacity duration-300 animate-fade-in animation-delay-${(index + 1) * 100}`}
            >
              <img
                src={client.logo}
                alt={client.name}
                className="max-w-full max-h-full object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;

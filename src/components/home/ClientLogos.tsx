import daAlfonso from "@/assets/clients/da-alfonso.png";
import pummarolaNcoppa from "@/assets/clients/pummarola-ncoppa.png";
import daMichele from "@/assets/clients/da-michele.png";
import laBaita from "@/assets/clients/la-baita.png";
import rossopomodoro from "@/assets/clients/rossopomodoro.png";
import barilla from "@/assets/clients/barilla.png";
import leonardo from "@/assets/clients/leonardo.png";
import modelleriaReggiana from "@/assets/clients/modelleria-reggiana.png";
import vincenzoCapuano from "@/assets/clients/vincenzo-capuano.png";

const ClientLogos = () => {
  const clients = [
    { name: "Da Alfonso", logo: daAlfonso },
    { name: "Pummarola 'Ncoppa", logo: pummarolaNcoppa },
    { name: "Da Michele", logo: daMichele },
    { name: "La Baita Ibiza", logo: laBaita },
    { name: "Rossopomodoro", logo: rossopomodoro },
    { name: "Barilla", logo: barilla },
    { name: "Leonardo", logo: leonardo },
    { name: "Modelleria Reggiana", logo: modelleriaReggiana },
    { name: "Vincenzo Capuano", logo: vincenzoCapuano },
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-muted/50 border-y border-border overflow-hidden">
      <div className="container px-4 sm:px-6">
        <p className="text-center text-muted-foreground text-xs sm:text-sm uppercase tracking-wider mb-6 sm:mb-8">
          Scelto da oltre 1500+ attività in Italia e nel mondo
        </p>
      </div>
      <div className="relative">
        <div className="flex animate-scroll-logos">
          {[...clients, ...clients].map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex-shrink-0 flex items-center justify-center w-32 h-20 sm:w-40 sm:h-24 md:w-48 md:h-28 mx-4 sm:mx-6 md:mx-8 opacity-70 hover:opacity-100 transition-opacity duration-300"
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

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Interventi from "./pages/Interventi";
import Settori from "./pages/Settori";
import Professionale from "./pages/settori/Professionale";
import Domestico from "./pages/settori/Domestico";
import Industriale from "./pages/settori/Industriale";
import Pizzerie from "./pages/ambiti/professionale/Pizzerie";
import Panifici from "./pages/ambiti/professionale/Panifici";
import Bracerie from "./pages/ambiti/professionale/Bracerie";
import CucineProfessionali from "./pages/ambiti/professionale/CucineProfessionali";
import CaldaieBiomassaDom from "./pages/ambiti/domestico/CaldaieBiomassa";
import Camini from "./pages/ambiti/domestico/Camini";
import Stufe from "./pages/ambiti/domestico/Stufe";
import Torrefazioni from "./pages/ambiti/industriale/Torrefazioni";
import Caseifici from "./pages/ambiti/industriale/Caseifici";
import Affumicatori from "./pages/ambiti/industriale/Affumicatori";
import ForniIndustrialiAmbito from "./pages/ambiti/industriale/ForniIndustriali";
import ForniALegna from "./pages/applicazioni/ForniALegna";
import BraciCarbone from "./pages/applicazioni/BraciCarbone";
import CaldaieBiomassaApp from "./pages/applicazioni/CaldaieBiomassa";
import CaminiApp from "./pages/applicazioni/Camini";
import Cappe from "./pages/applicazioni/Cappe";
import ZapperS from "./pages/modelli/ZapperS";
import ZapperM from "./pages/modelli/ZapperM";
import ZapperL from "./pages/modelli/ZapperL";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/interventi" element={<Interventi />} />
          <Route path="/settori" element={<Settori />} />
          <Route path="/settori/professionale" element={<Professionale />} />
          <Route path="/settori/domestico" element={<Domestico />} />
          <Route path="/settori/industriale" element={<Industriale />} />
          <Route path="/professionale/pizzerie" element={<Pizzerie />} />
          <Route path="/professionale/panifici" element={<Panifici />} />
          <Route path="/professionale/bracerie" element={<Bracerie />} />
          <Route path="/professionale/cucine-professionali" element={<CucineProfessionali />} />
          <Route path="/domestico/caldaie-biomassa" element={<CaldaieBiomassaDom />} />
          <Route path="/domestico/camini" element={<Camini />} />
          <Route path="/domestico/stufe" element={<Stufe />} />
          <Route path="/industriale/torrefazioni" element={<Torrefazioni />} />
          <Route path="/industriale/caseifici" element={<Caseifici />} />
          <Route path="/industriale/affumicatori" element={<Affumicatori />} />
          <Route path="/industriale/forni-industriali" element={<ForniIndustrialiAmbito />} />
          <Route path="/applicazioni/forni-a-legna" element={<ForniALegna />} />
          <Route path="/applicazioni/braci-carbone" element={<BraciCarbone />} />
          <Route path="/applicazioni/caldaie-biomassa" element={<CaldaieBiomassaApp />} />
          <Route path="/applicazioni/camini" element={<CaminiApp />} />
          <Route path="/applicazioni/cappe" element={<Cappe />} />
          <Route path="/modelli/zapper-s" element={<ZapperS />} />
          <Route path="/modelli/zapper-m" element={<ZapperM />} />
          <Route path="/modelli/zapper-l" element={<ZapperL />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { cvSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Generate description for a job title
  app.get("/api/generate-description", async (req, res) => {
    const title = req.query.title as string;
    
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    
    const description = generateDescription(title);
    res.json({ description });
  });

  // Save CV
  app.post("/api/cv", async (req, res) => {
    try {
      const validationResult = cvSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Invalid CV data", 
          errors: validationResult.error.errors 
        });
      }
      
      const cv = await storage.saveCV(validationResult.data);
      res.status(201).json(cv);
    } catch (error) {
      res.status(500).json({ message: "Failed to save CV" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

function generateDescription(title: string): string {
  const lowerTitle = title.toLowerCase();
  
  // Sviluppatore/Programmatore
  if (lowerTitle.includes('sviluppat') || lowerTitle.includes('programmat') || lowerTitle.includes('develop')) {
    const descriptions = [
      'Sviluppatore esperto con competenze avanzate nella creazione di applicazioni web moderne. Specializzato nella risoluzione di problemi complessi e nell\'ottimizzazione delle performance. Focalizzato alla consegna di codice pulito, ben documentato e facilmente manutenibile.',
      'Programmatore con solide competenze tecniche e passione per lo sviluppo di soluzioni innovative. Esperienza nella realizzazione di applicazioni scalabili e nella gestione di progetti complessi. Capacità di lavorare sia in autonomia che in team.',
      'Sviluppatore software con esperienza nella progettazione e implementazione di sistemi backend e frontend. Abile nella risoluzione di bug e nell\'ottimizzazione delle prestazioni. Attitudine all\'apprendimento continuo e all\'adozione di nuove tecnologie.'
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  } 
  // Designer
  else if (lowerTitle.includes('design') || lowerTitle.includes('ux') || lowerTitle.includes('ui')) {
    const descriptions = [
      'Designer creativo con un forte senso estetico e attenzione ai dettagli. Esperto nella creazione di interfacce utente intuitive e accessibili. Passione per lo studio del comportamento degli utenti per ottimizzare l\'esperienza di utilizzo dei prodotti digitali.',
      'UX/UI Designer con competenze nella progettazione di esperienze digitali centrate sull\'utente. Capacità di condurre ricerche, creare wireframe e prototipi interattivi. Conoscenza approfondita dei principi di usabilità e delle tendenze di design.',
      'Designer di prodotto specializzato nella creazione di interfacce utente coinvolgenti ed efficaci. Esperienza nell\'utilizzo di metodologie di design thinking e nella conduzione di test di usabilità. Attitudine alla collaborazione con team multidisciplinari.'
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  } 
  // Marketing
  else if (lowerTitle.includes('market')) {
    const descriptions = [
      'Professionista del marketing con esperienza nella pianificazione e implementazione di strategie di marketing digitale. Competenze nella gestione di campagne pubblicitarie, analisi dei dati e ottimizzazione della conversione.',
      'Specialista di marketing con comprovata esperienza nella creazione e gestione di campagne multicanale. Capacità di analizzare i dati di mercato e identificare opportunità di crescita. Forte orientamento ai risultati e alla misurazione delle performance.',
      'Esperto di marketing digitale con competenze in SEO, SEM e social media marketing. Abilità nell\'identificare target di riferimento e sviluppare contenuti personalizzati. Esperienza nella gestione di budget pubblicitari e nell\'ottimizzazione del ROI.'
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  } 
  // Manager
  else if (lowerTitle.includes('manag')) {
    const descriptions = [
      'Manager esperto con comprovata capacità di leadership e gestione del team. Eccellenti doti organizzative e di problem solving. Orientato al risultato con focus sulla crescita aziendale e sull\'ottimizzazione dei processi.',
      'Manager con solida esperienza nella direzione di team e progetti complessi. Competenze nella definizione di obiettivi strategici e nell\'allocazione delle risorse. Capacità di motivare i collaboratori e promuovere un ambiente di lavoro positivo.',
      'Leader aziendale con esperienza nella gestione e sviluppo di team ad alte prestazioni. Competenze nella pianificazione strategica e nel miglioramento dei processi. Capacità di prendere decisioni efficaci anche sotto pressione.'
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  }
  // Insegnante
  else if (lowerTitle.includes('insegn') || lowerTitle.includes('docen') || lowerTitle.includes('teach')) {
    const descriptions = [
      'Insegnante appassionato con forte dedizione all\'educazione e alla crescita degli studenti. Abile nel creare ambienti di apprendimento stimolanti e inclusivi. Capacità di adattare i metodi didattici alle diverse esigenze degli allievi.',
      'Docente qualificato con esperienza nell\'insegnamento e nella progettazione di percorsi formativi efficaci. Competenze nell\'uso di metodologie didattiche innovative e strumenti digitali. Impegnato nello sviluppo continuo delle proprie competenze pedagogiche.',
      'Educatore con esperienza nella facilitazione dell\'apprendimento e nel supporto allo sviluppo personale degli studenti. Abilità nel creare relazioni positive e nel motivare gli allievi. Capacità di valutare i progressi e fornire feedback costruttivi.'
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  }
  // Medico
  else if (lowerTitle.includes('medic') || lowerTitle.includes('dottor') || lowerTitle.includes('dott.') || lowerTitle.includes('doctor')) {
    const descriptions = [
      'Medico qualificato con solida formazione clinica e attenzione al benessere dei pazienti. Competenze nella diagnosi e nel trattamento di diverse patologie. Capacità di comunicare in modo chiaro ed empatico con i pazienti.',
      'Professionista della salute con esperienza nella gestione di casi clinici complessi. Impegno costante nell\'aggiornamento professionale e nell\'applicazione delle più recenti linee guida. Approccio olistico alla cura del paziente.',
      'Medico dedicato con attenzione alla diagnosi tempestiva e al trattamento efficace. Competenze nella gestione delle emergenze e nella cura a lungo termine. Capacità di collaborare efficacemente con altri professionisti sanitari.'
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  }
  // Avvocato
  else if (lowerTitle.includes('avvoc') || lowerTitle.includes('legal') || lowerTitle.includes('giurid') || lowerTitle.includes('lawyer')) {
    const descriptions = [
      'Avvocato esperto con solida conoscenza del diritto e comprovata esperienza in ambito legale. Competenze nell\'analisi di casi complessi e nella definizione di strategie efficaci. Capacità di rappresentare i clienti con professionalità e determinazione.',
      'Professionista legale con competenze nella consulenza e nel contenzioso. Abilità nella redazione di documenti legali e nella negoziazione di accordi. Approccio analitico e attenzione ai dettagli nella gestione delle pratiche.',
      'Consulente legale con esperienza nella risoluzione di problematiche giuridiche complesse. Capacità di interpretare la normativa e fornire pareri legali accurati. Forte orientamento al cliente e alle sue esigenze specifiche.'
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  }
  // Default per altre professioni
  else {
    const descriptions = [
      'Professionista qualificato con esperienza nel settore e forti competenze tecniche. Capacità di lavorare in team e di adattarsi rapidamente a nuovi ambienti e sfide. Orientato al raggiungimento degli obiettivi con un approccio metodico e preciso.',
      'Professionista con solida formazione ed esperienza nel proprio campo. Competenze nella gestione efficiente delle attività quotidiane e nella risoluzione dei problemi. Approccio proattivo e orientato al miglioramento continuo.',
      'Specialista con comprovata esperienza nel settore e attitudine all\'innovazione. Abilità nell\'identificare opportunità di miglioramento e implementare soluzioni efficaci. Capacità di gestire priorità multiple e rispettare le scadenze.'
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  }
}

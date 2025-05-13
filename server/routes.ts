import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { cvSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Generate description for a job title
  app.get("/api/generate-description", async (req, res) => {
    const title = req.query.title as string;
    const isPersonal = req.query.isPersonal === 'true';
    
    if (!title && !isPersonal) {
      return res.status(400).json({ message: "Title is required unless requesting personal description" });
    }
    
    const description = isPersonal 
      ? generatePersonalDescription() 
      : generateJobDescription(title);
      
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

function generateJobDescription(title: string): string {
  const lowerTitle = title.toLowerCase();
  
  // Sviluppatore/Programmatore
  if (lowerTitle.includes('sviluppat') || lowerTitle.includes('programmat') || lowerTitle.includes('develop')) {
    const descriptions = [
      'Sviluppatore esperto con competenze avanzate nella creazione di applicazioni web moderne. Specializzato nella risoluzione di problemi complessi e nell\'ottimizzazione delle performance. Focalizzato alla consegna di codice pulito, ben documentato e facilmente manutenibile.',
      'Programmatore con solide competenze tecniche e passione per lo sviluppo di soluzioni innovative. Esperienza nella realizzazione di applicazioni scalabili e nella gestione di progetti complessi. Capacità di lavorare sia in autonomia che in team.',
      'Sviluppatore software con esperienza nella progettazione e implementazione di sistemi backend e frontend. Abile nella risoluzione di bug e nell\'ottimizzazione delle prestazioni. Attitudine all\'apprendimento continuo e all\'adozione di nuove tecnologie.',
      'Developer con esperienza nella creazione di applicazioni responsive e cross-platform. Competenze nella gestione del ciclo di vita del software e nell\'utilizzo di metodologie agili. Capacità di comunicare efficacemente con team multidisciplinari.',
      'Sviluppatore full-stack con conoscenze approfondite di frontend e backend. Esperienza nella progettazione di API RESTful e nell\'integrazione di servizi di terze parti. Attenzione alla sicurezza e alla protezione dei dati degli utenti.',
      'Programmatore specializzato nell\'ottimizzazione delle performance e nel debugging avanzato. Esperienza nell\'implementazione di algoritmi complessi e nella gestione di grandi volumi di dati. Capacità di lavorare in contesti ad alta pressione rispettando le scadenze.',
      'Sviluppatore mobile con esperienza nella creazione di applicazioni native e cross-platform. Competenze nell\'ottimizzazione dell\'interfaccia utente e nell\'implementazione di funzionalità complesse. Attenzione all\'esperienza utente e alle performance su dispositivi con risorse limitate.',
      'Programmatore backend specializzato nella progettazione e implementazione di architetture cloud-native. Esperienza con microservizi, container e orchestrazione. Competenze avanzate nella gestione di database SQL e NoSQL ad alte prestazioni.',
      'Sviluppatore DevOps con competenze nella creazione e gestione di pipeline CI/CD. Esperienza nell\'automazione dei processi di build, test e deployment. Capacità di implementare infrastrutture scalabili e resilienti basate su cloud.',
      'Programmatore di sistemi embedded con esperienza nella scrittura di codice ottimizzato per dispositivi con risorse limitate. Competenze nell\'interfacciamento con hardware specializzato e nella gestione energetica. Attitudine alla risoluzione di problemi in contesti altamente vincolati.',
      'Sviluppatore di intelligenza artificiale specializzato nella creazione di modelli predittivi e nell\'implementazione di algoritmi di machine learning. Esperienza nel processamento e analisi di grandi volumi di dati. Capacità di tradurre problemi complessi in soluzioni algoritmiche efficienti.',
      'Programmatore game developer con competenze nella creazione di esperienze interattive coinvolgenti. Esperienza con motori di gioco e tecnologie di rendering 3D. Passione per l\'ottimizzazione delle performance e la creazione di meccaniche di gioco innovative.',
      'Sviluppatore frontend specializzato nella creazione di interfacce utente reattive e accessibili. Competenze approfondite in framework JavaScript moderni e nell\'implementazione di animazioni fluide. Attenzione ai dettagli e alla compatibilità cross-browser.',
      'Programmatore specializzato in sicurezza informatica con esperienza nell\'identificazione e mitigazione di vulnerabilità nel codice. Competenze nell\'implementazione di protocolli di crittografia e nell\'hardening di applicazioni. Mentalità orientata alla difesa proattiva e all\'analisi delle minacce.',
      'Sviluppatore blockchain con esperienza nella creazione di applicazioni decentralizzate e smart contract. Competenze nella progettazione di sistemi distribuiti sicuri e nell\'implementazione di protocolli di consenso. Passione per le tecnologie emergenti e per l\'innovazione nel campo delle criptovalute.'
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  } 
  // Designer
  else if (lowerTitle.includes('design') || lowerTitle.includes('ux') || lowerTitle.includes('ui')) {
    const descriptions = [
      'Designer creativo con un forte senso estetico e attenzione ai dettagli. Esperto nella creazione di interfacce utente intuitive e accessibili. Passione per lo studio del comportamento degli utenti per ottimizzare l\'esperienza di utilizzo dei prodotti digitali.',
      'UX/UI Designer con competenze nella progettazione di esperienze digitali centrate sull\'utente. Capacità di condurre ricerche, creare wireframe e prototipi interattivi. Conoscenza approfondita dei principi di usabilità e delle tendenze di design.',
      'Designer di prodotto specializzato nella creazione di interfacce utente coinvolgenti ed efficaci. Esperienza nell\'utilizzo di metodologie di design thinking e nella conduzione di test di usabilità. Attitudine alla collaborazione con team multidisciplinari.',
      'Designer versatile con competenze in grafica, branding e user interface. Capacità di interpretare le esigenze del cliente e tradurle in soluzioni visive efficaci. Approccio creativo e orientato alla risoluzione dei problemi.',
      'Interaction Designer specializzato nella creazione di prototipi interattivi e nella definizione dei flussi di navigazione. Esperienza nell\'utilizzo di strumenti di design avanzati e nella collaborazione con sviluppatori frontend.',
      'Designer con forte attenzione all\'accessibilità e all\'usabilità. Competenze nella realizzazione di interfacce inclusive e adatte a diverse tipologie di utenti. Attitudine all\'innovazione e al miglioramento continuo dei prodotti.',
      'Motion Designer specializzato nella creazione di animazioni e transizioni fluide per esperienze digitali dinamiche. Competenze nella narrazione visiva e nella comunicazione attraverso il movimento. Attenzione ai dettagli e alla coerenza stilistica.',
      'Service Designer con esperienza nella progettazione di ecosistemi di servizi complessi e nella mappatura di customer journey. Competenze nella facilitazione di workshop collaborativi e nella creazione di esperienze omnicanale. Approccio sistemico alla risoluzione di problemi.',
      'Designer industriale specializzato nella creazione di prodotti fisici funzionali ed esteticamente attraenti. Competenze nello sviluppo di prototipi e nella preparazione di file per la produzione. Attenzione all\'ergonomia e alla sostenibilità.',
      'Web Designer con esperienza nella creazione di siti web responsive e visivamente coinvolgenti. Competenze avanzate in HTML/CSS e nella progettazione di layout adattivi. Attenzione alle performance e alla compatibilità cross-browser.',
      'Graphic Designer specializzato nella creazione di identità visive coerenti e materiali di comunicazione efficaci. Competenze avanzate nell\'utilizzo di software di grafica e nella preparazione di file per la stampa. Attenzione ai dettagli tipografici e alla gerarchia visiva.',
      'Designer di packaging con esperienza nella creazione di confezioni funzionali e visivamente distintive. Competenze nella gestione dei vincoli produttivi e nella creazione di esperienze di unboxing memorabili. Attenzione alla sostenibilità e all\'ottimizzazione dei costi.',
      'Game Designer specializzato nella progettazione di meccaniche di gioco coinvolgenti e bilanciamento del gameplay. Competenze nella creazione di livelli e nella narrazione interattiva. Approccio analitico e iterativo alla progettazione dell\'esperienza ludica.',
      'Interior Designer con esperienza nella progettazione di spazi funzionali ed esteticamente armoniosi. Competenze nella selezione di materiali e nell\'ottimizzazione del layout. Attenzione all\'ergonomia e al benessere degli occupanti.',
      'Fashion Designer specializzato nella creazione di capi d\'abbigliamento e accessori innovativi. Competenze nella ricerca di tendenze e nell\'utilizzo di diverse tecniche di costruzione. Attenzione ai dettagli e alla qualità delle finiture.'
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  } 
  // Marketing
  else if (lowerTitle.includes('market')) {
    const descriptions = [
      'Professionista del marketing con esperienza nella pianificazione e implementazione di strategie di marketing digitale. Competenze nella gestione di campagne pubblicitarie, analisi dei dati e ottimizzazione della conversione.',
      'Specialista di marketing con comprovata esperienza nella creazione e gestione di campagne multicanale. Capacità di analizzare i dati di mercato e identificare opportunità di crescita. Forte orientamento ai risultati e alla misurazione delle performance.',
      'Esperto di marketing digitale con competenze in SEO, SEM e social media marketing. Abilità nell\'identificare target di riferimento e sviluppare contenuti personalizzati. Esperienza nella gestione di budget pubblicitari e nell\'ottimizzazione del ROI.',
      'Marketing manager con esperienza nella definizione e implementazione di strategie di branding efficaci. Competenze nella gestione delle relazioni con i clienti e nello sviluppo della brand reputation. Capacità di coordinare team di comunicazione e creativi.',
      'Specialista in marketing dei contenuti con abilità nella creazione di materiale rilevante e coinvolgente. Esperienza nell\'utilizzo di diverse piattaforme digitali e nella gestione di blog aziendali. Competenze nella definizione di strategie editoriali mirate al pubblico di riferimento.',
      'Data analyst specializzato in marketing con competenze avanzate nell\'analisi e interpretazione dei dati di mercato. Esperienza nell\'utilizzo di strumenti di business intelligence e nella creazione di reportistica avanzata. Capacità di tradurre i dati in strategie operative efficaci.',
      'Growth Hacker con approccio data-driven e creativo all\'acquisizione e retention degli utenti. Competenze in A/B testing, analytics e automazione del marketing. Esperto nell\'ottimizzazione di funnel di conversione e nel miglioramento continuo delle metriche chiave.',
      'Brand manager con esperienza nella costruzione e gestione di identità di marca forti e distintive. Competenze nello sviluppo del posizionamento strategico e nella creazione di esperienze di marca coerenti. Attitudine alla collaborazione con team creativi e all\'analisi delle tendenze di mercato.',
      'Specialista in email marketing con competenze nella pianificazione e implementazione di campagne di nurturing e conversion. Esperienza nell\'ottimizzazione dei tassi di apertura e click-through. Abilità nell\'automatizzazione e personalizzazione delle comunicazioni email.',
      'Responsabile marketing prodotto con esperienza nella definizione di strategie di go-to-market e nella gestione del ciclo di vita del prodotto. Competenze nell\'analisi della concorrenza e nell\'identificazione di opportunità di mercato. Capacità di collaborare con team di sviluppo e vendite.',
      'Social media manager con esperienza nella creazione e gestione di community online attive e coinvolte. Competenze nella pianificazione di contenuti social e nella gestione della reputazione online. Abilità nell\'analisi delle metriche di engagement e nel monitoraggio delle tendenze social.',
      'Specialista CRM con esperienza nella gestione delle relazioni con i clienti e nell\'implementazione di strategie di fidelizzazione. Competenze nell\'automazione del marketing e nella segmentazione del database clienti. Attenzione alla customer experience e alla personalizzazione delle comunicazioni.',
      'Marketing specialist eCommerce con esperienza nell\'ottimizzazione di piattaforme di vendita online e nell\'aumento del tasso di conversione. Competenze nella gestione di campagne promozionali e nell\'implementazione di strategie di cross-selling e up-selling. Abilità nell\'analisi del comportamento degli utenti online.',
      'Specialista in influencer marketing con esperienza nell\'identificazione e gestione di collaborazioni con creator e opinion leader. Competenze nella pianificazione di campagne influencer e nella misurazione dei risultati. Abilità nella negoziazione e nel mantenimento di relazioni durature con gli influencer.',
      'Marketing strategist con visione olistica e capacità di definire strategie di marketing integrate e multicanale. Competenze nell\'analisi dei trend di mercato e nella previsione delle tendenze future. Abilità nella definizione del posizionamento strategico e nel coordinamento di iniziative marketing complesse.'
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  } 
  // Manager
  else if (lowerTitle.includes('manag')) {
    const descriptions = [
      'Manager esperto con comprovata capacità di leadership e gestione del team. Eccellenti doti organizzative e di problem solving. Orientato al risultato con focus sulla crescita aziendale e sull\'ottimizzazione dei processi.',
      'Manager con solida esperienza nella direzione di team e progetti complessi. Competenze nella definizione di obiettivi strategici e nell\'allocazione delle risorse. Capacità di motivare i collaboratori e promuovere un ambiente di lavoro positivo.',
      'Leader aziendale con esperienza nella gestione e sviluppo di team ad alte prestazioni. Competenze nella pianificazione strategica e nel miglioramento dei processi. Capacità di prendere decisioni efficaci anche sotto pressione.',
      'Project manager con esperienza nella gestione di progetti complessi in contesti multinazionali. Competenze nell\'utilizzo di metodologie agili e tradizionali. Capacità di gestire con efficacia budget, tempi e risorse per il raggiungimento degli obiettivi aziendali.',
      'Manager operativo specializzato nell\'ottimizzazione dei processi aziendali e nella riduzione dei costi. Esperienza nell\'implementazione di sistemi di gestione della qualità e nel miglioramento continuo. Capacità di identificare inefficienze e implementare soluzioni innovative.',
      'Business manager con competenze nella gestione delle relazioni con i clienti e nello sviluppo commerciale. Esperienza nella definizione e implementazione di strategie di crescita del business. Capacità di analizzare il mercato e identificare nuove opportunità di business.',
      'Operations manager con esperienza nella supervisione di processi produttivi complessi e nella gestione della supply chain. Competenze nell\'ottimizzazione dei flussi di lavoro e nella gestione dell\'inventario. Abilità nell\'implementazione di sistemi lean e nella riduzione degli sprechi.',
      'HR manager specializzato nella gestione e sviluppo delle risorse umane. Competenze nel recruiting, nella formazione e nello sviluppo delle performance. Esperienza nell\'implementazione di politiche di welfare aziendale e nella gestione delle relazioni industriali.',
      'Sales manager con comprovata esperienza nella guida e motivazione di team commerciali. Competenze nella definizione di strategie di vendita e nella gestione delle relazioni con clienti chiave. Capacità di analizzare i dati di vendita e implementare azioni correttive per massimizzare i risultati.',
      'Product manager con esperienza nella gestione del ciclo di vita dei prodotti e nello sviluppo di roadmap strategiche. Competenze nell\'analisi di mercato e nell\'identificazione dei bisogni dei clienti. Abilità nella collaborazione cross-funzionale e nella guida di team multidisciplinari.',
      'IT manager specializzato nella gestione di infrastrutture tecnologiche complesse e nella supervisione di progetti IT. Competenze nella definizione di standard di sicurezza e nella gestione del budget tecnologico. Esperienza nell\'implementazione di soluzioni digitali innovative.',
      'Quality manager con esperienza nell\'implementazione e gestione di sistemi di controllo qualità. Competenze nell\'audit e nella certificazione di processi aziendali. Abilità nell\'identificazione di non conformità e nell\'implementazione di azioni correttive efficaci.',
      'Financial manager con solida esperienza nella gestione finanziaria e nel controllo di gestione. Competenze nella pianificazione del budget e nell\'analisi dei flussi di cassa. Capacità di valutare investimenti e implementare strategie di ottimizzazione fiscale.',
      'Marketing manager con esperienza nella definizione e implementazione di strategie di marketing integrate. Competenze nella gestione di budget pubblicitari e nella misurazione dell\'efficacia delle campagne. Abilità nella leadership di team creativi e nell\'innovazione delle strategie di comunicazione.',
      'Innovation manager specializzato nella gestione di processi di trasformazione digitale e nell\'implementazione di soluzioni innovative. Competenze nella valutazione di nuove tecnologie e nello sviluppo di modelli di business disruptive. Attitudine al pensiero creativo e alla gestione del cambiamento.'
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

function generatePersonalDescription(): string {
  const descriptions = [
    'Persona dinamica e intraprendente con una forte attitudine al problem solving. Appassionato/a di apprendimento continuo e alla ricerca di nuove sfide. Grande capacità di adattamento e predisposizione al lavoro di squadra.',
    
    'Individuo creativo e curioso con una forte propensione all\'innovazione. Ottima capacità di comunicazione e di relazione interpersonale. Determinato/a nel raggiungere gli obiettivi prefissati con entusiasmo e dedizione.',
    
    'Persona empatica e attenta ai dettagli, con spiccate capacità organizzative e di gestione del tempo. Appassionato/a di crescita personale e professionale, sempre alla ricerca di nuove opportunità di apprendimento.',
    
    'Carattere resiliente e flessibile, capace di adattarsi rapidamente ai cambiamenti. Grande capacità di ascolto e comprensione delle esigenze altrui. Motivato/a dal desiderio di miglioramento continuo e di eccellenza.',
    
    'Persona equilibrata e riflessiva, con un approccio analitico ai problemi e una naturale propensione alla pianificazione. Appassionato/a di condivisione delle conoscenze e di collaborazione in team multidisciplinari.',
    
    'Individuo affidabile e puntuale, con un forte senso di responsabilità e di etica professionale. Grande entusiasmo per le sfide intellettuali e disponibilità ad apprendere continuamente.',
    
    'Persona socievole e comunicativa, con una naturale predisposizione al networking e alla costruzione di relazioni durature. Appassionato/a di cultura e di scambio interculturale.',
    
    'Individuo determinato e pragmatico, orientato ai risultati e alla qualità del lavoro. Capace di mantenere la calma sotto pressione e di trovare soluzioni creative a problemi complessi.',
    
    'Persona versatile con interessi diversificati, aperta alle novità e alle prospettive diverse. Grande capacità di adattamento a contesti multiculturali e a team eterogenei.',
    
    'Carattere positivo e propositivo, con una naturale attitudine alla leadership e al coordinamento di gruppi. Fortemente motivato/a dalla crescita personale e dal raggiungimento dell\'eccellenza.',
    
    'Professionista orientato all\'eccellenza con un forte senso di integrità e dedizione. Abile nel bilanciare impegni multipli mantenendo alta la qualità del lavoro. Costantemente alla ricerca di opportunità per ampliare le proprie competenze.',
    
    'Individuo analitico con spiccate capacità di ragionamento critico e risoluzione dei problemi. Appassionato/a di sfide intellettuali e di innovazione. Ottima capacità di lavorare in autonomia e in team con eguale efficacia.',
    
    'Persona metodica e organizzata, con un approccio strutturato al lavoro e alla gestione delle priorità. Grande attenzione alla qualità e alla cura dei dettagli. Motivato/a dalla crescita continua e dal superamento degli obiettivi.',
    
    'Professionista versatile che combina competenze tecniche e soft skills avanzate. Abile nel costruire relazioni collaborative e nel gestire situazioni complesse. Appassionato/a di apprendimento interdisciplinare e di condivisione della conoscenza.',
    
    'Individuo proattivo con eccellenti capacità di pianificazione e anticipazione delle esigenze. Grande attenzione all\'efficienza e all\'ottimizzazione dei processi. Guidato/a da valori di miglioramento continuo e di eccellenza.',
    
    'Persona energica e motivata, capace di ispirare e coinvolgere gli altri verso obiettivi comuni. Ottimo senso dell\'umorismo e capacità di creare un\'atmosfera positiva anche sotto pressione. Appassionato/a di crescita personale e collettiva.',
    
    'Professionista con mentalità analitica e creativa, capace di affrontare problemi da prospettive diverse. Grande passione per l\'innovazione e la ricerca di soluzioni non convenzionali. Abile nel comunicare idee complesse in modo chiaro ed efficace.',
    
    'Individuo empatico con spiccate doti di ascolto attivo e di comprensione delle esigenze degli altri. Abile mediatore/rice nei conflitti e facilitatore/rice di processi collaborativi. Guidato/a da valori di inclusione e di valorizzazione delle diversità.',
    
    'Persona curiosa con un\'insaziabile sete di conoscenza e una naturale inclinazione verso l\'apprendimento continuo. Appassionato/a di tecnologia e di innovazione. Capace di adattarsi rapidamente ai cambiamenti e alle nuove sfide.',
    
    'Professionista resiliente con grande capacità di affrontare e superare le difficoltà. Ottimista e orientato/a alle soluzioni anche in situazioni complesse. Motivato/a dalla crescita personale e dal contributo al benessere collettivo.',
    
    'Individuo intraprendente con una naturale propensione all\'azione e all\'iniziativa. Capacità di trasformare le idee in progetti concreti. Guidato/a dalla passione per l\'innovazione e per il miglioramento continuo.',
    
    'Persona diplomatica con eccellenti doti comunicative e di mediazione. Abile nel costruire consenso e nel gestire relazioni complesse. Appassionato/a di dialogo interculturale e di cooperazione.',
    
    'Professionista con eccellente intelligenza emotiva e capacità di lavorare efficacemente in ambienti diversificati. Grande sensibilità verso le dinamiche interpersonali e le esigenze altrui. Guidato/a da valori di autenticità e di crescita collettiva.',
    
    'Individuo visionario con capacità di vedere oltre le convenzioni e di immaginare possibilità innovative. Abile nel comunicare la propria visione e nel coinvolgere gli altri. Appassionato/a di esplorazione e di scoperta di nuovi orizzonti.',
    
    'Persona pragmatica con un forte orientamento ai risultati e alla concretezza. Grande senso pratico e capacità di realizzare progetti con efficienza. Motivato/a dal desiderio di fare la differenza attraverso azioni concrete e misurabili.'
  ];
  
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

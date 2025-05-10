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
  
  if (lowerTitle.includes('sviluppat') || lowerTitle.includes('programmat') || lowerTitle.includes('develop')) {
    return 'Sviluppatore esperto con competenze avanzate nella creazione di applicazioni web moderne. Specializzato nella risoluzione di problemi complessi e nell\'ottimizzazione delle performance. Focalizzato alla consegna di codice pulito, ben documentato e facilmente manutenibile.';
  } else if (lowerTitle.includes('design') || lowerTitle.includes('ux') || lowerTitle.includes('ui')) {
    return 'Designer creativo con un forte senso estetico e attenzione ai dettagli. Esperto nella creazione di interfacce utente intuitive e accessibili. Passione per lo studio del comportamento degli utenti per ottimizzare l\'esperienza di utilizzo dei prodotti digitali.';
  } else if (lowerTitle.includes('market')) {
    return 'Professionista del marketing con esperienza nella pianificazione e implementazione di strategie di marketing digitale. Competenze nella gestione di campagne pubblicitarie, analisi dei dati e ottimizzazione della conversione.';
  } else if (lowerTitle.includes('manag')) {
    return 'Manager esperto con comprovata capacità di leadership e gestione del team. Eccellenti doti organizzative e di problem solving. Orientato al risultato con focus sulla crescita aziendale e sull\'ottimizzazione dei processi.';
  } else {
    return 'Professionista qualificato con esperienza nel settore e forti competenze tecniche. Capacità di lavorare in team e di adattarsi rapidamente a nuovi ambienti e sfide. Orientato al raggiungimento degli obiettivi con un approccio metodico e preciso.';
  }
}

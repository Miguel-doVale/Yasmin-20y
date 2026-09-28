import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, addDoc, collection, serverTimestamp } from "firebase/firestore";

/**
 * Credenciais públicas do app Web do Firebase, lidas do .env.local.
 * Passo a passo: docs/003-configurar-firebase.md
 */
const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Boolean(config.apiKey && config.projectId && config.appId);

export const RSVP_COLLECTION = "confirmacoes";

function db() {
  const app = getApps().length ? getApp() : initializeApp(config);
  return getFirestore(app);
}

/** Salva uma confirmação de presença. Telefone só com dígitos (DDD + número). */
export async function saveRsvp(nome: string, telefone: string) {
  if (!isFirebaseConfigured) {
    throw new Error("firebase-not-configured");
  }
  const write = addDoc(collection(db(), RSVP_COLLECTION), {
    nome,
    telefone,
    criadoEm: serverTimestamp(),
  });
  // Sem internet o Firestore fica tentando para sempre; desistimos após 15s.
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("timeout")), 15000),
  );
  await Promise.race([write, timeout]);
}

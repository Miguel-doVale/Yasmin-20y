import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  orderBy,
  query,
  type Timestamp,
} from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";

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

function app() {
  return getApps().length ? getApp() : initializeApp(config);
}

/** Salva uma confirmação de presença. Telefone só com dígitos (DDD + número). */
export async function saveRsvp(nome: string, telefone: string) {
  if (!isFirebaseConfigured) {
    throw new Error("firebase-not-configured");
  }
  const write = addDoc(collection(getFirestore(app()), RSVP_COLLECTION), {
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

/* ---------- Área dos organizadores (/lista) ---------- */

export type Rsvp = { id: string; nome: string; telefone: string; criadoEm: Date | null };

export function watchUser(cb: (user: User | null) => void) {
  return onAuthStateChanged(getAuth(app()), cb);
}

export function signInWithGoogle() {
  return signInWithPopup(getAuth(app()), new GoogleAuthProvider());
}

export function signOutAdmin() {
  return signOut(getAuth(app()));
}

/**
 * Escuta a lista de confirmados em tempo real. Só funciona para e-mails
 * autorizados em firestore.rules; os outros recebem "permission-denied".
 */
export function watchRsvps(onData: (rows: Rsvp[]) => void, onError: (code: string) => void) {
  const q = query(collection(getFirestore(app()), RSVP_COLLECTION), orderBy("criadoEm", "desc"));
  return onSnapshot(
    q,
    (snap) =>
      onData(
        snap.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            nome: String(data.nome ?? ""),
            telefone: String(data.telefone ?? ""),
            criadoEm: (data.criadoEm as Timestamp | null)?.toDate() ?? null,
          };
        }),
      ),
    (err) => onError((err as { code?: string }).code ?? "unknown"),
  );
}

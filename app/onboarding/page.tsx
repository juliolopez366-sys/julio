'use client';

// Onboarding de FoodScan — Sesión 4 (02B + 50-DISENO-ONBOARDING-PAYWALL.md).
// Preguntas derivadas de FICHA-AVATAR.md: eco de dolores, objeción #1 desarmada,
// compromiso de días de registro. Onboarding-first registrado (ver ESTADO.md).

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { AlertCircle, Clock, HelpCircle, XCircle, Instagram, Search, Users, Sparkles, Camera, ScanLine, TriangleAlert } from 'lucide-react';
import { FunnelHeader, Chip, CtaPrimario, Mordisco, PantallaFunnel } from '@/components/onboarding/funnel-ui';

type Respuestas = {
  preocupacion?: string;
  momento?: string;
  intentos?: string;
  diasMeta: number;
  canal?: string;
};

const PASOS_TOTALES = 9; // para el % de la barra (incluye reconocimientos + demo Aha, 02B)

export default function OnboardingPage() {
  const router = useRouter();
  const [paso, setPaso] = useState(0);
  const [direccion, setDireccion] = useState<1 | -1>(1);
  const [respuestas, setRespuestas] = useState<Respuestas>({ diasMeta: 5 });

  const avanzar = (patch?: Partial<Respuestas>) => {
    if (patch) setRespuestas((r) => ({ ...r, ...patch }));
    setDireccion(1);
    setPaso((p) => p + 1);
  };
  const retroceder = () => {
    setDireccion(-1);
    setPaso((p) => Math.max(0, p - 1));
  };

  // Progreso con ENDOWED PROGRESS: arranca en 8%, nunca en 0 (A2 del 50).
  const progreso = Math.round(8 + (paso / PASOS_TOTALES) * 92);

  useEffect(() => {
    if (paso === PASOS_TOTALES) {
      sessionStorage.setItem('foodscan_onboarding', JSON.stringify(respuestas));
      const t = setTimeout(() => router.push('/paywall'), 6300);
      return () => clearTimeout(t);
    }
  }, [paso, respuestas, router]);

  const reduce = useReducedMotion();
  const variants = {
    entrar: (dir: 1 | -1) => ({ x: reduce ? 0 : dir === 1 ? 40 : -40, opacity: 0 }),
    centro: { x: 0, opacity: 1 },
    salir: (dir: 1 | -1) => ({ x: reduce ? 0 : dir === 1 ? -24 : 24, opacity: 0 }),
  };

  return (
    <PantallaFunnel>
      <FunnelHeader onBack={paso > 0 && paso < PASOS_TOTALES ? retroceder : undefined} progreso={paso <= PASOS_TOTALES ? progreso : undefined} />
      <div className="mx-auto flex w-full max-w-[500px] flex-1 flex-col overflow-hidden px-4 pb-8 pt-6">
        <AnimatePresence mode="wait" custom={direccion} initial={false}>
          <motion.div
            key={paso}
            custom={direccion}
            variants={variants}
            initial="entrar"
            animate="centro"
            exit="salir"
            transition={{ duration: reduce ? 0.15 : 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-1 flex-col"
          >
            {paso === 0 && (
              <Pregunta
                numeroPregunta={1}
                titulo="¿Qué es lo que más te preocupa de tu SII?"
                acento="preocupa"
                microcopy="Así priorizamos qué te mostramos primero."
                opciones={[
                  { icon: <AlertCircle size={20} />, label: 'La hinchazón y el dolor abdominal' },
                  { icon: <Clock size={20} />, label: 'La ansiedad de no llegar a un baño' },
                  { icon: <Users size={20} />, label: 'Cancelar planes sociales por miedo' },
                  { icon: <HelpCircle size={20} />, label: 'Ya no confiar en mi propio cuerpo' },
                ]}
                onSeleccionar={(label) => avanzar({ preocupacion: label })}
              />
            )}

            {paso === 1 && (
              <Pregunta
                numeroPregunta={2}
                titulo="¿Cuándo sueles sentir tus peores síntomas?"
                acento="peores síntomas"
                microcopy="Esto ajusta la ventana de horas que revisamos por cada comida."
                opciones={[
                  { icon: <Clock size={20} />, label: 'Después de almorzar' },
                  { icon: <Clock size={20} />, label: 'En la noche' },
                  { icon: <HelpCircle size={20} />, label: 'Es impredecible' },
                  { icon: <HelpCircle size={20} />, label: 'Depende del día' },
                ]}
                onSeleccionar={(label) => avanzar({ momento: label })}
              />
            )}

            {paso === 2 && (
              <Reconocimiento
                titulo="Tiene sentido"
                texto={
                  <>
                    Si tus síntomas son <b className="font-semibold text-[var(--text-primary)]">&ldquo;{respuestas.momento?.toLowerCase()}&rdquo;</b>, el problema no es que comas mal — es que
                    ningún síntoma llega justo cuando comiste el detonante. Por eso cruzamos tus últimas{' '}
                    <span className="text-[var(--accent)] font-semibold">48 horas</span>, no solo tu última comida.
                  </>
                }
                onContinuar={() => avanzar()}
              />
            )}

            {paso === 3 && (
              <Pregunta
                numeroPregunta={3}
                titulo="¿Ya intentaste otras apps para esto?"
                acento="otras apps"
                microcopy="Queremos saber qué no te funcionó."
                opciones={[
                  { icon: <XCircle size={20} />, label: 'Sí, y las abandoné' },
                  { icon: <HelpCircle size={20} />, label: 'Uso un diario de papel' },
                  { icon: <Sparkles size={20} />, label: 'No, es mi primera vez' },
                ]}
                onSeleccionar={(label) => avanzar({ intentos: label })}
              />
            )}

            {paso === 4 && <AhaSimulacion onContinuar={() => avanzar()} />}

            {paso === 5 && (
              <Reconocimiento
                titulo="No fue falta de disciplina"
                texto={
                  <>
                    Esas apps te hacen teclear cada ingrediente a mano y al final muestran los{' '}
                    <b className="font-semibold text-[var(--text-primary)]">mismos alimentos en tus días buenos y malos</b>. No es que no lo intentaste bien — es que
                    ninguna cruzaba tus síntomas con el tiempo real. El{' '}
                    <span className="text-[var(--accent)] font-semibold">Motor de Detonante Real</span> sí lo hace.
                  </>
                }
                onContinuar={() => avanzar()}
              />
            )}

            {paso === 6 && (
              <Compromiso
                valorInicial={respuestas.diasMeta}
                onConfirmar={(dias) => avanzar({ diasMeta: dias })}
              />
            )}

            {paso === 7 && (
              <Pregunta
                numeroPregunta={4}
                titulo="¿Cómo conociste FoodScan?"
                acento="FoodScan"
                microcopy="Nos ayuda a saber qué está funcionando."
                opciones={[
                  { icon: <Instagram size={20} />, label: 'Instagram o TikTok' },
                  { icon: <Search size={20} />, label: 'Buscando en Google' },
                  { icon: <Users size={20} />, label: 'Recomendación de alguien' },
                  { icon: <Sparkles size={20} />, label: 'Otro' },
                ]}
                onSeleccionar={(label) => avanzar({ canal: label })}
              />
            )}

            {paso === 8 && (
              <Reconocimiento
                titulo="Tus respuestas te describen"
                texto={
                  <>
                    Eres de las que buscan una <b className="font-semibold text-[var(--text-primary)]">respuesta real</b>, no otra lista genérica de alimentos prohibidos.
                    Tu <span className="text-[var(--accent)] font-semibold">Motor de Detonante Real</span> está a punto de ponerse a trabajar con exactamente esos datos.
                  </>
                }
                onContinuar={() => avanzar()}
                cta="Construir mi plan"
              />
            )}

            {paso === PASOS_TOTALES && <PantallaCarga respuestas={respuestas} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </PantallaFunnel>
  );
}

function TituloConAcento({ titulo, acento, className }: { titulo: string; acento?: string; className: string }) {
  if (!acento || !titulo.includes(acento)) {
    return <h1 className={className}>{titulo}</h1>;
  }
  const [antes, despues] = titulo.split(acento);
  return (
    <h1 className={className}>
      {antes}
      <span className="text-[var(--accent)]">{acento}</span>
      {despues}
    </h1>
  );
}

const PREGUNTAS_TOTAL = 4;

function Pregunta({
  numeroPregunta,
  titulo,
  acento,
  microcopy,
  opciones,
  onSeleccionar,
}: {
  numeroPregunta: number;
  titulo: string;
  acento?: string;
  microcopy?: string;
  opciones: { icon?: React.ReactNode; label: string }[];
  onSeleccionar: (label: string) => void;
}) {
  const [seleccionado, setSeleccionado] = useState<string | null>(null);
  const elegir = (label: string) => {
    if (seleccionado) return;
    setSeleccionado(label);
    setTimeout(() => onSeleccionar(label), 300);
  };
  return (
    <div className="flex flex-1 flex-col gap-8 pt-8">
      <div className="flex flex-col gap-4">
        <span className="inline-flex w-fit items-center justify-center rounded-[var(--radius-button)] bg-[var(--chip-bg)] px-5 py-4 shadow-[0_6px_20px_color-mix(in_oklab,var(--accent)_20%,transparent)]">
          <Mordisco size="lg" />
        </span>
        <span className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)]">
          Pregunta {numeroPregunta} de {PREGUNTAS_TOTAL}
        </span>
        <TituloConAcento
          titulo={titulo}
          acento={acento}
          className="text-balance text-[28px] font-bold leading-[1.1] tracking-[-0.02em] [font-family:var(--font-display)]"
        />
        {microcopy && <p className="text-[14px] text-[var(--text-secondary)]">{microcopy}</p>}
      </div>
      <div
        role="radiogroup"
        className="flex flex-col gap-3"
        onKeyDown={(e) => {
          if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
          e.preventDefault();
          const botones = Array.from(e.currentTarget.querySelectorAll('button'));
          const actual = botones.indexOf(document.activeElement as HTMLButtonElement);
          const siguiente = e.key === 'ArrowDown' ? (actual + 1) % botones.length : (actual - 1 + botones.length) % botones.length;
          botones[siguiente]?.focus();
        }}
      >
        {opciones.map((op, i) => (
          <Chip key={op.label} index={i} label={op.label} icon={op.icon} seleccionado={seleccionado === op.label} onClick={() => elegir(op.label)} />
        ))}
      </div>
      <p className="text-center text-[12px] text-[var(--text-tertiary)]">Puedes cambiar tu respuesta después desde tu perfil.</p>
    </div>
  );
}

function Reconocimiento({
  titulo,
  texto,
  onContinuar,
  cta = 'Continuar',
}: {
  titulo: string;
  texto: React.ReactNode;
  onContinuar: () => void;
  cta?: string;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-5 text-center">
        <span className="inline-flex w-fit items-center justify-center rounded-[var(--radius-button)] bg-[var(--chip-bg)] px-5 py-4 shadow-[0_6px_20px_color-mix(in_oklab,var(--accent)_20%,transparent)]">
          <Mordisco size="lg" />
        </span>
        <h1 className="text-balance text-[26px] font-bold leading-[1.15] [font-family:var(--font-display)]">{titulo}</h1>
        <p className="max-w-[38ch] text-[16px] leading-[1.5] text-[var(--text-secondary)]">{texto}</p>
      </div>
      <CtaPrimario onClick={onContinuar}>{cta}</CtaPrimario>
    </div>
  );
}

/** Rompe la objeción #1 de FICHA-AVATAR.md ("la IA no va a acertar con comidas de
    restaurante") con una DEMO simulada, no una promesa abstracta — justo después de
    que ella cuenta qué apps ya abandonó (paso 3), antes del reconocimiento de texto. */
function AhaSimulacion({ onContinuar }: { onContinuar: () => void }) {
  const reduce = useReducedMotion();
  const [detectado, setDetectado] = useState(reduce ?? false);
  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setDetectado(true), 1600);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <div className="flex flex-1 flex-col gap-6 pt-8">
      <div className="flex flex-col gap-4">
        <span className="inline-flex w-fit items-center justify-center rounded-[var(--radius-button)] bg-[var(--chip-bg)] px-5 py-4 shadow-[0_6px_20px_color-mix(in_oklab,var(--accent)_20%,transparent)]">
          <Mordisco size="lg" />
        </span>
        <span className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)]">Así funciona</span>
        <h1 className="text-balance text-[26px] font-bold leading-[1.15] [font-family:var(--font-display)]">
          Un plato compuesto, sin adivinar
        </h1>
        <p className="text-[14px] text-[var(--text-secondary)]">
          Reconocemos el plato y lo cruzamos con recetas típicas para marcar ingredientes de riesgo — luego tú confirmas en un toque lo que sí llevaba.
        </p>
      </div>

      <div className="relative flex flex-col items-center gap-5 rounded-[var(--radius-card)] bg-[var(--surface)] p-6 shadow-[0_4px_16px_color-mix(in_oklab,var(--accent)_10%,transparent)]">
        <span className="absolute right-4 top-4 rounded-full bg-[var(--surface-2)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)]">
          Ejemplo
        </span>
        <div className="relative flex size-40 items-center justify-center overflow-hidden rounded-full bg-[var(--surface-2)] shadow-[inset_0_2px_8px_color-mix(in_oklab,var(--text-primary)_12%,transparent)]">
          {/* Plato simulado: pasta (trazos) + 3 piezas de "ajo" — una se marca al detectar */}
          <svg viewBox="0 0 100 100" className="size-28" aria-hidden="true">
            <path d="M20,35 Q35,25 50,38 Q65,50 80,38" fill="none" stroke="var(--text-tertiary)" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
            <path d="M18,52 Q35,42 52,55 Q68,66 82,54" fill="none" stroke="var(--text-tertiary)" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
            <path d="M24,68 Q38,60 54,70 Q66,78 78,68" fill="none" stroke="var(--text-tertiary)" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
            <circle cx="34" cy="30" r="4" fill="var(--text-tertiary)" opacity="0.6" />
            <motion.circle
              cx="58"
              cy="45"
              r={detectado ? 6 : 4}
              fill={detectado ? 'var(--alerta)' : 'var(--text-tertiary)'}
              opacity={detectado ? 1 : 0.6}
              animate={detectado && !reduce ? { scale: [1, 1.3, 1] } : undefined}
              transition={{ duration: 0.6 }}
            />
            <circle cx="44" cy="62" r="4" fill="var(--text-tertiary)" opacity="0.6" />
          </svg>

          {!detectado && (
            <motion.div
              aria-hidden="true"
              className="absolute inset-x-3 h-[3px] rounded-full bg-[color-mix(in_oklab,var(--accent)_70%,transparent)] shadow-[0_0_12px_2px_color-mix(in_oklab,var(--accent)_50%,transparent)]"
              initial={{ top: '8%' }}
              animate={reduce ? undefined : { top: ['8%', '92%', '8%'] }}
              transition={reduce ? undefined : { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </div>

        <div className="flex items-center gap-2 text-[13px] font-medium text-[var(--text-secondary)]">
          {detectado ? (
            <>
              <ScanLine size={16} className="text-[var(--accent)]" aria-hidden="true" /> Análisis completo
            </>
          ) : (
            <>
              <Camera size={16} aria-hidden="true" />
              <motion.span animate={reduce ? undefined : { opacity: [1, 0.4, 1] }} transition={reduce ? undefined : { duration: 1, repeat: Infinity }}>
                Analizando la foto…
              </motion.span>
            </>
          )}
        </div>

        <AnimatePresence>
          {detectado && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex w-full items-start gap-3 rounded-[var(--radius-button)] bg-[color-mix(in_oklab,var(--alerta)_12%,transparent)] p-4"
            >
              <TriangleAlert size={20} className="mt-0.5 shrink-0 text-[var(--alerta)]" aria-hidden="true" />
              <p className="text-[15px] leading-snug text-[var(--text-primary)]">
                <b className="font-semibold">Probable ajo oculto en la salsa — Alto en FODMAP.</b> Confírmalo en un toque si lo sabes.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="text-center text-[14px] text-[var(--text-secondary)]">
        Te avisamos del riesgo probable — tú tienes la última palabra.
      </p>

      <div className="mt-auto">
        <CtaPrimario onClick={() => (detectado ? onContinuar() : setDetectado(true))}>
          {detectado ? 'Así de simple' : 'Analizando… (toca para ver el resultado)'}
        </CtaPrimario>
      </div>
    </div>
  );
}

function Compromiso({ valorInicial, onConfirmar }: { valorInicial: number; onConfirmar: (v: number) => void }) {
  const [dias, setDias] = useState(valorInicial);
  const feedback = useMemo(() => {
    if (dias <= 3) return 'Un buen punto de partida';
    if (dias <= 6) return 'Meta realista para encontrar tu patrón';
    return 'Ambiciosa — te acompañamos día a día';
  }, [dias]);
  return (
    <div className="flex flex-1 flex-col gap-8">
      <h1 className="text-balance text-[26px] font-bold leading-[1.15] [font-family:var(--font-display)]">
        ¿Cuántos días quieres registrar esta semana?
      </h1>
      <div className="flex flex-col items-center gap-3 py-4">
        <p className="text-[48px] font-bold leading-none tabular-nums [font-family:var(--font-display)]">{dias}</p>
        <p className="text-[14px] text-[var(--text-secondary)]">días esta semana</p>
        <input
          type="range"
          min={3}
          max={7}
          step={1}
          value={dias}
          onChange={(e) => setDias(Number(e.target.value))}
          className="mt-4 w-full accent-[var(--accent)]"
          aria-label="Días de registro por semana"
        />
        <div className="flex w-full justify-between text-[12px] text-[var(--text-tertiary)]">
          <span>3</span>
          <span>7</span>
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-[14px] font-medium text-[var(--accent)]">⚡ {feedback}</p>
      </div>
      <div className="mt-auto">
        <CtaPrimario onClick={() => onConfirmar(dias)}>Fijar mi meta</CtaPrimario>
      </div>
    </div>
  );
}

function PantallaCarga({ respuestas }: { respuestas: Respuestas }) {
  const lineas = useMemo(
    () => [
      `Analizando tu prioridad: ${(respuestas.preocupacion ?? 'tus síntomas').toLowerCase()}`,
      `Ajustando tu ventana de correlación a 48 horas`,
      `Configurando tu meta de ${respuestas.diasMeta} días de registro`,
      `Preparando tu Motor de Detonante Real`,
      `Tu patrón aparece apenas un ingrediente se repita en tus días malos`,
    ],
    [respuestas]
  );
  const [activo, setActivo] = useState(0);
  useEffect(() => {
    if (activo >= lineas.length - 1) return;
    const t = setTimeout(() => setActivo((a) => a + 1), 1100);
    return () => clearTimeout(t);
  }, [activo, lineas.length]);
  const porcentaje = Math.round(((activo + 1) / lineas.length) * 100);
  const reduce = useReducedMotion();

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-10" aria-live="polite" aria-busy="true">
      <div className="relative flex size-28 items-center justify-center">
        <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
          <circle cx="50" cy="50" r="42" fill="none" stroke="color-mix(in oklab, var(--accent) 14%, transparent)" strokeWidth="9" />
          <motion.circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={264}
            initial={{ strokeDashoffset: 264 }}
            animate={{ strokeDashoffset: 264 - (264 * porcentaje) / 100 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <span className="text-[22px] font-bold tabular-nums [font-family:var(--font-display)]">{porcentaje}%</span>
      </div>
      <h1 className="text-[22px] font-bold [font-family:var(--font-display)]">Construyendo tu plan…</h1>
      <ul className="flex w-full flex-col gap-4">
        {lineas.map((l, i) => (
          <motion.li
            key={l}
            initial={{ opacity: 0, y: reduce ? 0 : 8 }}
            animate={{ opacity: i <= activo ? 1 : 0.4, y: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3 text-[15px]"
          >
            {i < activo ? (
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--bg)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
            ) : i === activo ? (
              <motion.span
                animate={reduce ? { opacity: 1 } : { opacity: [1, 0.4, 1] }}
                transition={reduce ? undefined : { duration: 1, repeat: Infinity }}
                className="size-5 shrink-0 rounded-full bg-[var(--accent)]"
              />
            ) : (
              <span className="size-5 shrink-0 rounded-full border-2 border-[color-mix(in_oklab,var(--text-tertiary)_40%,transparent)]" />
            )}
            <span className={i <= activo ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}>{l}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

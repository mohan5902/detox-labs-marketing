import Link from "next/link";
import Container from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center">
      <Container className="text-center">
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-circuit-400">
          404
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-ink-100">
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-3 text-ink-500">
          Let&apos;s get you back to something useful.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-circuit-500 to-cyan-accent px-6 py-3 text-sm font-semibold text-void"
        >
          Back to Home
        </Link>
      </Container>
    </section>
  );
}

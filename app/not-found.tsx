import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-midnight px-4">
      <div className="text-center">
        <h1 className="text-8xl font-extrabold font-mono text-egyptian-blue">
          404
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          Page not found. The signal was lost in the void.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-egyptian-blue/20"
        >
          Return to ENIGMO LABS
        </Link>
      </div>
    </section>
  );
}

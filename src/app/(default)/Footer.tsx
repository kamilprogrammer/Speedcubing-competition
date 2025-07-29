import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-transparent">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 dark:text-gray-400">
            <Link href="https://campsite.bio/kamelrifai">
              Powered by <span className="font-bold">Kamel Rifai</span>
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

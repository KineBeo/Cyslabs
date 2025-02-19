import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-row justify-between bg-black px-10 py-5">
      <div className="flex flex-row mobile:flex-col gap-6 mobile:gap-2">
        <Link className="font-bold text-lg" href="https://github.com/KineBeo" target="_blank">GITHUB</Link>
        <Link className="font-bold text-lg" href="https://cyslabs.vercel.app/" target="_blank">TELEGRAM</Link>
      </div>
      <div className="tablet:flex mobile:flex mobile:place-self-end tablet:place-self-end">
        <p className="font-bold text-lg">© 2025 CYSLABS</p>
      </div>
    </footer>
  );
}
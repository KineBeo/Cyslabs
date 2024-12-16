


export default function Footer( ){
    return (
      <footer className="flex flex-row justify-between px-10 py-5 bg-black">
        <div className="flex flex-row gap-6 mobile:flex-col mobile:gap-2 ">
          <a className="font-bold text-lg" href="https://facebook.com" target="_blank">FACEBOOK</a>
          <a className="font-bold text-lg" href="https://github.com" target="_blank">GITHUB</a>
          <a className="font-bold text-lg" href="https://cyslabs.vercel.app/" target="_blank">WEBISTE</a>
        </div>
        <div className="mobile:flex tablet:flex mobile:place-self-end tablet:place-self-end">
          <p className="font-bold text-lg">© 2024 CYSLABS</p>
        </div>
      </footer>
    );
}
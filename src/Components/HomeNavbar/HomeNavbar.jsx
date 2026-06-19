


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import logo4 from "../../assets/images/logo4.svg";

// const navLinks = [
//   { label: "Home", href: "home" },
//   { label: "About", href: "about" },
//   { label: "Services", href: "services" },
//   { label: "Contact", href: "contact" },
// ];

// export default function HomeNavbar() {
//   const navigate = useNavigate();
//   const [activeSection, setActiveSection] = useState("home");
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//       const sections = navLinks.map((l) => document.getElementById(l.href));
//       let current = "home";
//       sections.forEach((sec) => {
//         if (!sec) return;
//         if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
//       });
//       setActiveSection(current);
//     };
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const scrollTo = (id) => {
//     const el = document.getElementById(id);
//     if (el) el.scrollIntoView({ behavior: "smooth" });
//     setMenuOpen(false);
//   };

//   return (
//     <nav
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         scrolled
//           ? "bg-[#0a0a1a]/90 backdrop-blur-md shadow-lg shadow-black/40 border-b border-teal-900/40"
//           : "bg-transparent"
//       }`}
//     >
//       <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

//         {/* Logo */}
//         <button
//           onClick={() => scrollTo("home")}
//           className="flex items-center space-x-3 cursor-pointer bg-transparent border-none"
//         >
//           <img src={logo4} className="h-12" alt="Decopia Logo" />
//           <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
//             Decopia
//           </span>
//         </button>

//         {/* Right: Login + Hamburger */}
//         <div className="flex md:order-2 items-center gap-3">
//           <button
//             onClick={() => navigate("/login")}
//             type="button"
//             className="text-white bg-teal-500 hover:bg-teal-600 transition-colors duration-200 focus:outline-none font-medium rounded-lg text-base px-4 py-2 cursor-pointer w-32"
//           >
//             Login
//           </button>

//           {/* Hamburger — mobile only */}
//           <button
//             onClick={() => setMenuOpen((v) => !v)}
//             type="button"
//             className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-300 rounded-lg md:hidden hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
//             aria-expanded={menuOpen}
//           >
//             <span className="sr-only">Open main menu</span>
//             <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
//               <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
//             </svg>
//           </button>
//         </div>

//         {/* Nav links — always visible on desktop, toggle on mobile */}
//         <div
//           className="w-full md:flex md:w-auto md:order-1"
//           style={
//             isMobile
//               ? {
//                   maxHeight: menuOpen ? "240px" : "0px",
//                   opacity: menuOpen ? 1 : 0,
//                   overflow: "hidden",
//                   transition: "max-height 0.3s ease, opacity 0.3s ease",
//                   marginTop: menuOpen ? "8px" : "0",
//                 }
//               : {}
//           }
//         >
//           <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
//             {navLinks.map((link) => (
//               <li key={link.href}>
//                 <a
//                   href={`#${link.href}`}
//                   onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
//                   className={`block py-2 px-3 md:p-0 transition-colors duration-200 relative group no-underline ${
//                     activeSection === link.href
//                       ? "text-teal-400"
//                       : "text-gray-300 hover:text-teal-400"
//                   }`}
//                 >
//                   {link.label}
//                   <span
//                     className={`absolute -bottom-1 left-0 h-0.5 bg-teal-400 transition-all duration-300 ${
//                       activeSection === link.href ? "w-full" : "w-0 group-hover:w-full"
//                     }`}
//                   />
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>

//       </div>
//     </nav>
//   );
// }



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo4 from "../../assets/images/logo4.svg";

const navLinks = [
  { label: "Home", href: "home" },
  { label: "About", href: "about" },
  { label: "Services", href: "services" },
  { label: "Contact", href: "contact" },
];

export default function HomeNavbar() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navLinks.map((l) => document.getElementById(l.href));
      let current = "home";
      sections.forEach((sec) => {
        if (!sec) return;
        if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a1a]/90 backdrop-blur-md shadow-lg shadow-black/40 border-b border-teal-900/40"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

        {/* Logo */}
        <button
          onClick={() => scrollTo("home")}
          className="flex items-center space-x-3 cursor-pointer bg-transparent border-none"
        >
          <img src={logo4} className="h-12" alt="Decopia Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Decopia
          </span>
        </button>

        {/* Right: Login (hidden on mobile) + Hamburger */}
        <div className="flex md:order-2 items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            type="button"
            className="hidden md:inline-flex text-white bg-teal-500 hover:bg-teal-600 transition-colors duration-200 focus:outline-none font-medium rounded-lg text-base px-4 py-2 cursor-pointer w-20  text-center"
          >
            Login
          </button>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-300 rounded-lg md:hidden hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
            aria-expanded={menuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"} text-lg`}></i>
          </button>
        </div>

        {/* Nav links — always visible on desktop, toggle on mobile */}
        <div
          className="w-full md:flex md:w-auto md:order-1"
          style={
            isMobile
              ? {
                  maxHeight: menuOpen ? "240px" : "0px",
                  opacity: menuOpen ? 1 : 0,
                  overflow: "hidden",
                  transition: "max-height 0.3s ease, opacity 0.3s ease",
                  marginTop: menuOpen ? "8px" : "0",
                }
              : {}
          }
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={`#${link.href}`}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  className={`block py-2 px-3 md:p-0 transition-colors duration-200 relative group no-underline ${
                    activeSection === link.href
                      ? "text-teal-400"
                      : "text-gray-300 hover:text-teal-400"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-teal-400 transition-all duration-300 ${
                      activeSection === link.href ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </nav>
  );
}
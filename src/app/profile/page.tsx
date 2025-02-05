"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import kolo from "../../../kolo-nowe.png";
import descriptions from "../../../descriptions.json";
import useMenuStore from "../components/menuContext";

const Profile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [clickedSection, setClickedSection] = useState<string | null>(null);
  const [descSection, setDescSection] = useState<number>(9);
  const wheelRef = useRef<HTMLImageElement | null>(null);
  const [rotationOffset, setRotationOffset] = useState<number>(0);

  const descriptionsArray: string[] = descriptions.descriptions;

  const { menuOpened } = useMenuStore();

  const sections: string[] = [
    "Technik Spedytor",
    "Technik Weterynarii",
    "Technik Projektant Tekstyliów",
    "Technik Programista",
    "Technik Logistyk",
    "Technik Informatyk",
    "Technik Fotografii i Multimediów",
    "Technik Analityk",
    "Technik Tekstronik",
    "Eko Technik",
  ];

  useEffect(() => {
    const updateBodyScrollability = () => {
      if (window.innerWidth >= 1024) {
        document.body.style.overflowY = "hidden";
        document.body.style.overflowX = "hidden";
      } else {
        document.body.style.overflowY = "auto";
        document.body.style.overflowX = "hidden";
      }
    };

    updateBodyScrollability();

    window.addEventListener("resize", updateBodyScrollability);

    return () => {
      window.removeEventListener("resize", updateBodyScrollability);
      document.body.style.overflowY = "auto";
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (wheelRef.current) {
        const computedStyle = getComputedStyle(wheelRef.current);
        const transform = computedStyle.getPropertyValue("transform");
        if (transform !== "none") {
          const values = transform.split("(")[1].split(")")[0].split(",");
          const a = parseFloat(values[0]);
          const b = parseFloat(values[1]);
          const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
          setRotationOffset((angle + 360) % 360);
        }
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleWheelClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (wheelRef.current) {
      const rect = wheelRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const clickAngle = Math.atan2(y, x) * (180 / Math.PI) + 90;
      const normalizedClickAngle = (clickAngle + 360) % 360;
      const adjustedAngle = (normalizedClickAngle - rotationOffset + 360) % 360;
      const sectionAngle = 360 / sections.length;
      let sectionIndex = Math.floor(adjustedAngle / sectionAngle);
      sectionIndex = sectionIndex % sections.length;

      /*
      if (sections[sectionIndex] === "Technik Logistyk") {
        setClickedSection("Technik Logistyk");
        setDescSection(4);
      } else if (sections[sectionIndex] === "Technik Informatyk") {
        setClickedSection("Technik Informatyk");
        setDescSection(5);
      } else if (sections[sectionIndex] === "Technik Programista") {
        setClickedSection("Technik Programista");
        setDescSection(3);
      } else if (sections[sectionIndex] === "Technik Fotografii i Multimediów") {
        setClickedSection("Technik Fotografii i Multimediów");
        setDescSection(6);
      } else if (sections[sectionIndex] === "Technik Projektant Tekstyliów") {
        setClickedSection("Technik Projektant Tekstyliów");
        setDescSection(2);
      } else if (sections[sectionIndex] === "Technik Analityk") {
        setClickedSection("Technik Analityk");
        setDescSection(7);
      } else if (sections[sectionIndex] === "Technik Weterynarii") {
        setClickedSection("Technik Weterynarii");
        setDescSection(1);
      } else if (sections[sectionIndex] === "Technik Tekstronik") {
        setClickedSection("Technik Tekstronik");
        setDescSection(8);
      } else if (sections[sectionIndex] === "Technik Spedytor") {
        setClickedSection("Technik Spedytor");
        setDescSection(0);
      } else if (sections[sectionIndex] === "Nowy Profil") {
        setClickedSection("Nowy Profil");
        setDescSection(9); 
      } else {
        setClickedSection("Kliknij poprawny profil");
        setDescSection(10);
      }
        */

      if (sectionIndex == 0) {
        setClickedSection("Technik Projektant Tekstyliów");
        setDescSection(2);
      } else if (sectionIndex == 1) {
        setClickedSection("Technik Analityk");
        setDescSection(7);
      } else if (sectionIndex == 2) {
        setClickedSection("Technik Logistyk");
        setDescSection(4);
      } else if (sectionIndex == 3) {
        setClickedSection("Technik Informatyk");
        setDescSection(5);
      } else if (sectionIndex == 4) {
        setClickedSection("Technik Tekstronik");
        setDescSection(8);
      } else if (sectionIndex == 5) {
        setClickedSection("Technik Programista");
        setDescSection(3);
      } else if (sectionIndex == 6) {
        setClickedSection("Technik Weterynarii");
        setDescSection(1);
      } else if (sectionIndex == 7) {
        setClickedSection("Technik Spedytor");
        setDescSection(0);
      } else if (sectionIndex == 8) {
        setClickedSection("Eko Technik");
        setDescSection(9);
      } else if (sectionIndex == 9) {
        setClickedSection("Technik Fotografii i Multimediów");
        setDescSection(6);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-[87vh] flex flex-col justify-center items-center">
        <div className="lg:w-[10%] md:w-[15%] sm:w-[40%] w-[40%] h-[10%] flex justify-evenly items-center">
          <div className="loadingPart loadingPart1 max-w-4 min-w-2 h-[50%] "></div>
          <div className="loadingPart loadingPart2 max-w-4 min-w-2 h-[50%] "></div>
          <div className="loadingPart loadingPart3 max-w-4 min-w-2 h-[50%] "></div>
          <div className="loadingPart loadingPart4 max-w-4 min-w-2 h-[50%] "></div>
          <div className="loadingPart loadingPart5 max-w-4 min-w-2 h-[50%] "></div>
        </div>
        <h1 className="text-gray-700 lg:text-3xl md:text-2xl sm:text-xl">
          Proszę czekać
        </h1>
      </div>
    );
  } else {
    return !menuOpened ? (
      <div className="w-full h-[87vh] max-h-[87vh] flex flex-col lg:flex-row justify-between items-center">
        <div className="w-full lg:w-[65%] h-full flex justify-center items-center p-10 relative">
          <Image
            src={kolo}
            alt="Koło profili"
            ref={wheelRef}
            className="kolo min-w-[10vw] max-w-[50vw] "
            priority
            onClick={handleWheelClick}
          />
        </div>
        <div className="w-full lg:w-[35%] h-full flex flex-col justify-start items-center lg:items-start">
          {clickedSection ? (
            <div className="w-full flex flex-col items-center lg:items-start">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-5xl font-bold text-black mb-4">
                {clickedSection}
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl text-black text-center lg:text-left">
                {descSection !== null && descSection < descriptionsArray.length
                  ? descriptionsArray[descSection]
                  : "Opis nie jest dostępny"}
              </p>
            </div>
          ) : (
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-black font-bold">
              Wybierz profil
            </h1>
          )}
        </div>
      </div>
    ) : null;
  }
};

export default Profile;

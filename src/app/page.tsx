'use client'
import { TypeAnimation } from "react-type-animation";


const Home = () => {
    return ( 
        <div className="w-screen h-[87vh] flex justify-center items-center p-4">
            
            <TypeAnimation
                sequence={[
                    'Witamy na Wojewódzkim Konkursie Informatycznym Dla Uczniów Klas VII - VIII.',
                    1000, 
                    'Organizowanym przez Centrum Kształcenia Zawodowego i Ustawicznego w Łodzi.',
                    1000,

                ]}
                wrapper="span"
                speed={50}
                className="tekstRuszajacy"
                repeat={Infinity}
                />
        </div>
    );
}

export default Home;

import {ThemeToggle} from "@/components/theme-toogle";

export default function Home() {
  return (
    <>
       <div className=''>
           <ThemeToggle/>
           <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-100 to-white">
               <h1 className="text-5xl font-serif text-gray-800">Welcome To Mweb Client Zone!</h1>
               <p className="mt-4 text-lg text-gray-600 text-center max-w-md">
                   Site In-Progress
               </p>
           </div>
       </div>
    </>
    
  );
}

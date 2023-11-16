// 'use client'
// import { createContext, useState, useContext, ReactNode } from "react";
// interface Ctx {
//   isOpen : boolean,
//   handlOpening: () => void
// }

// export const DrawerContext = createContext<Ctx | undefined>(undefined);

// export const DrawerProvider = ({ children }: { children: ReactNode }) => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
  
  
//   const handlOpening = () => {
//     setIsOpen(prev => !prev)
//   }

//   return (
//     <DrawerContext.Provider value={{ isOpen, handlOpening }}>
//       {children}
//     </DrawerContext.Provider>
//   );
// };

// export const useDrawer = () => {
//   const context = useContext(DrawerContext);
//   if (context == undefined) {
//     throw Error ('undefined')
//   }
//   const { isOpen, handlOpening } = context;
//   return { isOpen, handlOpening };
// };

// export default DrawerProvider;

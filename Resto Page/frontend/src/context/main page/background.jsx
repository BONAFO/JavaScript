//CONTEXT OF BACKGROUNDS IN THE MAIN PAGE
import { createContext, useContext } from "react";

export const BackgContext = createContext();
export const getBackgrounds = () => useContext(BackgContext);

const BackgroundProvider = ({ children }) => {
  const backgrounds = [
    "https://img.freepik.com/premium-photo/various-mexican-food-dark-background_23-2147740705.jpg",
    "https://e0.pxfuel.com/wallpapers/52/830/desktop-wallpaper-food-background-food-food-recipes-food-menu-greek-food.jpg",
    "https://img.rawpixel.com/private/static/images/website/2022-05/px1369813-image-kwvxxp91.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=fffc03ba9aaa6a55c5e803700a96684b",
  ];

  return (
    <BackgContext.Provider value={backgrounds}>
      {children}
    </BackgContext.Provider>
  );
};

export default BackgroundProvider;

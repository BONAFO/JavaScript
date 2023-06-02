import isMobile from "./isMobile";

export let setters = [];

export const deletePage = (id) => {
  setters = setters.filter((set) => set.id !== id);
};

export const resizePage = () => {
  setters.map((set) => set.set(isMobile() ? "mob" : "desk"));
};

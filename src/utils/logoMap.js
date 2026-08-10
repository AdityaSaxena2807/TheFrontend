// auto-import all .webp files inside icons folder
const logos = import.meta.glob("../assets/icons/*.webp", {
  eager: true,
});

export const LOGO_MAP = Object.fromEntries(
  Object.entries(logos).map(([path, module]) => {
    const name = path.split("/").pop().replace(".webp", "");
    return [name, module.default];
  }),
);

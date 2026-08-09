// auto-import all .gif files inside icons folder
const logos = import.meta.glob("../assets/icons/*.gif", {
  eager: true,
});

export const LOGO_MAP = Object.fromEntries(
  Object.entries(logos).map(([path, module]) => {
    const name = path.split("/").pop().replace(".gif", "");
    return [name, module.default];
  })
);
export default function log({ next, to }: { next: Function; to: any }) {
  console.log("log", to.name);

  return next();
}

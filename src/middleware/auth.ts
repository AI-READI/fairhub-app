export default function auth({ next, router }: { next: Function; router: any }) {
  if (!localStorage.getItem("jwt")) {
    return router.push({ name: "login" });
  }

  return next();
}

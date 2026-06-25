import ApplyForm from "@/actions/apply";

export default function ContactForm() {
  return (
    <form action={ApplyForm} className="w-full items-end flex flex-col gap-4">
      <textarea className="w-full bg-white h-32 p-2 placeholder:text-blue-light border border-blue-light rounded" name="message" placeholder="Postuler à cette offre"></textarea>
      <button type="submit" className="w-fit bg-blue-light text-white px-4 py-2 rounded hover:bg-blue-dark transition-colors mt-4">Envoyer</button>
    </form>
  );
}

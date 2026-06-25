"use server";

export default async function applyForm(formData: FormData) {
  const message = formData.get("message") as string;
  const offerTitle = formData.get("offerTitle") as string;
  const adminEmails = formData.getAll("adminEmail") as string[];

  console.log("Email payload:", {
    to: adminEmails,
    subject: `Candidature pour : ${offerTitle}`,
    body: message,
  });
}

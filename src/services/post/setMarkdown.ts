
import { db } from "@/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export default async function setMarkdown(input: string) {
  try {
    await setDoc(doc(db, 'TEST', 'Test1'), {
      d: input
    })
    console.log("POsted");
  } catch (error) {
    console.log(error);
  }
}
// Card Question tsx

import { Question } from "@/types/question";
import Image from "next/image";

interface CardQuestionProp {
  qd: Question // Question Data
}

const CardQuestion: React.FC<CardQuestionProp> = ({ qd }) => {

  return (
    <div>

      {/* <Image src={qd.image} alt="image banner" /> */}

      <div className="w-full relative pt-[100%]">
        <Image
          src={qd.image}
          alt="Question Banner Image"
          objectFit="cover"
          fill
          className="w-full h-full top-0 left-0 object-cover rounded-2xl"
        />
      </div>

      <p>{qd.title}</p>
      <div className="flex">
        <p>{qd.authorFirstName}</p>
        <p>{qd.authorLastName}</p>
      </div>

      <p>{qd.date.toString()}</p>

      <p>TAGS</p>
    </div>
  );
}

export default CardQuestion;
import React from "react";

const QuestCard = ({ featured }: { featured?: boolean }) => {
  return <div>{featured ? "Featured Quest" : "QuestCard"}</div>;
};

export default QuestCard;

"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function Card({ data }) {
  return (
    <div
      key={data.id}
      className="flex flex-col justify-center items-center w-[150px] h-[150px] border "
    >
      <div className="w-20 h-20 relative">
        <Image src={data.thumbnail} fill alt="img" />
      </div>
      <h1 className="text-sm">{data.title}</h1>
    </div>
  );
}
function Pagination({ data, onPageCLick, ActiveIndex, nextPage, prevPage }) {
  const NoOfPage = Math.ceil(data.length / 12);
  console.log(NoOfPage);

  return (
    <div className="w-fit my-5 mx-auto">
      <button
        className="text-white mr-8 w-2 h-2 underline underline-offset-8"
        onClick={prevPage}
        disabled={ActiveIndex == 0}
      >
        prev
      </button>
      {[...Array(NoOfPage)].map((_, index) => (
        <span
          className={`text-white m-2 w-2 h-2 border p-2 cursor-pointer ${
            ActiveIndex === index && "bg-violet-900"
          } `}
          key={index}
          onClick={() => onPageCLick(index + 1)}
        >
          {index + 1}
        </span>
      ))}
      <button
        className="text-white ml-4 w-2 h-2  underline underline-offset-8"
        onClick={nextPage}
        disabled={ActiveIndex == NoOfPage - 1}
      >
        next
      </button>
    </div>
  );
}

function Dashboard() {
  const [cardData, setcardData] = useState([]);
  const [toSlice, setTo] = useState(12);
  const [fromSlice, setFrom] = useState(0);
  const [ActiveIndex, setActiveIndex] = useState(null);

  const fetchCardsData = async () => {
    const response = await fetch("https://dummyjson.com/products?limit=500");
    const data = await response.json();
    console.log("data", data.products);

    setcardData(data?.products);
  };
  useEffect(() => {
    fetchCardsData();
  }, []);

  const onPageCLick = (index) => {
    setActiveIndex(index - 1);
    console.log(index, "index");

    setTo(index * 12);
    setFrom((index - 1) * 12);
  };

  const prevPage = () => {
    setActiveIndex((pre) => pre - 1);
    setTo((pre) => pre - 12);
    setFrom((pre) => pre - 12);
  };
  const nextPage = () => {
    setActiveIndex((pre) => pre + 1);
    setTo((pre) => pre + 12);
    setFrom((pre) => pre + 12);
  };

  return (
    <div className="my-5 text-center px-10 container w-[80vw] ">
      <div className="text-white my-4 text-lg">Dashboard</div>
      {!cardData.length && <tex>No Data</tex>}
      <div className="grid grid-cols-6 gap-5">
        {cardData?.length &&
          cardData
            .slice(fromSlice, toSlice)
            .map((data) => <Card key={data.id} data={data} />)}
      </div>

      {cardData?.length && (
        <Pagination
          data={cardData}
          onPageCLick={onPageCLick}
          ActiveIndex={ActiveIndex}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      )}
    </div>
  );
}

export default Dashboard;

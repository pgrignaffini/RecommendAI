/* eslint-disable @next/next/no-img-element */
import React from "react";
import { toast } from "react-hot-toast";
import type { TMDBShow } from "typings";
import { useLocalStorage, useBoolean } from "usehooks-ts";
import { useShowImages } from "~/hooks/useShowImages";

type Props = {
  show: TMDBShow;
};

function ShowCard({ show }: Props) {
  const [preferredShows, setPreferredShows] = useLocalStorage<TMDBShow[]>(
    "shows",
    []
  );
  const isAdded = preferredShows?.some((s) => s?.id === show?.id);
  const { value: added, setTrue, setFalse } = useBoolean(isAdded);
  const { smallPosterUrl } = useShowImages(show);

  return (
    <div
      key={show.id}
      className={`group relative  max-h-[250px] flex-none cursor-pointer  transition duration-300 ease-in-out hover:-translate-y-2
        hover:scale-110`}
    >
      <img
        src={smallPosterUrl}
        className="h-full w-full rounded-md object-contain"
        alt={show.title}
      />
      <div
        className="absolute inset-y-1/2 z-0 w-full opacity-0
        transition duration-300 ease-in-out group-hover:bg-transparent group-hover:opacity-80"
      >
        <div className="flex h-full items-center justify-center">
          {!added ? (
            <button
              className="rounded-full bg-[#072942] p-3 text-lg text-white"
              onClick={() => {
                if (preferredShows.length >= 5) {
                  toast.error("You can only add 5 shows");
                  return null;
                }
                setTrue();
                setPreferredShows((prev) => {
                  if (prev) {
                    return [...prev, show];
                  }
                  return [show];
                });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          ) : (
            <button
              className="text-md rounded-full bg-[#546E24] p-3 text-white"
              onClick={() => {
                const newValue = preferredShows.filter((s) => s.id !== show.id);
                if (newValue.length === 0) {
                  return null;
                } else {
                  setPreferredShows(newValue);
                }
                setFalse();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShowCard;

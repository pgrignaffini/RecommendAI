/* eslint-disable @next/next/no-img-element */
import React from "react";
import type { TMDBShow } from "typings";
import { useShowImages } from "~/hooks/useShowImages";
import { PlusCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { useBoolean, useLocalStorage } from "usehooks-ts";
import toast from "react-hot-toast";

type Props = {
  show: TMDBShow;
};

function SearchRow({ show }: Props) {
  const { url } = useShowImages(show);
  const [preferredShows, setPreferredShows] = useLocalStorage<TMDBShow[]>(
    "shows",
    []
  );
  const isAdded = preferredShows?.some((s) => s?.id === show?.id);
  const { value: added, setTrue } = useBoolean(isAdded);

  return (
    <li
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
      className=" flex cursor-pointer flex-row items-center justify-between p-3 hover:bg-secondary hover:text-gray-900 hover:opacity-50"
    >
      <img alt="show poster" src={url} className="h-12 w-12 object-cover" />
      <p className="text-lg">{show.title ?? show.name}</p>
      {added ? (
        <CheckCircleIcon className="h-6 w-6" />
      ) : (
        <PlusCircleIcon className="h-6 w-6" />
      )}
    </li>
  );
}

export default SearchRow;

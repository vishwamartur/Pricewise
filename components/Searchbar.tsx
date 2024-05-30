"use client";
import { FormEvent, useState } from "react";

const isValidAmazonProductURL = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;

    if (
      hostname.includes("amazon.in") ||
      hostname.includes("amazon.") ||
      hostname.endsWith("amazon")
    ) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
};

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidLink = isValidAmazonProductURL(searchPrompt);
    if (!isValidLink) return alert("Please Provide valid Amazon link");

    try {
      setIsLoading(true);
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        placeholder="Enter product link"
        className="searchbar-input"
      />
      <button
        className="searchbar-btn"
        type="submit"
        disabled={searchPrompt === ""}
      >
        {isLoading ? "Loading..." : "Search"}
      </button>
    </form>
  );
};

export default Searchbar;

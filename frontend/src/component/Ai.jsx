import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ai from "../assets/ai.png";
import { shopDataContext } from "../context/ShopContext";

function AI() {
  const navigate = useNavigate();

  const { setShowSearch, setSearch } =
    useContext(shopDataContext);

  const [listening, setListening] =
    useState(false);

  // ================= SPEAK =================

  const speak = (text) => {
    window.speechSynthesis.cancel();

    const speech =
      new SpeechSynthesisUtterance(text);

    speech.lang = "en-IN";
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
  };

  // ================= SOUNDS =================

  const playStartSound = () => {
    const audio = new Audio(
      "https://actions.google.com/sounds/v1/cartoon/pop.ogg"
    );
    audio.play();
  };

  const playSuccessSound = () => {
    const audio = new Audio(
      "https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg"
    );
    audio.play();
  };

  const playErrorSound = () => {
    const audio = new Audio(
      "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
    );
    audio.play();
  };

  // ================= VOICE RECOGNITION =================

  const startSpeechRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Speech Recognition is not supported in this browser."
      );
      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setListening(true);
      playStartSound();
      speak("I'm listening");
    };

    recognition.start();

    recognition.onresult = (event) => {
      playSuccessSound();

      const transcript =
        event.results[0][0].transcript
          .trim()
          .toLowerCase();

      console.log("User said:", transcript);

      // HOME
      if (
        transcript.includes("home") ||
        transcript.includes("homepage")
      ) {
        speak("Opening home");
        navigate("/");
      }

      // COLLECTIONS
      else if (
        transcript.includes("collection")
      ) {
        speak("Opening collections");
        navigate("/collections");
      }

      // SEARCH PRODUCT
      else if (
        transcript.startsWith("search ")
      ) {
        const searchText = transcript
          .replace("search", "")
          .trim();

        speak(`Searching ${searchText}`);

        setShowSearch(true);
        setSearch(searchText);

        navigate("/collections");
      }

      // OPEN SEARCH
      else if (
        transcript.includes("open search")
      ) {
        speak("Opening search");

        setShowSearch(true);

        navigate("/collections");
      }

      // CART
      else if (
        transcript.includes("cart")
      ) {
        speak("Opening cart");
        navigate("/cart");
      }

      // WISHLIST
      else if (
        transcript.includes("wishlist")
      ) {
        speak("Opening wishlist");
        navigate("/wishlist");
      }

      // ORDERS
      else if (
        transcript.includes("orders") ||
        transcript.includes("order")
      ) {
        speak("Opening orders");
        navigate("/orders");
      }

      // CHECKOUT
      else if (
        transcript.includes("checkout") ||
        transcript.includes("place order")
      ) {
        speak("Opening checkout");
        navigate("/placeorder");
      }

      // ABOUT
      else if (
        transcript.includes("about")
      ) {
        speak("Opening about page");
        navigate("/about");
      }

      // CONTACT
      else if (
        transcript.includes("contact")
      ) {
        speak("Opening contact page");
        navigate("/contact");
      }

      // MEN
      else if (
        transcript.includes("men")
      ) {
        speak("Showing men's collection");

        setShowSearch(true);
        setSearch("men");

        navigate("/collections");
      }

      // WOMEN
      else if (
        transcript.includes("women")
      ) {
        speak("Showing women's collection");

        setShowSearch(true);
        setSearch("women");

        navigate("/collections");
      }

      // KIDS
      else if (
        transcript.includes("kids")
      ) {
        speak("Showing kids collection");

        setShowSearch(true);
        setSearch("kids");

        navigate("/collections");
      }

      else {
        speak(
          "Sorry, I don't understand that command."
        );
      }
    };

    recognition.onerror = (event) => {
      console.log(event.error);

      playErrorSound();

      speak(
        "Sorry, I couldn't hear you properly."
      );

      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  return (
    <div
      className="
        fixed
        lg:bottom-[20px]
        md:bottom-[40px]
        bottom-[80px]
        left-[2%]
        z-[9999]
        animate-[float_3s_ease-in-out_infinite]
      "
      onClick={startSpeechRecognition}
    >
      <img
        src={ai}
        alt="AI Assistant"
        className={`
          w-[60px]
          md:w-[90px]
          cursor-pointer
          transition-all
          duration-300

          ${
            listening
              ? `
                scale-125
                animate-pulse
                drop-shadow-[0_0_35px_rgba(59,130,246,0.9)]
              `
              : `
                hover:scale-110
              `
          }
        `}
      />
    </div>
  );
}

export default AI;
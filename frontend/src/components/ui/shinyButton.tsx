
const ShinyButton = ({text, onClick}: {text: string, onClick: () => void}) => {
  return (
    <>
      <style>{`
        @keyframes shine {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>

      <div
        className="rounded-full p-0.5 hover:scale-105 active:scale-100 transition duration-300"
        style={{
          background: "conic-gradient(from 0deg, #1f9350, #14532d, #1f9350, #14532d, #1f9350)",
          backgroundSize: "300% 300%",
          animation: "shine 6s ease-out infinite",
        }}
      >
        <button className="px-5 text-sm py-2 text-white rounded-full font-medium bg-green-800 cursor-pointer" onClick={onClick}>
          {text}
        </button>
      </div>
    </>
  );
};

export default ShinyButton;

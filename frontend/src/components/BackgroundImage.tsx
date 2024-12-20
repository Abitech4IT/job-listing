const BackgroundImage = () => {
  return (
    <div
      style={{
        backgroundImage: `url('public/background.svg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "156px",
        width: "100%",
      }}
    ></div>
  );
};

export default BackgroundImage;

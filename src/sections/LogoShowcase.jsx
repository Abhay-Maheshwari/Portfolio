import { logoIconsList } from "../constants";

const LogoIcon = ({ icon }) => {
  return (
    <div className="flex-none flex-center marquee-item">
      <img src={icon.imgPath} alt={icon.name} />
    </div>
  );
};

const LogoShowcase = () => (
  <div className="md:my-0 my-0 relative">
    <div className="gradient-edge" />
    <div className="gradient-edge" />
    {/* <div className="text-2xl font-bold pl-20 font-poppins">Where I've Learned, Built, and Contributed</div>     */}
    <div className="marquee h-39">
      <div className="marquee-box md:gap-10 gap-3">
        {logoIconsList.map((icon, index) => (
          <LogoIcon key={index} icon={icon} />
        ))}

        {logoIconsList.map((icon, index) => (
          <LogoIcon key={index} icon={icon} />
        ))}
      </div>
    </div>
  </div>
);

export default LogoShowcase;

import { socialImgs, owner } from "../constants";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="flex flex-col justify-center">
          <p>Terms & Conditions</p>
        </div>
        <div className="socials">
          {socialImgs.map((socialImg, index) => (
            <div key={index} className="icon">
              <a
                href={owner.socials[socialImg.name]}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Visit ${socialImg.name} profile`}
              >
                <img src={socialImg.imgPath} alt={`${socialImg.name} icon`} />
              </a>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-center md:text-end">
            © {new Date().getFullYear()} Abhay Maheshwari. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

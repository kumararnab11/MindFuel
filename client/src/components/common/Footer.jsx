import React from "react";
import { Link } from "react-router-dom";
import { FooterData } from "../../data/footerData";

const FooterLinkColumn = ({ title, links }) => (
  <div className="flex flex-col gap-3">
    <h3 className="text-richblack-100 font-semibold text-base">{title}</h3>
    <ul className="flex flex-col gap-2">
      {links.map((link, index) => (
        <li key={index}>
          <Link
            to={link.link}
            className="text-sm text-richblack-400 hover:text-richblack-50 transition-colors duration-200"
          >
            {link.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-richblack-800 text-richblack-300 py-12">
      <div className="w-11/12 max-w-maxContent mx-auto">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-4 pb-10 border-b border-richblack-700">
          {/* Left Side: Company, Socials, Resources, Support */}
          <div className="flex flex-wrap lg:flex-nowrap gap-8 lg:gap-16 w-full lg:w-1/2">
            {/* Company & Socials */}
            <div className="flex flex-col gap-8">
                {/* Logo */}
                <div className="text-white font-bold text-2xl">
                    MindFuel
                </div>
                <FooterLinkColumn title="Company" links={FooterData.company} />
                <div className="flex gap-4 text-2xl text-richblack-400">
                    {FooterData.socials.map((social, index) => (
                    <a href={social.link} key={index} target="_blank" rel="noopener noreferrer" className="hover:text-richblack-50 transition-colors duration-200">
                        <social.icon />
                    </a>
                    ))}
                </div>
            </div>

            {/* Resources & Support */}
            <div className="flex flex-col gap-8">
              <FooterLinkColumn title="Resources" links={FooterData.resources} />
              <FooterLinkColumn title="Support" links={FooterData.support} />
            </div>

            {/* Plans & Community */}
            <div className="flex flex-col gap-8">
              <FooterLinkColumn title="Plans" links={FooterData.plans} />
              <FooterLinkColumn title="Community" links={FooterData.community} />
            </div>
          </div>

          {/* Right Side: Subjects, Languages, Career Building */}
          <div className="flex flex-wrap lg:flex-nowrap gap-8 lg:gap-16 w-full lg:w-1/2">
            <FooterLinkColumn title="Subjects" links={FooterData.subjects} />
            <FooterLinkColumn title="Languages" links={FooterData.languages} />
            <FooterLinkColumn title="Career building" links={FooterData.careerBuilding} />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8">
          <div className="flex gap-4 text-sm text-richblack-400">
            {FooterData.bottomLinks.map((link, index) => (
              <React.Fragment key={index}>
                <Link to={link.link} className="hover:text-richblack-50 transition-colors duration-200">
                  {link.title}
                </Link>
                {index < FooterData.bottomLinks.length - 1 && (
                  <span className="border-r border-richblack-700"></span>
                )}
              </React.Fragment>
            ))}
          </div>
          <p className="text-sm text-richblack-400 mt-4 sm:mt-0">
            Made by Arnab Kumar © 2025 MindFuel
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
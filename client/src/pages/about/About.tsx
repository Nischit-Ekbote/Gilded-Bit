import React from "react";
import { Shield, CreditCard, TrendingUp} from "lucide-react";
import { Link } from "react-router-dom";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const AboutPage: React.FC = () => {
  return (
    <div className="flex h-screen text-white w-[calc(100vw-100px)]">
      <div className="flex-grow p-8 overflow-y-auto">
        <div className="h-screen flex flex-col py-20">
          <h2 className="text-7xl  mb-6 text-[--primary--]">About GildedBit</h2>

          <p className="mb-6 text-gray-300 w-[60%] text-5xl ">
            GildedBit leads digital gold investment, combining the enduring
            value of <span className="text-[#ffffb7]">gold</span> with modern{" "}
            <span className="text-[#ffffb7]">tech</span>nology. Our platform
            provides a secure and easy way to{" "}
            <span className="text-[#ffffb7]">buy, sell, and invest</span> in
            digital gold, offering the stability of gold in the digital era.
          </p>
        </div>

        <div className="h-screen">
          <h3 className="text-7xl  mb-6 text-[--primary--]">Our Features</h3>

          <div className="flex gap-10 mb-8">
            <FeatureCard
              icon={<Shield className="w-8 h-8 text-yellow-500" />}
              title="Robust Security"
              description="Advanced security measures to ensure safe and transparent transactions."
            />
            <FeatureCard
              icon={<CreditCard className="w-8 h-8 text-yellow-500" />}
              title="Seamless Transactions"
              description="Buy and sell digital gold with ease using multiple payment options."
            />
            <FeatureCard
              icon={<TrendingUp className="w-8 h-8 text-yellow-500" />}
              title="Real-time Market Rates"
              description="Access up-to-the-minute gold rates for informed investment decisions."
            />
            {/* <FeatureCard 
            icon={<DollarSign className="w-8 h-8 text-yellow-500" />}
            title="Competitive Pricing"
            description="Enjoy some of the most competitive rates in the digital gold market."
          /> */}
          </div>

          <h3 className="text-7xl  mb-6 text-[--primary--] mt-20">
            Why Choose GildedBit?
          </h3>

          <ul className="list-disc list-inside mb-6 text-gray-300 text-2xl">
            <li>Fully digital platform - trade gold anytime, anywhere</li>
            <li>Transparent transactions with no hidden fees</li>
            <li>
              Backed by physical gold stored in secure, audited vaults(Not
              Working)
            </li>
            <li>
              Expert team with deep knowledge of gold markets and digital
              technologies
            </li>
            <li>
              Regular security audits and compliance checks for your peace of
              mind
            </li>
            <li>
              Reliable data management using PostgreSQL for consistent and
              accurate records
            </li>
          </ul>
        </div>

        <h3 className="text-7xl mb-4 text-yellow-500">
          Our Mission
        </h3>

        <p className="mb-6 text-gray-300 text-2xl">
          At GildedBit, we're on a mission to revolutionize gold investment by
          making it accessible to everyone in the digital world. We believe in
          combining the historical stability of gold with modern technology,
          creating a secure and efficient platform for the modern investor.
        </p>

        <div className="bg-gradient-to-b to-black from-[#001D3D] p-6 rounded-lg flex flex-col gap-2">
          <h3 className="text-2xl font-semibold mb-2 text-yellow-500">
            Join the Digital Gold Revolution
          </h3>
          <p className="text-gray-300 mb-4">
            Be part of the future of gold investment with GildedBit. Whether
            you're a seasoned gold investor or new to the market, our platform
            provides the tools and resources you need to succeed in the world of
            digital gold.
          </p>
          <Link
            to="/buy/gold"
            className="bg-yellow-500 text-black font-bold py-2 px-4 rounded w-fit hover:bg-inherit border border-[--primary--] hover:text-[--primary--]"
          >
            Create Your GildedBit Account
          </Link>
        </div>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => (
  <div className="bg-gradient-to-b to-black from-[#001D3D] p-8 rounded-lg">
    <p className="text-gray-300 pb-5 border-b text-xl font-normal">
      {description}
    </p>
    <div className="flex items-center pt-5 gap-3 w-full">
      {icon}
      <h4 className="text-2xl font-semibold ml-2 text-[--primary--] ">{title}</h4>
    </div>
  </div>
);

export default AboutPage;

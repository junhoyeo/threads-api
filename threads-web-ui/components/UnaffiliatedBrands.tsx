import Image from 'next/image';

import InstagramLogo from '@/assets/instagram.svg';
import MetaLogo from '@/assets/meta.svg';
import OpenAILogo from '@/assets/openai.svg';
import TwitterLogo from '@/assets/twitter.svg';

export const UnaffiliatedBrands: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <span className="max-w-sm font-medium text-center uppercase sm:max-w-none text-slate-500">
        {/*  */}
        Unaffiliated with the best metaverse companies and brands
      </span>
      <div className="mt-8 mb-20 sm:mt-6">
        <ul className="flex flex-col items-center justify-center w-full gap-8 sm:flex-row md:gap-10">
          <li>
            <Image src={MetaLogo} alt="Meta" className="h-[24px] sm:h-[38px] w-fit" />
          </li>
          <li>
            <Image src={InstagramLogo} alt="Instagram" className="h-[28px] sm:h-[42px] w-fit" />
          </li>
          <li>
            <Image src={TwitterLogo} alt="Twitter" className="h-[28px] sm:h-[42px] w-fit" />
          </li>
          <li>
            <Image src={OpenAILogo} alt="OpenAI" className="h-[30px] sm:h-[46px] w-fit" />
          </li>
        </ul>
      </div>
    </div>
  );
};

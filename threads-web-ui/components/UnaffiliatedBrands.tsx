import InstagramLogo from '@/assets/instagram.svg';
import MetaLogo from '@/assets/meta.svg';
import TwitterLogo from '@/assets/twitter.svg';
import OpenAILogo from '@/assets/openai.svg';
import Image from 'next/image';

export const UnaffiliatedBrands: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <span className="font-medium text-center uppercase text-slate-500">
        {/*  */}
        Unaffiliated with the best metaverse companies and brands
      </span>
      <div className="mt-4 mb-20">
        <ul className="flex items-center justify-center w-full gap-10">
          <li>
            <Image src={MetaLogo} alt="Meta" className="h-[38px] w-fit" />
          </li>
          <li>
            <Image src={InstagramLogo} alt="Instagram" className="h-[42px] w-fit" />
          </li>
          <li>
            <Image src={TwitterLogo} alt="Twitter" className="h-[42px] w-fit" />
          </li>
          <li>
            <Image src={OpenAILogo} alt="OpenAI" className="h-[46px] w-fit" />
          </li>
        </ul>
      </div>
    </div>
  );
};

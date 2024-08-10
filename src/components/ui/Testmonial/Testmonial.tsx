import Image from 'next/image';

interface TestmonialProps {
  quote: string;
  name: string;
  role: string;
  image: string;
}

const Testmonial: React.FC<TestmonialProps> = ({ quote, name, role, image }) => {
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg text-center">
      <Image
        src={image}
        alt={name}
        className="mx-auto rounded-full w-24 h-24 mb-4"
        width={96}
        height={96}
      />
      <p className="italic text-gray-600 mb-4">&quot;{quote}&quot;</p>
      <p className="text-lg font-semibold">{name}</p>
      <p className="text-gray-600">{role}</p>
    </div>
  );
};

export default Testmonial;

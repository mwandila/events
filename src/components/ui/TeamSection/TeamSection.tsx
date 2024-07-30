'use client';
import Image from 'next/image';

const TeamSection = () => {
  const team = [
    {
      name: 'Blessing Mwandila',
      role: 'CEO',
      image: '/images/team1.jpg',
    },
    {
      name: 'chellah mwape',
      role: 'CTO',
      image: '/images/team2.jpg',
    },
  ];

  return (
    <div className="py-12 bg-white">
      <h2 className="text-center text-3xl font-bold mb-8">Our Team</h2>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {team.map((member, index) => (
          <div key={index} className="text-center p-6 bg-gray-100 rounded-lg shadow-lg">
            <Image src={member.image} alt={member.name} width={128} height={128} className="mx-auto rounded-full mb-4"/>
            <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
            <p className="text-gray-600">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;

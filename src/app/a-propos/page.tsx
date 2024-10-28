'use client';

import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Alice Dubois',
    role: 'CEO & Fondatrice',
    image: 'https://i.pravatar.cc/300?img=1',
  },
  {
    name: 'Thomas Martin',
    role: 'CTO',
    image: 'https://i.pravatar.cc/300?img=3',
  },
  {
    name: 'Sophie Lefebvre',
    role: 'Directrice Marketing',
    image: 'https://i.pravatar.cc/300?img=5',
  },
  {
    name: 'Lucas Moreau',
    role: 'Lead Developer',
    image: 'https://i.pravatar.cc/300?img=7',
  },
];

export default function AboutPage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-md mx-auto">
        <h1 className="text-xl font-medium text-gray-900 dark:text-white mb-8 text-center">
          À propos de Gederooney
        </h1>
        <div className="flex flex-col space-y-8">
          <section>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Notre Mission
            </h2>
            <p className="text-sm font-light text-gray-600 dark:text-gray-400">
              Chez Gederooney, notre mission est de créer des solutions
              innovantes qui simplifient la vie quotidienne. Nous croyons en la
              puissance de la technologie pour résoudre des problèmes complexes
              et améliorer l&apos;expérience utilisateur.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Notre Histoire
            </h2>
            <p className="text-sm font-light text-gray-600 dark:text-gray-400">
              Fondée en 2020, Gederooney est née de la passion de ses fondateurs
              pour l&apos;innovation technologique. Depuis, nous avons grandi pour
              devenir une équipe diversifiée de créatifs et de techniciens, tous
              unis par notre désir de repousser les limites du possible.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Nos Valeurs
            </h2>
            <ul className="list-disc list-inside text-sm font-light text-gray-600 dark:text-gray-400 space-y-2">
              <li>Innovation constante</li>
              <li>Qualité sans compromis</li>
              <li>Satisfaction client</li>
              <li>Responsabilité environnementale</li>
              <li>Collaboration et respect mutuel</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Notre Équipe
            </h2>
            <p className="text-sm font-light text-gray-600 dark:text-gray-400 mb-6">
              Notre équipe est composée de professionnels passionnés et
              talentueux, chacun apportant une expertise unique à notre
              entreprise. Ensemble, nous travaillons pour créer des produits qui
              font la différence.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {teamMembers.map((member) => (
                <div key={member.name} className="flex flex-col items-center">
                  <div className="relative w-24 h-24 mb-2">
                    <Image
                      src={member.image}
                      alt={member.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white text-center">
                    {member.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <div className="flex justify-center mt-8">
            <Button asChild>
              <Link href="/contact" className="flex items-center">
                <Mail className="mr-2 h-4 w-4" /> Contactez-nous
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

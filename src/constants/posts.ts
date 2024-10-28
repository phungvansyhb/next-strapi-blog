import { Article, Category, Post } from '@/lib/types';

export const allPosts = [
  {
    slug: 'artcle-4',
    id: 1,
    title: "L'art de la photographie en noir et blanc",
    excerpt:
      'Explorez la beauté intemporelle de la photographie monochrome et ses techniques. Découvrez comment les contrastes et les nuances peuvent créer des images saisissantes.',
    imageUrl:
      'https://cdn.pixabay.com/photo/2024/08/08/10/50/abstract-8954169_1280.jpg',
    date: '10 Mars 2024',
    category: 'Photographie',
    author: {
      name: 'Sophie Durand',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    readTime: '5 min',
  },
  {
    slug: 'artcle-2',
    id: 2,
    title: 'Traditions pascales autour du monde',
    excerpt:
      'Découvrez comment différentes cultures célèbrent Pâques avec des œufs décorés. Des techniques ancestrales aux innovations modernes, explorez la diversité des traditions.',
    imageUrl:
      'https://cdn.pixabay.com/photo/2017/12/21/15/53/easter-eggs-3032058_1280.jpg',
    date: '15 Mars 2024',
    category: 'Culture',
    author: {
      name: 'Pierre Martin',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    readTime: '3 min',
  },
  {
    slug: 'artcle-3',
    id: 3,
    title: "L'avenir de l'IA dans l'art digital",
    excerpt:
      "Comment l'intelligence artificielle révolutionne la création artistique numérique. Explorez les nouvelles frontières de l'art généré par l'IA et ses implications pour les artistes.",
    imageUrl:
      'https://cdn.pixabay.com/photo/2024/07/08/21/06/ai-generated-8882067_1280.jpg',
    date: '20 Mars 2024',
    category: 'Technologie',
    author: {
      name: 'Emma Leclerc',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    readTime: '7 min',
  },
  {
    slug: 'artcle-4',
    id: 4,
    title: 'Paysages surréalistes : entre rêve et réalité',
    excerpt:
      "Plongez dans des mondes imaginaires créés par l'IA, brouillant les frontières du réel. Découvrez comment les artistes utilisent la technologie pour repousser les limites de l'imagination.",
    imageUrl:
      'https://cdn.pixabay.com/photo/2023/08/16/10/21/ai-generated-8193804_1280.jpg',
    date: '25 Mars 2024',
    category: 'Art',
    author: {
      name: 'Lucas Dubois',
      avatar: 'https://i.pravatar.cc/150?img=4',
    },
    readTime: '6 min',
  },
  {
    slug: 'artcle-5',
    id: 5,
    title: "L'abstraction géométrique dans l'art moderne",
    excerpt:
      "Explorez comment les formes et les couleurs créent des compositions captivantes. De Kandinsky à l'art numérique contemporain, découvrez l'évolution de l'abstraction géométrique.",
    imageUrl:
      'https://cdn.pixabay.com/photo/2016/01/13/21/24/abstract-1138967_1280.jpg',
    date: '30 Mars 2024',
    category: 'Art',
    author: {
      name: 'Claire Fontaine',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    readTime: '4 min',
  },
  {
    slug: 'artcle-6',
    id: 6,
    title: 'Visions futuristes : les métropoles de demain',
    excerpt:
      "Imaginez les cités du futur à travers le prisme de l'architecture avant-gardiste. Des gratte-ciels écologiques aux villes flottantes, explorez les concepts qui façonneront notre avenir urbain.",
    imageUrl:
      'https://cdn.pixabay.com/photo/2023/01/06/13/33/city-7701251_1280.jpg',
    date: '5 Avril 2024',
    category: 'Architecture',
    author: {
      name: 'Thomas Lefebvre',
      avatar: 'https://i.pravatar.cc/150?img=6',
    },
    readTime: '8 min',
  },
];

export const popularPosts: Post[] = [
  {
    slug: 'artcle-1',
    id: 1,
    title: "L'impact de l'IA sur l'avenir du travail",
    excerpt:
      "Explorez comment l'intelligence artificielle transforme les industries et redéfinit les compétences nécessaires pour le futur marché de l'emploi.",
    imageUrl:
      'https://cdn.pixabay.com/photo/2019/08/17/16/11/art-4412523_1280.jpg',
    date: '15 Mai 2024',
    category: 'Technologie',
    author: {
      name: 'Marie Curie',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    readTime: '8 min',
  },
  {
    slug: 'artcle-2',
    id: 2,
    title: "Le minimalisme : plus qu'un style de vie",
    excerpt:
      "Découvrez comment le minimalisme peut transformer votre espace de vie et votre état d'esprit, menant à une vie plus épanouie et moins stressante.",
    imageUrl:
      'https://cdn.pixabay.com/photo/2021/08/11/16/06/mountain-6538890_1280.jpg',
    date: '20 Mai 2024',
    category: 'Style de vie',
    author: {
      name: 'Jean Dupont',
      avatar: 'https://i.pravatar.cc/150?img=8',
    },
    readTime: '6 min',
  },
];

export const recentPosts: Post[] = [
  {
    slug: 'artcle-3',
    id: 3,
    title: "La révolution de l'énergie solaire",
    excerpt:
      "Comment les dernières avancées en matière de panneaux solaires transforment notre approche de l'énergie renouvelable.",
    imageUrl:
      'https://cdn.pixabay.com/photo/2023/06/22/17/32/park-8081967_1280.jpg',
    date: '1 Juin 2024',
    category: 'Environnement',
    author: {
      name: 'Sophia Green',
      avatar: 'https://i.pravatar.cc/150?img=9',
    },
    readTime: '7 min',
  },
  {
    slug: 'artcle-4',
    id: 4,
    title: "L'art de la méditation en pleine conscience",
    excerpt:
      'Apprenez les techniques de base pour intégrer la méditation dans votre routine quotidienne et améliorer votre bien-être mental.',
    imageUrl:
      'https://cdn.pixabay.com/photo/2018/01/28/13/24/portrait-3113651_1280.jpg',
    date: '5 Juin 2024',
    category: 'Bien-être',
    author: {
      name: 'Alex Zen',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
    readTime: '5 min',
  },
  {
    slug: 'artcle-5',
    id: 5,
    title: 'Les secrets de la cuisine moléculaire',
    excerpt:
      "Plongez dans le monde fascinant de la cuisine moléculaire et découvrez comment la science transforme l'art culinaire.",
    imageUrl:
      'https://cdn.pixabay.com/photo/2024/08/08/10/50/abstract-8954170_1280.jpg',
    date: '10 Juin 2024',
    category: 'Gastronomie',
    author: {
      name: 'Chef Étoile',
      avatar: 'https://i.pravatar.cc/150?img=20',
    },
    readTime: '9 min',
  },
];

export const article: Article = {
  title: "L'impact de l'IA sur l'avenir du travail",
  date: '15 Mai 2024',
  readTime: '8 min',
  category: 'Technologie',
  author: {
    name: 'Marie Curie',
    position: 'Chercheuse en IA',
    avatar: 'https://i.pravatar.cc/300?img=1',
    twitter: 'https://twitter.com/mariecurie',
    linkedin: 'https://linkedin.com/in/mariecurie',
    github: 'https://github.com/mariecurie',
  },
  imageUrl:
    'https://cdn.pixabay.com/photo/2016/05/05/11/22/computer-1373684_1280.jpg',
  content: `
# L'impact de l'IA sur l'avenir du travail

L'intelligence artificielle (IA) est en train de révolutionner le monde du travail à un rythme sans précédent. Des usines automatisées aux assistants virtuels, l'IA s'infiltre dans presque tous les secteurs de l'économie, promettant d'augmenter la productivité et l'efficacité. Cependant, cette révolution technologique soulève également des questions importantes sur l'avenir de l'emploi et les compétences qui seront nécessaires dans le futur marché du travail.

## La transformation des emplois existants

![placeholder image](https://cdn.pixabay.com/photo/2023/01/06/13/33/building-7701254_1280.jpg)

L'un des impacts les plus immédiats de l'IA est la transformation des emplois existants. De nombreuses tâches routinières et répétitives sont déjà en train d'être automatisées, libérant les travailleurs pour se concentrer sur des activités à plus forte valeur ajoutée. Par exemple, dans le secteur bancaire, les chatbots gèrent désormais une grande partie des requêtes client de base, permettant aux conseillers bancaires de se concentrer sur des services plus complexes et personnalisés.

## La création de nouveaux emplois

Parallèlement à la transformation des emplois existants, l'IA crée également de nouvelles opportunités d'emploi. Des postes tels que les ingénieurs en apprentissage automatique, les éthiciens de l'IA et les spécialistes de la gouvernance des données sont de plus en plus demandés. Ces nouveaux rôles nécessitent une combinaison unique de compétences techniques et de soft skills, soulignant l'importance d'une formation continue et adaptative.

## L'importance des compétences humaines

Malgré les avancées de l'IA, certaines compétences humaines restent irremplaçables. La créativité, l'intelligence émotionnelle, la pensée critique et la résolution de problèmes complexes sont des domaines où les humains excellent et qui seront de plus en plus valorisés. Les travailleurs qui peuvent combiner ces compétences avec une compréhension de la technologie seront particulièrement bien positionnés dans le futur marché du travail.

## Les défis à relever

L'intégration de l'IA dans le monde du travail ne se fait pas sans défis. Les questions d'éthique, de confidentialité des données et de biais algorithmiques doivent être soigneusement examinées et résolues. De plus, la transition vers une économie plus automatisée nécessitera des efforts concertés en matière d'éducation et de formation pour s'assurer que la main-d'œuvre est prête pour les emplois de demain.

## Exemple de code IA

Voici un exemple simple d'utilisation de TensorFlow pour la classification d'images :

\`\`\`python
import tensorflow as tf
from tensorflow.keras import layers, models

# Créer un modèle séquentiel
model = models.Sequential([
    layers.Conv2D(32, (3, 3), activation='relu', input_shape=(32, 32, 3)),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.Flatten(),
    layers.Dense(64, activation='relu'),
    layers.Dense(10, activation='softmax')
])

# Compiler le modèle
model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

# Le modèle est prêt à être entraîné sur des données d'images
\`\`\`

## Conclusion

L'impact de l'IA sur l'avenir du travail est à la fois prometteur et complexe. Alors que certains emplois disparaîtront inévitablement, de nouvelles opportunités émergeront. La clé pour naviguer dans ce paysage en évolution sera l'adaptabilité, l'apprentissage continu et la capacité à combiner les compétences humaines uniques avec les avantages de la technologie. En embrassant ces changements et en nous préparant adéquatement, nous pouvons façonner un avenir du travail qui est à la fois productif et épanouissant.
  `,
};

export const relatedPosts: Post[] = [
  {
    id: 1,
    title: "Le futur de l'apprentissage automatique",
    imageUrl:
      'https://cdn.pixabay.com/photo/2024/07/08/21/06/ai-generated-8882067_1280.jpg',
    category: 'Technologie',
    date: '15 Mai 2024',
    author: {
      name: 'Marie Curie',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    readTime: '8 min',
    slug: 'article-1',
    excerpt:
      "Découvrez comment le minimalisme peut transformer votre espace de vie et votre état d'esprit, menant à une vie plus épanouie et moins stressante.",
  },
  {
    id: 2,
    title: 'Éthique et IA : les enjeux à venir',
    imageUrl:
      'https://cdn.pixabay.com/photo/2023/08/16/10/21/ai-generated-8193804_1280.jpg',
    category: 'Société',
    date: '15 Mai 2024',
    author: {
      name: 'Marie Curie',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    readTime: '8 min',
    slug: 'article-2',
    excerpt:
      "Découvrez comment le minimalisme peut transformer votre espace de vie et votre état d'esprit, menant à une vie plus épanouie et moins stressante.",
  },
  {
    id: 3,
    title: "L'IA dans la santé : révolution médicale",
    imageUrl:
      'https://cdn.pixabay.com/photo/2016/01/13/21/24/abstract-1138967_1280.jpg',
    category: 'Santé',
    date: '15 Mai 2024',
    author: {
      name: 'Marie Curie',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    readTime: '8 min',
    slug: 'article-3',
    excerpt:
      "Découvrez comment le minimalisme peut transformer votre espace de vie et votre état d'esprit, menant à une vie plus épanouie et moins stressante.",
  },
];

export const categories: Category[] = [
  {
    name: 'Technologie',
    slug: 'technologie',
    count: 15,
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=500&fit=crop',
  },
  {
    name: 'Voyage',
    slug: 'voyage',
    count: 8,
    image:
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=500&fit=crop',
  },
  {
    name: 'Cuisine',
    slug: 'cuisine',
    count: 12,
    image:
      'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=500&h=500&fit=crop',
  },
  {
    name: 'Mode',
    slug: 'mode',
    count: 6,
    image:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&h=500&fit=crop',
  },
  {
    name: 'Santé',
    slug: 'sante',
    count: 10,
    image:
      'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=500&h=500&fit=crop',
  },
  {
    name: 'Finance',
    slug: 'finance',
    count: 7,
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=500&fit=crop',
  },
  {
    name: 'Sport',
    slug: 'sport',
    count: 9,
    image:
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=500&fit=crop',
  },
  {
    name: 'Art',
    slug: 'art',
    count: 5,
    image:
      'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=500&h=500&fit=crop',
  },
];

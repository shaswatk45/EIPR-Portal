require('dotenv').config();
const bcrypt = require('bcryptjs');
const prisma = require('./lib/prisma');

const learningData = [
  // PATENTS
  {
    title: 'What is a Patent?',
    category: 'patent',
    content: `A Patent is an exclusive right granted by the government to an inventor for a limited period (usually 20 years) in exchange for publicly disclosing the invention. It gives the inventor the right to prevent others from making, using, selling, or importing the patented invention without permission.

A patent is not a right to use your own invention; it's a right to stop others from using it without your consent.

To qualify for a patent, an invention must be:
1. **Novel** – Not previously known or used anywhere in the world
2. **Non-obvious** – Not obvious to someone skilled in the relevant field  
3. **Useful** – Must have practical utility
4. **Patentable subject matter** – Must fall within patentable categories`,
    examples: [
      'Invention of a new drug compound by a pharmaceutical company',
      'A novel algorithm for data compression in software',
      'A new type of solar panel with improved efficiency',
      "Graham Bell's telephone – one of the most famous patents in history"
    ],
    keyPoints: [
      'Duration: 20 years from filing date',
      'Must be filed before public disclosure',
      'Requires detailed technical description',
      'Government grants exclusive monopoly',
      'Can be licensed to others for royalties'
    ],
    order: 1
  },
  {
    title: 'Types of Patents',
    category: 'patent',
    content: `There are three main types of patents that cover different kinds of inventions:

**1. Utility Patents**
The most common type. Covers new and useful processes, machines, articles of manufacture, or compositions of matter. Example: a new engine design or a new drug.

**2. Design Patents**
Protects the ornamental or aesthetic appearance of a functional item. The shape, configuration, or surface ornamentation is protected, not the function. Duration: 15 years (in the US).

**3. Plant Patents**
Granted for inventing or discovering and asexually reproducing any distinct and new variety of plant. Relevant to agriculture and horticulture.`,
    examples: [
      'Utility: iPhone touchscreen technology',
      'Design: The iconic Coca-Cola bottle shape',
      'Plant: A new variety of rose developed by a botanist'
    ],
    keyPoints: [
      'Utility patents: 20-year protection',
      'Design patents: 15-year protection',
      'Plant patents: 20-year protection',
      'Each type has different requirements',
      'Multiple patents can protect one product'
    ],
    order: 2
  },

  // COPYRIGHTS
  {
    title: 'What is Copyright?',
    category: 'copyright',
    content: `Copyright is a form of intellectual property protection that gives creators exclusive rights over their original creative works. Unlike patents, copyright protection is automatic — it begins the moment you create an original work and fix it in a tangible form (write it down, record it, etc.).

Copyright protects the **expression** of an idea, not the idea itself. Two people can write about the same topic, but each person's writing is independently protected.

Copyright gives creators the exclusive rights to:
- Reproduce the work
- Create derivative works (translations, adaptations)
- Distribute copies
- Perform or display the work publicly
- Transmit the work digitally`,
    examples: [
      'This textbook is copyrighted – you cannot photocopy and distribute it',
      "J.K. Rowling's Harry Potter novels are protected by copyright",
      'Your own code, essays, or artwork created in college is automatically copyrighted',
      'Music compositions and recordings are separately copyrighted'
    ],
    keyPoints: [
      'Automatic protection from creation',
      'Duration: Life of author + 70 years',
      'Protects expression, not ideas',
      'No registration required (but recommended)',
      'Fair use doctrine allows limited use'
    ],
    order: 1
  },
  {
    title: 'Copyright in the Digital Age',
    category: 'copyright',
    content: `The internet has made copyright more complex. Here's what every engineering student needs to know:

**Open Source Licenses**
Not all software is fully copyrighted. Open source licenses like MIT, GPL, and Apache allow others to use, modify, and distribute code under certain conditions.

**Creative Commons**
A middle ground between full copyright and public domain. Creators can allow others to use their work with conditions (attribution required, no commercial use, etc.).

**DMCA (Digital Millennium Copyright Act)**
US law that governs copyright in the digital world, including takedown notices for infringing content online.

**Software Copyright**
Your source code, object code, and documentation are protected by copyright. This is separate from patents on the algorithm or method.`,
    examples: [
      'Using a GPL-licensed library in your commercial project requires your project to also be GPL',
      'Downloading movies without permission is copyright infringement',
      'Wikipedia content is under Creative Commons license',
      'GitHub code without a license is copyright protected by default'
    ],
    keyPoints: [
      'Software code is copyrighted automatically',
      'Open source != free of copyright',
      'Check license before using others code',
      'DMCA protects against online piracy',
      'Attribution is key in Creative Commons'
    ],
    order: 2
  },

  // TRADEMARKS
  {
    title: 'What is a Trademark?',
    category: 'trademark',
    content: `A Trademark is a recognizable sign, design, or expression that identifies products or services of a particular source and distinguishes them from others. It can be a word, name, symbol, logo, slogan, color, or combination.

**Why Trademarks Matter**
Trademarks protect consumers by ensuring they know the source of a product. When you see the Apple logo, you know exactly who made that product and what quality to expect.

**Trademark vs. Copyright vs. Patent**
- Patent: Protects inventions
- Copyright: Protects creative expression  
- Trademark: Protects brand identity

**Registration**
While unregistered trademarks get some common-law protection, registering with the trademark office gives you national protection, legal presumption of ownership, and the right to use the ® symbol.`,
    examples: [
      'The Nike "swoosh" logo and "Just Do It" slogan',
      'McDonald\'s golden arches',
      'The Google brand name and logo',
      'Tata, Infosys, Wipro – Indian company trademarks'
    ],
    keyPoints: [
      'Can last indefinitely if renewed',
      'Must be used in commerce to maintain',
      'Renewal required every 10 years',
      'Protects brand identity and goodwill',
      '™ = unregistered, ® = registered'
    ],
    order: 1
  },
  {
    title: 'Trademark Infringement and Protection',
    category: 'trademark',
    content: `**What is Trademark Infringement?**
Using a trademark that is confusingly similar to a registered trademark in the same industry without permission. The test is whether consumers are likely to be confused about the source.

**Trademark Dilution**
Famous trademarks (like Rolex or Apple) can also be protected against "dilution" – uses that tarnish the brand or blur its distinctiveness, even without confusion.

**Protecting Your Startup's Brand**
Before naming your startup:
1. Do a trademark search (free tools: USPTO, IP India)
2. Check domain name availability
3. Search social media handles
4. Register your trademark early

**Trade Dress**
Protecting the overall image or appearance of a product, including its packaging, shape, and color. Example: the distinctive shape of a Toblerone chocolate bar.`,
    examples: [
      "Apple sued Samsung for copying iPhone's trade dress",
      'Cadbury has a trademark on the color purple for chocolate',
      'Startups often face issues when their name is already trademarked'
    ],
    keyPoints: [
      'Search before you brand',
      'Register in relevant classes',
      'Use ™ while application is pending',
      'Monitor for infringement',
      'Trade dress can also be protected'
    ],
    order: 2
  },

  // INDUSTRIAL DESIGN
  {
    title: 'What is Industrial Design?',
    category: 'industrial-design',
    content: `An Industrial Design right (also called a Design Patent or Registered Design) protects the visual appearance of a product – its shape, configuration, pattern, ornamentation, or color. It covers the "look" of a product, not how it works.

**What Can Be Protected?**
- 3D features: shape, configuration
- 2D features: patterns, lines, colors
- Combination of both

**Requirements**
1. **New** – Not publicly disclosed before filing
2. **Original** – Result of the designer's own effort
3. **Industrial application** – Can be reproduced by industrial means

**Duration**
Typically 10–25 years depending on jurisdiction, with renewal requirements.

**Industrial Design vs. Patent**
- Patent protects how something WORKS
- Industrial Design protects how something LOOKS`,
    examples: [
      'The distinctive curved shape of an iPhone',
      'The unique design of a sports car body',
      'Furniture designs (chairs, tables)',
      'Textile patterns on fabric',
      'The shape of a Pringles chip'
    ],
    keyPoints: [
      'Protects visual/aesthetic features',
      'Does not protect function',
      'Duration: 10-25 years',
      'Must be novel before filing',
      'Important for product companies'
    ],
    order: 1
  },
  {
    title: 'Industrial Design for Engineers',
    category: 'industrial-design',
    content: `As an engineering student, you will often create products that have both functional innovations (protectable by patents) and unique visual designs (protectable by industrial design rights). It's important to protect both aspects.

**When to File an Industrial Design**
File for an industrial design when:
- Your product has a distinctive visual appearance
- The look itself adds commercial value
- Competitors could copy the design without copying the function

**Design Strategy**
Many tech companies aggressively protect product designs:
- Apple registered the rectangular rounded-corner design of iPhone
- Ferrari protects its car body designs
- Dyson protects the visual design of its vacuum cleaners

**Locarno Classification**
Industrial designs are classified under the Locarno Classification system, which has 32 classes covering everything from food containers to transport vehicles.`,
    examples: [
      "Apple's iPhone design registrations cover the icon grid layout",
      'Samsung and Apple had a famous design patent lawsuit',
      'Nike registers shoe designs as industrial designs',
      'IDEO designs many products and files design registrations'
    ],
    keyPoints: [
      'Combine with patents for full protection',
      'File before showing at exhibitions',
      'Cheaper than patents to obtain',
      'Valuable for consumer products',
      'Can be licensed for royalties'
    ],
    order: 2
  }
];

const quizData = [
  {
    title: 'Patent Fundamentals Quiz',
    category: 'patent',
    description: 'Test your understanding of patents and how they protect inventions.',
    questions: [
      {
        questionText: 'How long does a standard utility patent last?',
        options: ['10 years', '15 years', '20 years', '25 years'],
        correctAnswer: 2,
        explanation: 'A utility patent lasts 20 years from the filing date of the application.'
      },
      {
        questionText: 'Which of the following is NOT a requirement for patentability?',
        options: ['Novelty', 'Non-obviousness', 'Profitability', 'Utility'],
        correctAnswer: 2,
        explanation:
          'Profitability is not a requirement. An invention must be novel, non-obvious, and useful to be patentable.'
      },
      {
        questionText: 'What does a patent grant the inventor?',
        options: [
          'The right to use the invention',
          'The right to exclude others from making, using, or selling the invention',
          'Tax exemption on the invention',
          'Automatic global protection'
        ],
        correctAnswer: 1,
        explanation:
          'A patent grants the right to EXCLUDE others, not necessarily the right to use the invention yourself.'
      },
      {
        questionText: 'Which type of patent protects the visual appearance of a product?',
        options: ['Utility Patent', 'Plant Patent', 'Design Patent', 'Process Patent'],
        correctAnswer: 2,
        explanation:
          'Design patents protect the ornamental or aesthetic appearance of a functional item.'
      },
      {
        questionText: 'When must you file a patent to maintain novelty?',
        options: [
          'Within 5 years of invention',
          'Before public disclosure (or within the grace period)',
          'After the product is commercially successful',
          'Anytime within the inventor\'s lifetime'
        ],
        correctAnswer: 1,
        explanation:
          'You generally must file before publicly disclosing the invention, though some countries have a 1-year grace period.'
      }
    ]
  },
  {
    title: 'Copyright Essentials Quiz',
    category: 'copyright',
    description: 'Test your knowledge of copyright law and creative rights.',
    questions: [
      {
        questionText: 'When does copyright protection begin?',
        options: [
          'After registration with the copyright office',
          'The moment an original work is created and fixed in tangible form',
          'After the work is published',
          'When the creator applies for it'
        ],
        correctAnswer: 1,
        explanation:
          'Copyright is automatic – it begins the moment you create an original work and fix it in tangible form.'
      },
      {
        questionText: 'How long does copyright typically last for an individual creator?',
        options: [
          '20 years',
          '50 years',
          'Life of the author + 70 years',
          'Life of the author + 100 years'
        ],
        correctAnswer: 2,
        explanation:
          'In most countries, copyright lasts the life of the author plus 70 years.'
      },
      {
        questionText: 'What does copyright protect?',
        options: [
          'Ideas and concepts',
          'Facts and data',
          'The expression of ideas in a fixed form',
          'Inventions and processes'
        ],
        correctAnswer: 2,
        explanation:
          'Copyright protects the expression of ideas, not the ideas themselves. Two people can write about the same idea.'
      },
      {
        questionText: 'Which of the following does copyright NOT cover?',
        options: [
          'A novel you wrote',
          'A painting you created',
          'A business idea you had',
          'Code you programmed'
        ],
        correctAnswer: 2,
        explanation:
          'Copyright does not protect ideas. Your business idea itself cannot be copyrighted, but your written business plan can be.'
      },
      {
        questionText: 'What does "Fair Use" allow?',
        options: [
          'Unlimited use of copyrighted material',
          'Commercial use of all copyrighted work',
          'Limited use of copyrighted material for purposes like education or commentary',
          'Use of any work older than 10 years'
        ],
        correctAnswer: 2,
        explanation:
          'Fair Use allows limited use of copyrighted material without permission for purposes like education, criticism, commentary, or news reporting.'
      }
    ]
  },
  {
    title: 'Trademark Knowledge Quiz',
    category: 'trademark',
    description: 'Check your understanding of trademarks and brand protection.',
    questions: [
      {
        questionText: 'What does a trademark protect?',
        options: [
          'Inventions and processes',
          'Brand identity – names, logos, and slogans that identify a product source',
          'Creative works like novels and paintings',
          'Product visual designs'
        ],
        correctAnswer: 1,
        explanation:
          'Trademarks protect brand identity – the words, logos, symbols, and slogans that identify the source of goods or services.'
      },
      {
        questionText: 'What symbol indicates a registered trademark?',
        options: ['™', '©', '®', 'SM'],
        correctAnswer: 2,
        explanation: '® indicates a registered trademark. ™ is used for unregistered marks.'
      },
      {
        questionText: 'How long can a trademark last?',
        options: [
          '20 years maximum',
          'Life of the owner',
          'Indefinitely, as long as it is used and renewed',
          '50 years'
        ],
        correctAnswer: 2,
        explanation:
          'A trademark can last indefinitely as long as it is actively used in commerce and periodically renewed.'
      },
      {
        questionText: 'What is trademark dilution?',
        options: [
          'Weakening a trademark by not using it',
          'Using a famous trademark in a way that tarnishes or blurs its distinctiveness',
          'Registering too many trademarks',
          'Using a trademark in foreign countries'
        ],
        correctAnswer: 1,
        explanation:
          'Trademark dilution occurs when use of a famous mark reduces its distinctiveness, even without causing customer confusion.'
      },
      {
        questionText: 'What should you do FIRST before naming your startup?',
        options: [
          'Register the domain name',
          'File for trademark registration immediately',
          'Conduct a trademark search to check for conflicts',
          'Apply for a patent on the name'
        ],
        correctAnswer: 2,
        explanation:
          'Always conduct a trademark search first to ensure your intended brand name doesn\'t conflict with existing registered marks.'
      }
    ]
  },
  {
    title: 'General IPR Quiz',
    category: 'general',
    description: 'A comprehensive quiz covering all types of intellectual property rights.',
    questions: [
      {
        questionText: 'Which IPR protects a novel software algorithm?',
        options: ['Trademark', 'Industrial Design', 'Copyright only', 'Patent'],
        correctAnswer: 3,
        explanation:
          'A novel software algorithm can be protected by a patent if it meets novelty, non-obviousness, and utility requirements.'
      },
      {
        questionText: 'Your engineering project code is automatically protected by which IPR?',
        options: ['Patent', 'Trademark', 'Copyright', 'Industrial Design'],
        correctAnswer: 2,
        explanation:
          'Source code is automatically protected by copyright from the moment it is written, without needing registration.'
      },
      {
        questionText: 'Which IPR is best for protecting the visual design of a mobile phone?',
        options: ['Patent', 'Industrial Design', 'Trademark', 'Copyright'],
        correctAnswer: 1,
        explanation:
          'Industrial Design registration protects the visual/aesthetic appearance of products like mobile phones.'
      },
      {
        questionText: 'Which of the following is a common misconception about IPR?',
        options: [
          'Patents require registration',
          'Copyright is automatic',
          'Ideas can be patented',
          'Trademarks can last forever'
        ],
        correctAnswer: 2,
        explanation:
          'A common misconception is that you can patent an idea. You cannot – you can only patent a specific implementation of an idea.'
      },
      {
        questionText: 'WIPO stands for:',
        options: [
          'World Intellectual Property Organization',
          'World International Patent Office',
          'Worldwide IPR Protection Organization',
          'Western Intellectual Property Office'
        ],
        correctAnswer: 0,
        explanation:
          'WIPO is the World Intellectual Property Organization, the UN agency that administers international IP treaties.'
      }
    ]
  }
];

const seedDB = async () => {
  try {
    // Clear existing data
    await prisma.user.deleteMany({});
    await prisma.learningContent.deleteMany({});
    await prisma.quiz.deleteMany({});
    console.log('🗑️  Cleared existing data');

    const salt = await bcrypt.genSalt(10);

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', salt);
    const admin = await prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@iprportal.com',
        password: adminPassword,
        role: 'admin'
      }
    });
    console.log(`👤 Admin created: ${admin.email} / admin123`);

    // Create demo student
    const studentPassword = await bcrypt.hash('student123', salt);
    const student = await prisma.user.create({
      data: {
        name: 'Demo Student',
        email: 'student@iprportal.com',
        password: studentPassword,
        role: 'user'
      }
    });
    console.log(`👤 Student created: ${student.email} / student123`);

    // Create learning content
    for (const item of learningData) {
      await prisma.learningContent.create({
        data: {
          title: item.title,
          category: item.category,
          content: item.content,
          examples: JSON.stringify(item.examples),
          keyPoints: JSON.stringify(item.keyPoints),
          order: item.order
        }
      });
    }
    console.log(`📚 Created ${learningData.length} learning articles`);

    // Create quizzes
    for (const quiz of quizData) {
      await prisma.quiz.create({
        data: {
          title: quiz.title,
          category: quiz.category,
          description: quiz.description,
          questions: {
            create: quiz.questions.map(q => ({
              questionText: q.questionText,
              options: JSON.stringify(q.options),
              correctAnswer: q.correctAnswer,
              explanation: q.explanation || ''
            }))
          }
        }
      });
    }
    console.log(`📝 Created ${quizData.length} quizzes`);

    console.log('\n✅ Database seeded successfully!');
    console.log('─────────────────────────────');
    console.log('Admin Login:   admin@iprportal.com / admin123');
    console.log('Student Login: student@iprportal.com / student123');
    console.log('─────────────────────────────\n');
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
};

seedDB();

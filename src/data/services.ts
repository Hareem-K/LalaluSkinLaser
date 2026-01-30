import { Service } from '../types';

export const services: Service[] = [
  {
    id: 'microneedling',
    name: 'Morpheus8 RF Microneedling',
    price: 200,
    originalPrice: 300,
    duration: 90,
    description: 'An advanced treatment that combines microneedling with radiofrequency energy to penetrate deep into the skin, stimulating collagen and elastin production. This treatment improves skin tightness, smooths texture, reduces scars, and restores a youthful, radiant appearance.',
    category: 'laser',
    benefits: [
      'Reduces acne scars',
      'Softens fine lines and wrinkles',
      'Diminishes stretch marks',
      'Minimizes enlarged pores',
      'Improves uneven skin texture and tone',
      'Addresses early signs of aging',
      'Fades hyperpigmentation and sun damage',
    ],
    tiers: [
      {
        name: 'Microneedling',
        price: 150,
        description:
          'A collagen-stimulating treatment that refines texture, minimizes pores, and enhances overall skin clarity. Using fine microchannels, it encourages the skin’s natural repair process to improve tone, firmness, and radiance. Optional neck add-on to target crepiness and early signs of sagging.'
      },
      {
        name: 'Morpheus8 Microneedling with RF',
        price: '250–400' as unknown as number,
        description:
          'Combining microneedling with radiofrequency energy, Morpheus8 delivers heat deep into the dermis to remodel collagen and tighten skin at a structural level. It effectively targets fine lines, sagging, enlarged pores, and acne scars. Optional neck add-on to firm and lift the delicate neck area for a smoother, more contoured appearance.'
      },
      {
        name: 'Morpheus8 Microneedling with RF (Body)',
        price: '150–450' as unknown as number,
        description:
          'A specialized RF microneedling treatment designed to rejuvenate the skin on the body. By delivering fractional radiofrequency energy deep into the tissue, it tightens loose skin, fades stretch marks, and smooths the appearance of surgical or injury-related scars. Ideal for improving tone and firmness on areas such as the abdomen, thighs, arms, and knees.'
      }
    ]
  },
  {
    id: 'microdermabrasion',
    name: 'Microdermabrasion',
    price: 150,
    duration: 60,
    description: 'A gentle, non-invasive treatment using diamond-tip exfoliation to buff away dead skin cells and unclog pores. This process stimulates natural skin renewal, boosts collagen production, and enhances absorption of skincare products. Over time, it helps fade discoloration, smooth uneven texture, and restore a healthy, radiant glow.',
    category: 'treatment',
    benefits: [
      'Exfoliates skin',
      'Enhances collagen production',
      'Improves skin texture and tone',
      'Reduces fine lines and wrinkles',
      'Fades mild acne scars',
      'Minimizes hyperpigmentation and age spots',
      'Unclogs pores and reduces blackheads'
    ]
  },
  {
    id: 'hydrafacial',
    name: 'HydraFacial',
    price: 150,
    duration: 60,
    description: 'The HydraFacial is a multi-step treatment that deeply cleanses, gently exfoliates, and hydrates the skin using advanced vortex-fusion technology. Customized serums and boosters target your specific concerns—such as fine lines, acne, or hyperpigmentation—leaving your skin instantly smoother, plumper, and glowing with long-lasting protection.',
    category: 'facial',
    benefits: [
      'Cleanses, exfoliates, and extracts impurities',
      'Deeply hydrates and infuses skin',
      'Customizable with boosters for targeted concerns',
      'Improves skin tone and texture',
      'Reduces fine lines and wrinkles',
      'Minimizes pore size',
      'Restores a radiant, dewy glow'
    ],
    tiers: [
      { name: 'Regular', originalPrice: 150, price: 100, description: 'Cleanse, exfoliate, extract, and hydrate for instant glow.' },
      { name: 'Deluxe (Lymphatic Drainage)', price: 160, description: 'Includes lymphatic drainage to reduce puffiness and boost detox.' },
      { name: 'Platinum (Lip + Eye Boosters)', price: 200, description: 'Targets fine lines and dryness around lips and eyes.' },
    ]
  },
  {
    id: 'diamond-glow',
    name: 'Diamond Glow Facial',
    price: 100,
    originalPrice: 150,
    duration: 90,
    description:
      'A next-level resurfacing facial that combines diamond-tip exfoliation, deep pore cleansing, and targeted serum infusion in one treatment. This facial deeply polishes the skin while delivering professional-grade serums to address concerns like dullness, congestion, dryness, and uneven tone—leaving your skin instantly smoother, brighter, and more radiant.',
    category: 'facial',
    benefits: [
      'Deeply exfoliates and resurfaces the skin',
      'Cleanses pores and removes buildup',
      'Infuses customized serums into the skin',
      'Improves skin tone and texture',
      'Boosts hydration and radiance',
      'Leaves skin instantly smooth and glowing'
    ]
  },
  {
    id: 'dermaplaning',
    name: 'Dermaplaning',
    price: 100,
    originalPrice: 120,
    duration: 60,
    description: 'A gentle, non-invasive exfoliation treatment that removes dead skin cells and peach fuzz. It instantly reveals smoother, brighter skin, enhances product absorption, and creates the perfect base for flawless makeup while softening fine lines for a youthful glow.',
    category: 'treatment',
    benefits: [
      'Exfoliates and removes peach fuzz',
      'Brightens complexion',
      'Smooths skin texture',
      'Enhances product absorption',
      'Reduces early signs of aging',
      'Improves makeup application',
      'Delivers an instant radiant glow'
    ]
  },
  {
    id: 'chemical-peels',
    name: 'Chemical Peel',
    price: 100,
    originalPrice: 130,
    duration: 60,
    description: 'A professional resurfacing treatment that uses medical-grade acids to exfoliate dull, damaged skin. Chemical peels target acne, pigmentation, texture, and early signs of aging by revealing a smoother, brighter, more refined complexion with long-lasting results.',
    category: 'treatment',
    benefits: [
      'Brightens dull, uneven skin tone',
      'Softens fine lines and early signs of aging',
      'Reduces acne, congestion, and blackheads',
      'Improves hyperpigmentation and dark spots',
      'Smooths rough texture and dryness'
    ],
    tiers: [
      {
        name: 'Lactic Acid Peel',
        price: 100,
        description:
          'A gentle, hydrating AHA peel ideal for sensitive skin and first-time peel clients, providing a soft glow while improving tone and dryness with minimal irritation. A gentle yet effective AHA peel derived from sour milk, lactic acid exfoliates while hydrating the skin, helping remove toxins, bacteria, and dead skin cells. This peel targets uneven tone, dullness, acne, acne scars, blackheads, whiteheads, dry or dehydrated skin, sun damage, blotchy pigmentation, fine wrinkles, early loss of elasticity, large pores, age spots, eczema, seborrheic keratosis, hyperkeratosis, and actinic keratosis. It offers visible brightening and smoother texture with minimal downtime. Not suitable for clients with active eczema flare-ups, open wounds or cold sores, or those who cannot tolerate AHA acids.'
      },
      {
        name: 'Salicylic Acid Peel',
        price: 110,
        description:
          'A medium-strength BHA peel derived from willow bark that penetrates deep into the pores to dissolve oil, clear congestion, and treat acne at the root. This peel targets acne, acne scars, blackheads, whiteheads, large pores, sun damage, blotchy pigmentation, fine wrinkles, dry skin, and in-grown hairs. It is especially effective for oily and breakout-prone skin because salicylic acid penetrates through sebum to clear buildup inside the pores rather than just on the surface. It gently lifts away old skin cells, boosts collagen, reduces inflammation, and may cause visible peeling for 2–3 days. Not suitable for pregnancy or breastfeeding, Accutane users, anyone with an aspirin allergy, or clients with very dry or compromised skin.'
      },
      {
        name: 'Glycolic Acid Peel',
        price: 120,
        description:
          'An anti-aging, brightening AHA peel that smooths texture, fades sun damage, and targets uneven skin tone for a clearer, more radiant complexion. A professional-strength 20% AHA peel derived from sugar cane, glycolic acid has the smallest molecular size of all AHAs, allowing it to penetrate quickly and break down dull, dead skin cells to reveal a smoother, brighter complexion. This peel targets uneven skin tone, sun damage, hyperpigmentation, fine lines, acne, blackheads, dryness, blotchy pigmentation, texture irregularities, enlarged pores, age spots, and early loss of elasticity. It also stimulates collagen for firmer, plumper-looking skin. Mild redness or tingling may occur. Not recommended for very sensitive or sunburned skin, clients using strong retinoids (must stop 5–7 days before), or those who prefer to avoid AHAs during pregnancy or breastfeeding.'
      },
    ]
  },
  {
    id: 'c2o2-oxygen-facial',
    name: 'C₂O₂ Oxygen Facial (Circadia Oxygen Rx for Acne)',
    price: 150,
    duration: 90,
    description:
      'A professional oxygenating facial designed to calm inflammation, reduce acne-causing bacteria, and restore balance to compromised skin. Using Circadia’s Oxygen Rx, this treatment gently exfoliates while increasing oxygen supply at the skin’s surface to promote healing, clarity, and a refreshed glow. Ideal for acne-prone, rosacea-prone, and sensitive skin.',
    category: 'facial',
    benefits: [
      'Kills acne-causing bacteria without drying the skin',
      'Reduces redness, inflammation, and sensitivity',
      'Oxygenates skin to support healing and repair',
      'Calms active breakouts and helps prevent future congestion',
      'Strengthens compromised or stressed skin',
      'Improves overall clarity, tone, and balance',
      'Safe for reactive and rosacea-prone skin',
    ],
    media: [
      { type: 'video', src: '/Circadia/C2O2/Step-4-oxygen.mp4' },
      { type: 'video', src: '/Circadia/C2O2/Step-3-Charcoal-Mask.mp4' },
      { type: 'image', src: '/Circadia/C2O2/CharcoalDieu2.jpg', alt: 'Circadia Oxygen Rx treatment in progress' },
      { type: 'image', src: '/Circadia/C2O2/OxygenLiz2.jpg', alt: 'Circadia Oxygen Rx treatment in progress' },
      { type: 'image', src: '/Circadia/C2O2/CharcoalSplash.jpg', alt: 'Circadia Oxygen Rx treatment in progress' },
    ]
  },
  {
    id: 'vitamin-c-facial',
    name: 'Vitamin C Facial',
    price: 100,
    originalPrice: 125,
    duration: 60,
    description: 'A brightening facial enriched with antioxidant-rich Vitamin C to target dullness, uneven tone, and signs of aging. This treatment deeply nourishes the skin, helping to fade hyperpigmentation, improve elasticity, and reveal a fresh, radiant glow.',
    category: 'facial',
    benefits: [
      'Brightens and evens skin tone', 
      'Boosts Collagen', 
      'Reduces signs of aging', 
      'Hydrates and smooths the skin', 
      'Minimizes inflammation', 
      'Provides antioxidant protection'],
      badges: [{ text: '20% OFF', color: 'red' }]
  },
  {
    id: 'skin-brightening',
    name: 'Skin Brightening Facial',
    price: 104,
    originalPrice: 130,
    duration: 60,
    description: 'A targeted facial designed to fade dark spots, reduce hyperpigmentation, and restore balance to uneven skin tone. This treatment uses brightening serums and gentle exfoliation to reveal a clearer, more radiant complexion while promoting long-term skin clarity and glow.',
    category: 'facial',
    benefits: [
      'Reduces hyperpigmentation and dark spots',
      'Evens skin tone',
      'Brightens dull complexion',
      'Improves overall skin clarity',
      'Enhances natural glow',
      'Promotes long-term radiance'
    ],
    badges: [{ text: '20% OFF', color: 'red' }]
  },
  {
    id: 'classic-facial',
    name: 'Classic Facial',
    price: 80,
    originalPrice: 100,
    duration: 60,
    description: 'A relaxing, all-in-one treatment suitable for every skin type. The Classic Facial includes deep cleansing, gentle exfoliation, extractions if needed, and a nourishing mask to refresh and revitalize your skin. It restores balance, promotes relaxation, and leaves you with a healthy, refreshed glow.',
    category: 'facial',
    benefits: [
      'Deeply cleanses and purifies skin',
      'Removes buildup and unclogs pores',
      'Restores skin balance and hydration',
      'Improves overall skin health',
      'Promotes relaxation and stress relief'
    ],
    badges: [{ text: '20% OFF', color: 'red' }]
  },
  {
    id: 'glow-facial',
    name: 'Glow Facial',
    price: 104,
    originalPrice: 130,
    duration: 60,
    description: 'A revitalizing facial treatment that deeply hydrates, smooths, and refreshes the skin. The Glow Facial is designed to instantly brighten your complexion, improve texture, and leave you with a healthy, luminous finish.',
    category: 'facial',
    benefits: [
      'Provides instant radiance',
      'Deeply hydrates and nourishes',
      'Smooths and refines skin texture',
      'Enhances natural glow',
      'Leaves skin refreshed and revitalized'
    ],
    badges: [{ text: '20% OFF', color: 'red' }]
  },
  {
    id: 'led-facial',
    name: 'LED Light Therapy Facial',
    price: 100,
    originalPrice: 125,
    duration: 60,
    description: 'A non-invasive light therapy that uses different wavelengths of LED light to target specific skin concerns. Customized to your needs, it can reduce acne, calm inflammation, stimulate collagen, and rejuvenate the skin for a healthier, more radiant complexion.',
    category: 'facial',
    benefits: [
      'Calms redness and inflammation',
      'Stimulates collagen and elasticity',
      'Promotes acne healing and prevention',
      'Provides anti-aging and skin rejuvenation benefits'
    ],
    badges: [{ text: '20% OFF', color: 'red' }]
  },
  {
    id: 'customized-back-facial',
    name: 'Customized Back Facial',
    price: 150,
    duration: 60,
    description: 'A customized back treatment that deeply cleanses, exfoliates, and hydrates to restore clarity and smoothness. Ideal for treating back acne or simply refreshing the skin. Optional add-ons like Morpheus8 RF microneedling, enzyme peel, or microdermabrasion enhance results.',
    category: 'facial',
    benefits: [
      'Deeply cleanses pores and removes buildup',
      'Targets congestion and back acne (“bacne”)',
      'Exfoliates dead skin cells and smooths texture',
      'Hydrates and nourishes the back for a healthy glow',
      'Restores comfort and confidence in your skin'
    ],
    tiers: [
      {
        name: 'Bacne Solution',
        price: 150,
        description:
          'A clarifying back facial focused on reducing acne, congestion, and inflammation. Includes steam cleanse, exfoliation, extractions, antibacterial mask, and soothing hydration. Optional add-ons: Morpheus8 RF Microneedling (+$50), Enzyme Peel, or Microdermabrasion for advanced resurfacing and acne control.'
      },
      {
        name: 'Signature Back Refresh',
        price: 120,
        description:
          'A rejuvenating back facial designed for smoother, hydrated, and radiant skin. Includes deep cleansing, exfoliation, mask therapy, and nourishing moisture finish. Optional add-ons: Enzyme Peel or Microdermabrasion to boost glow and refine texture.'
      }
    ]
  },
  {
    id: 'bb-glow',
    name: 'BB Glow',
    price: 120,
    originalPrice: 130,
    duration: 70,
    description: 'A semi-permanent skin treatment that uses tinted serums and microneedling technology to create a flawless, radiant finish. BB Glow helps even skin tone, minimize imperfections, and improve texture while delivering anti-aging benefits for a naturally glowing complexion that lasts.',
    category: 'treatment',
    benefits: [
      'Provides a radiant, luminous glow',
      'Evens skin tone and reduces discoloration',
      'Softens fine lines and offers anti-aging benefits',
      'Improves overall skin texture',
      'Reduces acne scars and blemishes',
      'Helps control excess oil for balanced skin'
    ]
  },

  {
    id: 'slimming-treatment',
    name: 'Body & Face Slimming Treatment',
    price: 100, // base or starting price
    duration: 90,
    description: 'A non-invasive treatment that combines ultrasound cavitation, radiofrequency, and vacuum technologies to target stubborn fat, tighten skin, and sculpt both the body and face. By using gentle heat energy, it breaks down fat cells, stimulates collagen production, and improves circulation for smoother, firmer, and more defined results. For best results, a series of 10–12 sessions is required.',
    category: 'slimming',
    benefits: [
      'Reduces stubborn fat deposits',
      'Firms and tightens loose skin',
      'Smooths cellulite and improves texture',
      'Contours face and body',
      'Defines jawline and reduces puffiness',
      'Stimulates lymphatic drainage',
      'Safe, comfortable, and non-invasive',
    ],
    tiers: [
      {
        name: 'One session',
        price: 100,
        description: 'Single treatment to sample the service.'
      },
      {
        name: 'Ten sessions',
        price: 850,
        description: 'Recommended plan for visible inch-loss over ~4 weeks.'
      },
      {
        name: 'Twelve sessions',
        price: 1000,
        description: 'Enhanced plan for best results and maintenance.'
      },
    ],
  }


];
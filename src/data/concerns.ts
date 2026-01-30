// src/data/concerns.ts
// NOTE: Make sure these service IDs match those in your existing services.ts
export type Concern = {
  slug: string;
  title: string;
  intro: string[];
  recommendedServiceIds: string[];
  image: string;
};

export const concerns: Concern[] = [
  {
    slug: 'acne',
    title: 'Acne',
    intro: [
      'Acne is one of the most common skin concerns, caused when hair follicles become clogged with excess oil (sebum), dead skin cells, and bacteria. Hormonal changes, stress, certain medications, and diet can also contribute to acne flare-ups. Breakouts can range from blackheads and whiteheads to painful cystic lesions.',
      'You may know you have acne if you regularly notice inflamed red bumps, clogged pores, or persistent blemishes that leave marks behind. Many people also experience increased oiliness, tenderness, or scarring in areas prone to breakouts such as the face, chest, or back.',
      'Effective treatments for acne focus on clearing congestion, calming inflammation, and supporting skin healing. Professional treatments help reduce bacteria, minimize pore blockages, and improve skin texture over time.'
    ],
    recommendedServiceIds: ['hydrafacial', 'microneedling', 'chemical-peels', 'c2o2-oxygen-facial' ,'acne-treatment', 'customized-back-facial' ],
    image: '/skinconcerns/acne.png'
  },
  {
    slug: 'brightness',
    title: 'Brightness & Dullness',
    intro: [
      'Dull or lackluster skin is often caused by a buildup of dead skin cells, dehydration, insufficient circulation, or environmental stressors such as pollution and UV exposure. As cell turnover slows with age or stress, the skin can lose its natural radiance.',
      'You may know your skin is dull if it appears flat, tired, or uneven in tone, with less of the healthy glow you want. Makeup may look patchy, and skin often feels rough or dry to the touch. Dark under-eye circles and uneven texture can also contribute to an overall fatigued appearance.',
      'Treatments that promote brightness aim to gently resurface, deeply hydrate, and stimulate circulation for a refreshed, luminous glow. Professional exfoliation and vitamin-rich treatments restore vitality, leaving skin visibly smoother and more radiant.'
    ],
    recommendedServiceIds: ['hydrafacial', 'microdermabrasion', 'vitamin-c-facial'],
    image: '/skinconcerns/dullness.png'
  },
  {
    slug: 'pigmentation',
    title: 'Pigmentation',
    intro: [
      'Pigmentation concerns such as dark spots, melasma, or uneven tone are often caused by excess melanin production triggered by sun exposure, hormonal changes, inflammation, or injury to the skin (like acne scars). Over time, these spots can become more pronounced without targeted care.',
      'You may know you are experiencing pigmentation if you see flat brown, gray, or reddish patches that don’t fade like a temporary blemish would. Pigmentation often appears on areas frequently exposed to the sun, such as the face, hands, and décolletage.',
      'Treatments for pigmentation target discoloration by resurfacing the skin, balancing pigment production, and encouraging more even cell renewal. This helps fade existing spots, prevent new ones, and restore a more uniform complexion.'
    ],
    recommendedServiceIds: ['chemical-peels', 'microneedling', 'hydrafacial'],
    image: '/skinconcerns/pigmentation.png'
  },
  {
    slug: 'sensitivity',
    title: 'Sensitivity & Redness',
    intro: [
      'Sensitive or reactive skin often occurs when the skin’s protective barrier is compromised, making it more vulnerable to external irritants like harsh skincare ingredients, extreme temperatures, or pollution. Conditions such as rosacea, eczema, or chronic dryness can also cause heightened sensitivity.',
      'You may know you have sensitive skin if you frequently experience stinging, burning, redness, or irritation after using common skincare products or being exposed to the environment. Visible flushing, broken capillaries, or consistent discomfort are also telltale signs.',
      'Treatments for sensitivity focus on strengthening the skin barrier, calming inflammation, and restoring balance without using harsh actives. Gentle, hydrating, and soothing therapies help reduce redness, build resilience, and make skin more comfortable over time.'
    ],
    recommendedServiceIds: ['led-facial', 'classic-facial', 'hydrafacial'],
    image: '/skinconcerns/sensitivity.png'
  },
  {
    slug: 'aging',
    title: 'Aging (Lines & Firmness)',
    intro: [
      'As we age, collagen and elastin production naturally decline, leading to visible fine lines, wrinkles, sagging, and loss of firmness. Environmental stressors like sun exposure, smoking, and pollution can accelerate these changes, while genetics also play a role.',
      'You may know you’re experiencing aging-related concerns if you notice deepening expression lines, loss of elasticity around the cheeks or jawline, thinner skin, or a general lack of plumpness compared to your younger years. Makeup may also settle more into creases and folds.',
      'Treatments for aging skin focus on stimulating collagen, tightening and firming tissue, and providing intensive hydration. Professional therapies support long-term skin health while delivering a smoother, lifted, and more youthful appearance.'
    ],
    recommendedServiceIds: ['microneedling', 'led-facial', 'hydrafacial', 'oxygen-facial'],
    image: '/skinconcerns/aging.png'
  },
  {
    slug: 'dryness',
    title: 'Dryness & Dehydration',
    intro: [
      'Dry or dehydrated skin can result from a lack of natural oils, insufficient water retention, harsh cleansers, seasonal changes, or aging. Unlike oily skin, dryness occurs when the skin barrier cannot produce or hold enough lipids and moisture, leaving the skin compromised.',
      'You may know your skin is dry or dehydrated if it feels tight, rough, itchy, or flaky, and fine lines may appear more pronounced. Makeup may cling to patches, and you may also notice a dull or ashy appearance, especially in colder months.',
      'Treatments for dryness and dehydration work by replenishing moisture, repairing the protective barrier, and improving the skin’s ability to retain hydration. With consistent care, skin becomes softer, smoother, and more resilient against external stressors.'
    ],
    recommendedServiceIds: ['hydrafacial', 'classic-facial', 'vitamin-c-facial'],
    image: '/skinconcerns/dryness.png'
  }
];

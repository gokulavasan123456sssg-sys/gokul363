import { Project, SkillCategory, ExperienceItem, EducationItem, SiteProfile } from '../types';

export const initialProfile: SiteProfile = {
  name: 'GOKULAVASAN',
  titles: [
    'Video Editor',
    'Cinematographer',
    'Photographer',
    'Visual Effects Artist'
  ],
  tagline: 'Turning Every Frame Into A Story.',
  heroBio: 'Passionate visual storyteller with a deep cinematic instinct. Combining sharp editorial rhythm, rich colour science, and cutting-edge visual effects to produce high-voltage imagery.',
  aboutHeading: 'BEHIND THE CAMERA. BEYOND THE FRAME.',
  aboutBio: [
    'I am Gokulavasan, a dedicated Video Editor, Cinematographer, Photographer, and Visual Effects Artist based in Chennai, India. My journey is fuelled by the pulse of Tamil cinema—the craft of evoking raw emotion, grand scale, and unforgettable atmosphere through the camera lens and post-production suite.',
    'With 1 year of hands-on production experience at the Koyaka YouTube Channel, I have mastered the complete visual pipeline: from storyboard and set lighting, camera operation on mirrorless rigs, to frame-accurate editorial pacing in Premiere Pro and DaVinci Resolve, followed by advanced compositing in Nuke and Maya.',
    'Every project is approached not just as a technical assignment, but as a cinematic universe waiting to be illuminated. Whether capturing the timeless architecture of ancient temples, cutting high-energy comedy and wedding films, or sculpting 3D visual effects, my goal remains constant: turning every single frame into an enduring story.'
  ],
  portraitImage: '/media/profile/gokul_portrait.png',
  applicationPhoto: '/media/profile/application_photo.jpg',
  resumePdfUrl: '/media/resume/Gokulavasan_Resume.pdf',
  resumeDriveUrl: 'https://drive.google.com/file/d/1mJ_d92Ojkk5z0z-htAeRHBubtQ7_YeMJ/view?usp=sharing',
  contact: {
    phone: '+91 9344084435',
    email: 'gokulavasan123456sssg@gmail.com',
    location: 'Chennai, India',
    whatsapp: '919344084435',
    instagram: 'https://instagram.com/',
    youtube: 'https://youtube.com/'
  }
};

export const initialProjects: Project[] = [
  // Wedding Films
  {
    id: 'proj-wedding-1',
    title: 'Cinematic Wedding Works',
    category: 'Wedding Films',
    description: 'High-emotion cinematic wedding film capturing sacred traditions, vibrant celebrations, and intimate moments with rich color science and emotional pacing.',
    thumbnail: '/media/thumbnails/thumb_wedding_works.jpg',
    videoUrl: '/media/videos/show_reel.mp4',
    driveId: '1Hd40PdkoocUmznK9GN7Mdzl7IA7pJh2v',
    driveViewUrl: 'https://drive.google.com/file/d/1Hd40PdkoocUmznK9GN7Mdzl7IA7pJh2v/view',
    mediaType: 'video',
    date: '2026',
    featured: true,
    credits: 'Lead Editor & Colourist: Gokulavasan',
    tags: ['Wedding Film', 'Cinematic Cut', 'DaVinci Resolve', 'Emotional Storytelling'],
    clientOrChannel: 'Wedding Production'
  },

  // VFX & Showreels
  {
    id: 'proj-vfx-showreel',
    title: 'VFX & 3D Master Showreel',
    category: 'VFX & Showreels',
    description: 'Dynamic VFX showreel featuring Maya 3D simulations, Nuke multipass compositing, particle integration, and After Effects motion graphics.',
    thumbnail: '/media/thumbnails/thumb_show_reel.jpg',
    videoUrl: '/media/videos/show_reel.mp4',
    driveId: '1CY9wlPKBDT6fl6pGnTpCU11W3ExTc9el',
    driveViewUrl: 'https://drive.google.com/file/d/1CY9wlPKBDT6fl6pGnTpCU11W3ExTc9el/view',
    mediaType: 'video',
    date: '2026',
    featured: true,
    credits: 'VFX Artist & Compositor: Gokulavasan',
    tags: ['Autodesk Maya', 'Nuke', 'After Effects', 'CGI', 'Compositing'],
    clientOrChannel: 'VFX Image Institution & Solo Works'
  },
  {
    id: 'proj-vfx-3d',
    title: '3D Simulation & CGI Sequence',
    category: 'VFX & Showreels',
    description: '3D asset modeling, dynamic lighting, and environmental camera projection rendered in Maya and composited with photoreal shading.',
    thumbnail: '/media/thumbnails/thumb_3d_vfx.jpg',
    videoUrl: '/media/videos/3D_vfx.mp4',
    driveId: '15ABeF66_XLrFFq9LnL7QXQIQJP_tf0oD',
    driveViewUrl: 'https://drive.google.com/file/d/15ABeF66_XLrFFq9LnL7QXQIQJP_tf0oD/view',
    mediaType: 'video',
    date: '2026',
    featured: false,
    credits: '3D Artist: Gokulavasan',
    tags: ['3D CGI', 'Maya', 'Simulation', 'VFX'],
    clientOrChannel: '3D Portfolio'
  },

  // Video Editing (Koyaka YouTube & Commercial)
  {
    id: 'proj-edit-03',
    title: 'Cinematic Narrative Cut - Episode 03',
    category: 'Video Editing',
    description: 'Precision narrative editing focusing on comedic beats, dialogue rhythm, audio enhancements, and color grading for digital audience retention.',
    thumbnail: '/media/thumbnails/thumb_episode_03.jpg',
    videoUrl: '/media/videos/video_editing_03.mp4',
    driveId: '1CW2OL9eV3On5H07rC_VOnPT7w0W2CbFV',
    driveViewUrl: 'https://drive.google.com/file/d/1CW2OL9eV3On5H07rC_VOnPT7w0W2CbFV/view',
    mediaType: 'video',
    date: '2026',
    featured: true,
    credits: 'Editor & Sound Designer: Gokulavasan',
    tags: ['Premiere Pro', 'Audio Sync', 'Pacing', 'Color Grade'],
    clientOrChannel: 'Koyaka YouTube Channel'
  },
  {
    id: 'proj-edit-shorts-rules',
    title: 'Rules Engaluku Kidaiyathu - Koyaka Shorts',
    category: 'Video Editing',
    description: 'Viral short-form comedic sketch edited for rapid punchline delivery, sound effects timing, and vibrant social media saturation.',
    thumbnail: '/media/thumbnails/thumb_rules_comedy.jpg',
    videoUrl: '/media/videos/koiyakka_shorts_rules.mp4',
    driveId: '1QmQ0uRYX9nSTgRKkaSWh_bH_-_deiT1W',
    driveViewUrl: 'https://drive.google.com/file/d/1QmQ0uRYX9nSTgRKkaSWh_bH_-_deiT1W/view',
    mediaType: 'video',
    date: '2026',
    featured: false,
    credits: 'Editor: Gokulavasan | Cast: Ajith & Deepan',
    tags: ['YouTube Shorts', 'Social Pacing', 'Sound Effects', 'Comedy'],
    clientOrChannel: 'Koyaka YouTube Channel'
  },
  {
    id: 'proj-edit-alaparaigal',
    title: 'Naveena Vazhipari Alaparaigal - GLV Galatta',
    category: 'Video Editing',
    description: 'Full-length narrative comedy sketch editing featuring multi-cam synchronization, situational background scores, and visual humor timing.',
    thumbnail: '/media/thumbnails/thumb_alaparaigal_comedy.jpg',
    videoUrl: '/media/videos/video_editing_03.mp4',
    driveId: '1T5aixKuorgdprZo-eC56B0vpUSvK0mLh',
    driveViewUrl: 'https://drive.google.com/file/d/1T5aixKuorgdprZo-eC56B0vpUSvK0mLh/view',
    mediaType: 'video',
    date: '2026',
    featured: false,
    credits: 'Editor: Gokulavasan | Cast: Ajith & Deepan',
    tags: ['Multi-Cam', 'Dialogue Sync', 'Premiere Pro', 'Humour'],
    clientOrChannel: 'GLV Galatta / Koyaka'
  },
  {
    id: 'proj-edit-shorts-veetuku',
    title: 'Nee Veetuku Thaniya Poriya - Koyaka Shorts',
    category: 'Video Editing',
    description: 'Fast-paced comedic short cut with engaging micro-transitions and synchronized sound design for maximum digital engagement.',
    thumbnail: '/media/thumbnails/thumb_veetuku_comedy.jpg',
    videoUrl: '/media/videos/koiyakka_shorts_rules.mp4',
    driveId: '1aQkFoklMcN4yYnq_mpwr5xwoeGPgJYhq',
    driveViewUrl: 'https://drive.google.com/file/d/1aQkFoklMcN4yYnq_mpwr5xwoeGPgJYhq/view',
    mediaType: 'video',
    date: '2026',
    featured: false,
    credits: 'Editor: Gokulavasan',
    tags: ['Short Form', 'Fast Cut', 'Sound Design'],
    clientOrChannel: 'Koyaka YouTube Channel'
  },
  {
    id: 'proj-edit-ai',
    title: 'AI Visual Experiment & Future Cinema',
    category: 'Creative Projects',
    description: 'Experimental hybrid edit blending generative AI sequences with cinematic color passes, analog glitch effects, and futuristic soundscapes.',
    thumbnail: '/media/thumbnails/thumb_ai_experiment.jpg',
    videoUrl: '/media/videos/show_reel.mp4',
    driveId: '1WuxSjIr-XxiyLU91odiV8rLoyIt4lrnu',
    driveViewUrl: 'https://drive.google.com/file/d/1WuxSjIr-XxiyLU91odiV8rLoyIt4lrnu/view',
    mediaType: 'video',
    date: '2026',
    featured: true,
    credits: 'Concept & Editorial: Gokulavasan',
    tags: ['AI Film', 'Experimental', 'Sound Design', 'Future Vision'],
    clientOrChannel: 'Personal Creative Project'
  },

  // Cinematography
  {
    id: 'proj-cinema-reel',
    title: 'Cinematography Master Reel',
    category: 'Cinematography',
    description: 'Master cinematography compilation showcasing dynamic gimbal movement, prime lens depth of field, dramatic low-key lighting, and framing aesthetics.',
    thumbnail: '/media/thumbnails/thumb_cinematography.jpg',
    videoUrl: '/media/videos/show_reel.mp4',
    driveId: '18waMj-y5GHwpFS_wv3_ZMpWrvsRaDNqT',
    driveViewUrl: 'https://drive.google.com/file/d/18waMj-y5GHwpFS_wv3_ZMpWrvsRaDNqT/view',
    mediaType: 'video',
    date: '2026',
    featured: true,
    credits: 'Cinematographer & Camera Operator: Gokulavasan',
    tags: ['Cinematography', 'Camera Movement', 'Lighting', 'Visual Tone'],
    clientOrChannel: 'Cinematic Reel'
  },

  // Photography Portfolio (From Google Drive)
  {
    id: 'proj-photo-pamban',
    title: 'Pamban Bridge - Rameshwaram',
    category: 'Photography',
    description: 'Engineering marvel rising above the turquoise waters of the Palk Strait. Wide-angle seascape capturing the historic rail bridge leading towards Dhanushkodi.',
    thumbnail: '/media/photos/pamban_bridge.webp',
    driveId: '1satVp5qiVEdI2OPBmCnWJieo7BNPMGEO',
    driveViewUrl: 'https://drive.google.com/file/d/1satVp5qiVEdI2OPBmCnWJieo7BNPMGEO/view',
    mediaType: 'image',
    date: '2026',
    featured: true,
    credits: 'Photographer: Gokulavasan',
    tags: ['Landscape', 'Seascape', 'Tamil Nadu Heritage', 'Lightroom']
  },
  {
    id: 'proj-photo-edge-1',
    title: 'At The Absolute Edge of India - Triveni Sangam',
    category: 'Photography',
    description: 'Where the Arabian Sea, the Bay of Bengal, and the Indian Ocean converge. Spectacular sunrise framing the vast horizon with golden gradient tones.',
    thumbnail: '/media/photos/edge_of_india_1.jpg',
    driveId: '1Td_ODzWGGTSnFNLnMTjFgZraY18XYQiZ',
    driveViewUrl: 'https://drive.google.com/file/d/1Td_ODzWGGTSnFNLnMTjFgZraY18XYQiZ/view',
    mediaType: 'image',
    date: '2026',
    featured: true,
    credits: 'Photographer: Gokulavasan',
    tags: ['Sunrise', 'Kanyakumari', 'Ocean', 'Color Grading']
  },
  {
    id: 'proj-photo-edge-2',
    title: 'Infinite Horizon - Edge of India',
    category: 'Photography',
    description: 'Wide panoramic perspective across the southern tip of the Indian subcontinent, highlighting oceanic reflections under morning sunlight.',
    thumbnail: '/media/photos/edge_of_india_2.jpg',
    driveId: '11Zx4SEiI-shpHy1Ws6rO8gFgZ2e4cp98',
    driveViewUrl: 'https://drive.google.com/file/d/11Zx4SEiI-shpHy1Ws6rO8gFgZ2e4cp98/view',
    mediaType: 'image',
    date: '2026',
    featured: false,
    credits: 'Photographer: Gokulavasan',
    tags: ['Landscape', 'Morning Glow', 'Wide Angle']
  },
  {
    id: 'proj-photo-suchindram-1',
    title: 'Suchindram Thanumalayan Temple - Divine Grandeur',
    category: 'Photography',
    description: 'Finding peace amidst towering gopurams and intricately carved granite pillars. A spiritual celebration of ancient Dravidian temple architecture.',
    thumbnail: '/media/photos/suchindram_temple_1.jpg',
    driveId: '15pd9_kKPBbonvj12NqgQd5QEXII_1KC6',
    driveViewUrl: 'https://drive.google.com/file/d/15pd9_kKPBbonvj12NqgQd5QEXII_1KC6/view',
    mediaType: 'image',
    date: '2026',
    featured: true,
    credits: 'Photographer: Gokulavasan',
    tags: ['Architecture', 'Temple Heritage', 'Sculpture', 'Chiaroscuro']
  },
  {
    id: 'proj-photo-suchindram-2',
    title: 'Suchindram Temple - Architectural Symmetry',
    category: 'Photography',
    description: 'Detailed study of ornate stone carvings, musical pillars, and natural directional shadows inside the sanctum corridors.',
    thumbnail: '/media/photos/suchindram_temple_2.jpg',
    driveId: '1GSeXXkwL1eJwZ7I7i-U-lBhmf9vTfbwe',
    driveViewUrl: 'https://drive.google.com/file/d/1GSeXXkwL1eJwZ7I7i-U-lBhmf9vTfbwe/view',
    mediaType: 'image',
    date: '2026',
    featured: false,
    credits: 'Photographer: Gokulavasan',
    tags: ['Symmetry', 'Shadow Play', 'Stone Craft']
  },
  {
    id: 'proj-photo-suchindram-3',
    title: 'Suchindram Temple - Sacred Reflections',
    category: 'Photography',
    description: 'Atmospheric natural lighting illuminating century-old carved stone motifs with subtle golden warmth.',
    thumbnail: '/media/photos/suchindram_temple_3.jpg',
    driveId: '1htp26OeOMmLcielIKEUii9KAIaxvlv_t',
    driveViewUrl: 'https://drive.google.com/file/d/1htp26OeOMmLcielIKEUii9KAIaxvlv_t/view',
    mediaType: 'image',
    date: '2026',
    featured: false,
    credits: 'Photographer: Gokulavasan',
    tags: ['Temple Art', 'Dravidian Architecture', 'Warm Tones']
  },
  {
    id: 'proj-photo-golden-silhouette',
    title: 'Golden Hour Silhouette - The Solitary Flight',
    category: 'Photography',
    description: 'Fine-art wildlife capture at sunset. A lone bird silhouetted against an intensely saturated fiery orange and deep crimson evening sky.',
    thumbnail: '/media/photos/golden_hour_silhouette.jpeg',
    driveId: '1rmZUhXelm0_KXzg6Mk2gbYXjy913yFEs',
    driveViewUrl: 'https://drive.google.com/file/d/1rmZUhXelm0_KXzg6Mk2gbYXjy913yFEs/view',
    mediaType: 'image',
    date: '2026',
    featured: true,
    credits: 'Photographer: Gokulavasan',
    tags: ['Golden Hour', 'Silhouette', 'Sunset', 'Minimalist']
  },
  {
    id: 'proj-photo-letting-go',
    title: 'The Art of Letting Go - Minimalist Sky',
    category: 'Photography',
    description: 'One bird. Infinite sky. Minimalist composition capturing serenity, freedom, and spatial balance during an evening photography expedition.',
    thumbnail: '/media/photos/art_of_letting_go.jpg',
    driveId: '11wgawAkYVxAshOpOijgoTvZVjmunnqlC',
    driveViewUrl: 'https://drive.google.com/file/d/11wgawAkYVxAshOpOijgoTvZVjmunnqlC/view',
    mediaType: 'image',
    date: '2026',
    featured: false,
    credits: 'Photographer: Gokulavasan',
    tags: ['Minimalism', 'Sky Study', 'Fine Art']
  },
  {
    id: 'proj-photo-palace',
    title: 'Padmanabhapuram Palace - Wooden Marvel',
    category: 'Photography',
    description: 'Walking through Asia\'s largest wooden palace. Capturing intricate rosewood ceilings, polished black stone floors, and rhythmic courtyard shadows.',
    thumbnail: '/media/photos/wooden_palace.jpg',
    driveId: '1vdrg_9nSavvBtcdQmswy_cZggmtE4mbL',
    driveViewUrl: 'https://drive.google.com/file/d/1vdrg_9nSavvBtcdQmswy_cZggmtE4mbL/view',
    mediaType: 'image',
    date: '2026',
    featured: true,
    credits: 'Photographer: Gokulavasan',
    tags: ['Heritage', 'Kerala Architecture', 'Wooden Craft', 'Light & Shadow']
  },
  {
    id: 'proj-photo-rock-memorial',
    title: 'Vivekananda Rock Memorial - Oceans In Motion',
    category: 'Photography',
    description: 'Where the oceans meet, history stands tall. Capturing the timeless monumental structure surrounded by surging sea waves under dramatic skies.',
    thumbnail: '/media/photos/vivekananda_rock.jpg',
    driveId: '1Lcwhfc8_7Ul7Ar86AZn_Wp_l_sEzbM_5',
    driveViewUrl: 'https://drive.google.com/file/d/1Lcwhfc8_7Ul7Ar86AZn_Wp_l_sEzbM_5/view',
    mediaType: 'image',
    date: '2026',
    featured: true,
    credits: 'Photographer: Gokulavasan',
    tags: ['Monument', 'Seascape', 'Kanyakumari', 'Dramatic Sky']
  }
];

export const skillCategories: SkillCategory[] = [
  {
    title: 'VIDEO EDITING',
    icon: 'Film',
    description: 'Rhythmic cutting, tension pacing, audio synchronization, and high-impact color correction.',
    skills: [
      'Adobe Premiere Pro',
      'DaVinci Resolve',
      'Adobe After Effects',
      'Colour Grading',
      'Audio Synchronisation'
    ]
  },
  {
    title: 'PHOTOGRAPHY',
    icon: 'Camera',
    description: 'Creative lighting, RAW image manipulation, high-end skin and environmental retouching.',
    skills: [
      'Adobe Lightroom',
      'Adobe Photoshop',
      'Portrait Photography',
      'Event Photography',
      'Product Photography',
      'Photo Retouching'
    ]
  },
  {
    title: 'CINEMATOGRAPHY',
    icon: 'Video',
    description: 'Dynamic camera movement, cinematic framing, visual mood sculpting, and on-set direction.',
    skills: [
      'Camera Operation',
      'DSLR / Mirrorless Cameras',
      'Shot Composition',
      'Lighting Setup',
      'Direction',
      'Storyboarding'
    ]
  },
  {
    title: '3D & VFX',
    icon: 'Sparkles',
    description: 'Multi-pass compositing, particle simulations, motion graphics, and 3D scene dynamics.',
    skills: [
      'Autodesk Maya',
      'Nuke',
      'Compositing',
      'Motion Graphics',
      'Visual Effects'
    ]
  }
];

export const experiences: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Video Editor, Photographer & Cinematographer',
    company: 'Koyaka YouTube Channel',
    duration: '1 Year',
    location: 'Chennai, Tamil Nadu',
    badge: '1 Year Professional Tenure',
    description: [
      'Handled end-to-end post-production video editing for episodic releases and comedy shorts using Adobe Premiere Pro and DaVinci Resolve.',
      'Operated cinema and mirrorless camera rigs during live studio and outdoor location shoots, ensuring crisp focus, dynamic movement, and cinematic framing.',
      'Conducted still photography, behind-the-scenes (BTS) documentation, promotional portraits, and high-CTR thumbnail visuals for digital releases.',
      'Designed and executed indoor three-point lighting and outdoor natural bounce setups tailored for comedic and dramatic tones.',
      'Integrated motion graphics, comedic sound effects, and clean audio mastering for fast-paced viral entertainment.'
    ]
  }
];

export const educationList: EducationItem[] = [
  {
    id: 'edu-vfx',
    degree: 'VFX & Compositing Certification',
    institution: 'VFX Image Institution',
    location: 'Vadapalani, Chennai',
    year: 'Certified',
    type: 'certification'
  },
  {
    id: 'edu-be',
    degree: 'B.E. Cyber Security',
    institution: 'SRM Valliammai Engineering College',
    score: '74%',
    location: 'Chennai, Tamil Nadu',
    type: 'degree'
  },
  {
    id: 'edu-diploma',
    degree: 'Diploma in Engineering',
    institution: 'Sri Ramakrishna Polytechnic College',
    score: '81%',
    location: 'Tamil Nadu',
    type: 'diploma'
  },
  {
    id: 'edu-sslc',
    degree: 'SSLC (Secondary School Leaving Certificate)',
    institution: 'Vetri Vikaas Higher Secondary School',
    location: 'Tamil Nadu',
    type: 'school'
  }
];
